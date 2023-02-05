<?php

namespace App\Data;

use App\Data\Casts\PaymentStatusCast;
use App\Enum\PaymentStatus;
use Carbon\Carbon;
use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Optional;
use Spatie\LaravelData\Transformers\DateTimeInterfaceTransformer;

class PaymentData extends Data
{
    /**
     * PaymentData constructor.
     * @param int $id
     * @param string $description
     * @param string $card
     * @param float $amount
     * @param float $discount
     * @param float $total
     * @param PaymentStatus $status
     * @param Carbon|null $created_at
     * @param UserData|Optional $user
     */
    public function __construct(
        public int $id,
        public string $description,
        public string $card,
        public float $amount,
        public float $discount,
        public float $total,
        #[WithCast(PaymentStatusCast::class)]
        public PaymentStatus $status,
        #[WithTransformer(DateTimeInterfaceTransformer::class, format: 'Y/m/d H:i:s')]
        public ?Carbon $created_at,
        public UserData|Optional $user,
    ) {}
}
