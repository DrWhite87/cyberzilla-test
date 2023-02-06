<?php

namespace App\Data;

use App\Data\Casts\PaymentStatusCast;
use App\Data\Casts\PaymentTotalCast;
use App\Data\Casts\PhoneCast;
use App\Enum\PaymentStatus;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Attributes\Validation\Between;
use Spatie\LaravelData\Attributes\Validation\DigitsBetween;
use Spatie\LaravelData\Attributes\Validation\LessThan;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Attributes\Validation\Min;
use Spatie\LaravelData\Attributes\Validation\Regex;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Optional;
use Spatie\LaravelData\Transformers\DateTimeInterfaceTransformer;

class PaymentFormData extends Data
{
    /**
     * PaymentData constructor.
     * @param string $description
     * @param string $card
     * @param float $amount
     * @param float $discount
     * @param float $total
     * @param PaymentStatus $status
     */
    public function __construct(
        #[Max(500)]
        public string $description,
        #[Regex('/^[0-9]+$/i'), DigitsBetween(14,20)]
        public string $card,
        #[Between(0,99999999.99)]
        public float $amount,
        #[Between(0,99999999.99), LessThan('amount')]
        public float $discount,
        #[WithCast(PaymentStatusCast::class)]
        public PaymentStatus $status
    ) {}
}
