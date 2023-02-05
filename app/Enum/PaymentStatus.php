<?php

namespace App\Enum;

/**
 * @method static self new()
 * @method static self processed()
 * @method static self paid()
 * @method static self canceled()
 */
class PaymentStatus extends \Spatie\Enum\Enum
{
    /**
     * @return int[]
     */
    protected static function values(): array
    {
        return [
            'new' => 1,
            'processed' => 2,
            'paid' => 3,
            'canceled' => 4,
        ];
    }


    /**
     * @return string[]
     */
    protected static function labels(): array
    {
        return [
            'new' => 'New',
            'processed' => 'Processed',
            'paid' => 'Paid',
            'canceled' => 'Canceled',
        ];
    }
}
