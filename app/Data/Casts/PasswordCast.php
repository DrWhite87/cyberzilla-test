<?php

namespace App\Data\Casts;

use App\Enum\PaymentStatus;
use Spatie\LaravelData\Casts\Cast;
use Spatie\LaravelData\Support\DataProperty;

class PasswordCast implements Cast
{
    public function cast(DataProperty $property, mixed $value, array $context): string
    {
        return bcrypt($value);
    }
}
