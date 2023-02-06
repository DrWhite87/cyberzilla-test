<?php

namespace App\Data;

use App\Data\Casts\PasswordCast;
use App\Data\Casts\PhoneCast;
use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Min;
use Spatie\LaravelData\Attributes\Validation\Regex;
use Spatie\LaravelData\Attributes\Validation\Same;
use Spatie\LaravelData\Attributes\Validation\Unique;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Data;

class UserCreateData extends Data
{
    /**
     * UserRegisterData constructor.
     * @param string $name
     * @param string $email
     * @param string $phone
     * @param string $password
     * @param string $passwordConfirmation
     */
    public function __construct(
        #[Max(150)]
        public string $name,
        #[Unique('users', 'email'), Email]
        public string $email,
        #[WithCast(PhoneCast::class), Regex('/^[0-9\+]+$/i'), Min(9), Max(13)]
        public string $phone,
        #[WithCast(PasswordCast::class), Min(6), Max(20)]
        public string $password,
        #[MapInputName('password_confirmation'), Min(6), Max(20), Same('password')]
        public string $passwordConfirmation
    )
    {
    }

    /**
     * @return string[]
     */
    public static function messages(): array
    {
        return [
            'name.required' => 'Name is required',
            'email.required' => 'Email is required',
            'email.email' => 'Need valid Email',
            'phone.required' => 'Phone is required',
            'phone.regex' => 'Need valid Phone',
            'phone.min' => 'Phone min :min characters',
            'phone.max' => 'Phone max :max characters',
            'password.required' => 'Password is required',
            'password.min' => 'Password min :min characters',
            'password.max' => 'Password max :max characters',
            'password_confirmation.required' => 'Please confirm password',
            'password_confirmation.some' => 'Password mismatch',
        ];
    }
}
