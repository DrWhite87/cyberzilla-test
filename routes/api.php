<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post('register', [\App\Http\Controllers\Api\AuthController::class, 'register'])->name('register');
Route::post('login', [\App\Http\Controllers\Api\AuthController::class, 'login'])->name('login');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [\App\Http\Controllers\Api\AuthController::class, 'logout'])->name('logout');

    Route::get('/user', function (Request $request) {
        return response()->json([
            'success' => true,
            'data' => \App\Data\UserData::from($request->user()),
            'message' => '',
        ], 200);
    });

    Route::resource('users', \App\Http\Controllers\Api\UserController::class);

    Route::get('/users/{user}/payments', [\App\Http\Controllers\Api\PaymentController::class, 'index'])
        ->where(['user' => '[0-9]+'])
        ->name('users.payments');

    Route::get('/users/{user}/payments/{payment}', [\App\Http\Controllers\Api\PaymentController::class, 'show'])
        ->where(['user' => '[0-9]+', 'payment' => '[0-9]+'])
        ->name('users.payments.show');

    Route::get('/payments/statuses', [\App\Http\Controllers\Api\PaymentController::class, 'statuses'])
        ->name('users.payments.statuses');

    Route::post('/users/{user}/payments', [\App\Http\Controllers\Api\PaymentController::class, 'store'])
        ->where(['user' => '[0-9]+', 'payment' => '[0-9]+'])
        ->name('users.payments.store');

    Route::patch('/payments/{payment}', [\App\Http\Controllers\Api\PaymentController::class, 'update'])
        ->where(['payment' => '[0-9]+'])
        ->name('users.payments.update');

    Route::delete('/payments/{payment}', [\App\Http\Controllers\Api\PaymentController::class, 'destroy'])
        ->where(['payment' => '[0-9]+'])
        ->name('users.payments.destroy');
});
