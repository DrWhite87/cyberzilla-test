<?php

namespace App\Data;

use App\Data\Casts\PhoneCast;
use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Min;
use Spatie\LaravelData\Attributes\Validation\Regex;
use Spatie\LaravelData\Attributes\Validation\Unique;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Support\Validation\References\RouteParameterReference;

class UserFormData extends Data
{
    /**
     * UserFormData constructor.
     * @param string $name
     * @param string $email
     * @param string $phone
     */
    public function __construct(
        #[Max(150)]
        public string $name,
        #[Unique('users', 'email', ignore: new RouteParameterReference('user', 'id')), Email]
        public string $email,
        #[WithCast(PhoneCast::class), Regex('/^[0-9\+]+$/i'), Min(9), Max(13)]
        public string $phone
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
        ];
    }
}
