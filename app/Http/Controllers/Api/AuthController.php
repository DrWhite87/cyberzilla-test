<?php

namespace App\Http\Controllers\Api;

use App\Data\UserData;
use App\Data\UserLoginData;
use App\Data\UserRegisterData;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends BaseController
{

    /**
     * Register api
     *
     * @param UserRegisterData $data
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(UserRegisterData $data): \Illuminate\Http\JsonResponse
    {
        User::create($data->toArray());
        return $this->sendResponse([], 'User register');
    }


    /**
     * Login api
     *
     * @param Request $request
     * @param UserLoginData $data
     * @return \Illuminate\Http\JsonResponse
     */

    public function login(Request $request, UserLoginData $data): \Illuminate\Http\JsonResponse
    {
        if (Auth::attempt($data->toArray())) {
            $request->session()->regenerate();
            return $this->sendResponse(['user' => UserData::from(Auth::user())], 'User login');
        }

        return $this->sendError('Validation Error.', ['email' => ['Unauthorised']], 422);
    }

    /**
     * Log the user out of the application.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request): \Illuminate\Http\JsonResponse
    {
        if (session()->has('temporary')) {
            session()->remove('temporary');
        }

        $request->session()->invalidate();
        return $this->sendResponse([], 'User logout');
    }
}
