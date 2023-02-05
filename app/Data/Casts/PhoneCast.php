<?php

namespace App\Data\Casts;

use App\Enum\PaymentStatus;
use Spatie\LaravelData\Casts\Cast;
use Spatie\LaravelData\Support\DataProperty;

class PhoneCast implements Cast
{
    public function cast(DataProperty $property, mixed $value, array $context): string
    {
        return preg_replace('#[^0-9]#', '', $value);
    }
}
