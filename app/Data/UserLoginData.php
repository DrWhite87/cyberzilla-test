<?php

namespace App\Data;

use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Data;

class UserLoginData extends Data
{
    /**
     * UserLoginData constructor.
     * @param string $email
     * @param string $password
     */
    public function __construct(
        #[Email]
        public string $email,
        public string $password,
    )
    {
    }

    /**
     * @return string[]
     */
    public static function messages(): array
    {
        return [
            'email.required' => 'Email is required',
            'email.email' => 'Need valid Email',
            'password.required' => 'Password is required',
        ];
    }
}
