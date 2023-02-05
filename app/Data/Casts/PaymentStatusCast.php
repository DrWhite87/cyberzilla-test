<?php

namespace App\Data\Casts;

use App\Enum\PaymentStatus;
use Spatie\LaravelData\Casts\Cast;
use Spatie\LaravelData\Support\DataProperty;

class PaymentStatusCast implements Cast
{
    public function cast(DataProperty $property, mixed $value, array $context): PaymentStatus
    {
        return PaymentStatus::from($value);
    }
}
