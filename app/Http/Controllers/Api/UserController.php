<?php

namespace App\Http\Controllers\Api;

use App\Data\PaymentData;
use App\Data\UserData;
use App\Data\UserFormData;
use App\Data\UserCreateData;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request): \Illuminate\Http\JsonResponse
    {
        $users = User::when(!empty($request->query('sort')), function ($q) use ($request) {
            $sortAttribute = $request->query('sort');
            $sortDirection = 'ASC';
            if (strncmp($sortAttribute, '-', 1) === 0) {
                $sortDirection = 'DESC';
                $sortAttribute = substr($sortAttribute, 1);
            }

            $q->orderBy($sortAttribute, $sortDirection);
        })->when(!empty($request->query('search')), function ($q) use ($request) {
            $q->where('name', 'like', $request->query('search') . '%')
                ->orWhere('email', 'like', $request->query('search') . '%')
                ->orWhere('phone', 'like', $request->query('search') . '%');
        })->paginate();

        return $this->sendResponse(['users' => UserData::collection($users)], 'User list');
    }

    /**
     * Create the specified resource in storage.
     *
     * @param UserFormData $data
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(UserCreateData $data): \Illuminate\Http\JsonResponse
    {
        $user = User::create($data->toArray());
        return $this->sendResponse(['user' => UserData::from($user)], 'User create');
    }

    /**
     * Display the specified resource.
     *
     * @param User $user
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(User $user): \Illuminate\Http\JsonResponse
    {
        return $this->sendResponse(['user' => UserData::from($user)], 'User list');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UserFormData $data
     * @param User $user
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UserFormData $data, User $user): \Illuminate\Http\JsonResponse
    {
        $user->update($data->toArray());
        return $this->sendResponse(['user' => UserData::from($user)], 'User update');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param User $user
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(User $user): \Illuminate\Http\JsonResponse
    {
        if($user->id !== auth()->user()->id){
            $user->delete();
            return $this->sendResponse([], 'User delete');
        }
        return $this->sendError('Error. This current user!', [], 422);
    }
}
