<?php

namespace App\Data\Casts;

use App\Enum\PaymentStatus;
use Spatie\LaravelData\Casts\Cast;
use Spatie\LaravelData\Support\DataProperty;

class PaymentTotalCast implements Cast
{
    /**
     * @param DataProperty $property
     * @param mixed $value
     * @param array $context
     * @return string
     */
    public function cast(DataProperty $property, mixed $value, array $context): string
    {
        return 123123;
    }
}
