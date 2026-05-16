import { NextResponse } from "next/server";
import { getRazorpayClient } from "@/lib/razorpay";

export const runtime = "nodejs";

type CreateOrderBody = {
  amount?: number;
  currency?: string;
  receipt?: string;
};

export async function POST(request: Request) {
  let body: CreateOrderBody;

  try {
    body = (await request.json()) as CreateOrderBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const amount = Number(body.amount);
  const currency = (body.currency ?? "INR").toUpperCase();
  const receipt = body.receipt?.trim() || `rcpt_${Date.now()}`;

  if (!Number.isFinite(amount) || !Number.isInteger(amount)) {
    return NextResponse.json(
      { error: "Amount must be an integer in the smallest currency unit." },
      { status: 400 },
    );
  }

  // This project currently uses Razorpay Standard Checkout. Unless your account
  // is configured for multi-currency, Razorpay will reject non-INR orders.
  if (currency !== "INR") {
    return NextResponse.json(
      { error: "Unsupported currency. Use INR for Razorpay checkout." },
      { status: 400 },
    );
  }

  if (amount < 100) {
    return NextResponse.json(
      { error: "Minimum amount is 100 in the smallest currency unit." },
      { status: 400 },
    );
  }

  try {
    const razorpay = getRazorpayClient();
    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt,
    });

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    // Keep some server-side context for debugging without leaking secrets.
    console.error("[create-order] Razorpay order creation failed", error);

    if (error instanceof Error && error.message.includes("Missing Razorpay environment variables")) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const statusCode =
      typeof error === "object" &&
      error !== null &&
      "statusCode" in error &&
      typeof error.statusCode === "number"
        ? error.statusCode
        : 500;

    if (statusCode === 401) {
      return NextResponse.json(
        { error: "Razorpay authentication failed." },
        { status: 401 },
      );
    }

    if (statusCode >= 400 && statusCode < 500) {
      return NextResponse.json(
        { error: "Razorpay rejected the order request. Check amount/currency." },
        { status: statusCode },
      );
    }

    return NextResponse.json(
      { error: "Failed to create Razorpay order." },
      { status: 500 },
    );
  }
}
