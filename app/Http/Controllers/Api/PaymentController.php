<?php

namespace App\Http\Controllers\Api;

use App\Models\Payment;

class PaymentController extends BaseController
{
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
