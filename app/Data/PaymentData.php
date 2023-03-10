<?php

namespace App\Data;

use App\Data\Casts\PaymentStatusCast;
use App\Data\Casts\PaymentTotalCast;
use App\Data\Casts\PhoneCast;
use App\Enum\PaymentStatus;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Attributes\Validation\DigitsBetween;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Min;
use Spatie\LaravelData\Attributes\Validation\Regex;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Optional;
use Spatie\LaravelData\Transformers\DateTimeInterfaceTransformer;

class PaymentData extends Data
{
    /**
     * PaymentData constructor.
     * @param int|Optional $id
     * @param string $description
     * @param string $card
     * @param float $amount
     * @param float $discount
     * @param float $total
     * @param PaymentStatus $status
     * @param Carbon|Optional $created_at
     * @param UserData|Optional $user
     */
    public function __construct(
        public int $id,
        #[Max(500)]
        public string $description,
        #[Regex('/^[0-9]+$/i'), DigitsBetween(16,20)]
        public string $card,
        #[DigitsBetween(0,99999999.99)]
        public float $amount,
        #[DigitsBetween(0,99999999.99)]
        public float $discount,
        public float $total,
        #[WithCast(PaymentStatusCast::class)]
        public PaymentStatus $status,
        #[WithTransformer(DateTimeInterfaceTransformer::class, format: 'Y/m/d H:i:s')]
        public Carbon $created_at,
        public UserData|Optional $user,
    ) {}
}
