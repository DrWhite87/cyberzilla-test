<?php

namespace App\Http\Controllers\Api;

use App\Data\PaymentData;
use App\Data\PaymentFormData;
use App\Enum\PaymentStatus;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Http\Request;

class PaymentController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @param User $user
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request, User $user): \Illuminate\Http\JsonResponse
    {
        $payments = $user->payments()
            ->with(['user'])
            ->when(!empty($request->query('sort')), function ($q) use ($request) {
                $sortAttribute = $request->query('sort');
                $sortDirection = 'ASC';
                if (strncmp($sortAttribute, '-', 1) === 0) {
                    $sortDirection = 'DESC';
                    $sortAttribute = substr($sortAttribute, 1);
                }

                $q->orderBy($sortAttribute, $sortDirection);
            })->paginate();

        return $this->sendResponse([
            'payments' => PaymentData::collection($payments)
        ], 'User payments');
    }

    /**
     * Get data to create a payment.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function statuses(): \Illuminate\Http\JsonResponse
    {
        return $this->sendResponse(['statuses' => PaymentStatus::toArray()], 'Payment statuses');
    }

    /**
     * Create the specified resource in storage.
     *
     * @param PaymentFormData $data
     * @param User $user
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(PaymentFormData $data, User $user): \Illuminate\Http\JsonResponse
    {
        $payment = $user->payments()->create($data->toArray());
        return $this->sendResponse(['payment' => PaymentData::from($payment)], 'Payment create');
    }

    /**
     * Display the specified resource.
     *
     * @param int $userID
     * @param Payment $payment
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $userID, Payment $payment): \Illuminate\Http\JsonResponse
    {
        return $this->sendResponse(['payment' => PaymentData::from($payment->load(['user']))], 'Payment list');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param PaymentFormData $data
     * @param Payment $payment
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(PaymentFormData $data, Payment $payment): \Illuminate\Http\JsonResponse
    {
        $payment->update($data->toArray());
        return $this->sendResponse(['payment' => PaymentData::from($payment)], 'Payment update');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Payment $payment
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Payment $payment): \Illuminate\Http\JsonResponse
    {
        $payment->delete();
        return $this->sendResponse([], 'Payment delete');
    }

}
