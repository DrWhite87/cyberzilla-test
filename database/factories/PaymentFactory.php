<?php

namespace Database\Factories;

use App\Enum\PaymentStatus;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lesson>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $amount = fake()->randomFloat(2, 100, 9999);
        $discount = $amount * fake()->randomFloat(2, 0, 70) / 100;
        $total = $amount - $discount;
        return [
            'user_id' => User::all()->random()->id,
            'description' => fake()->text(),
            'card' => fake()->creditCardNumber,
            'amount' => $amount,
            'discount' => $discount,
            'total' => $total,
            'status' => fake()->randomElement(PaymentStatus::toValues()),
            'created_at' => fake()->dateTimeBetween('-50 days', 'now')
        ];
    }
}
