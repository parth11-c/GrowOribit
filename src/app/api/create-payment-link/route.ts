import { NextResponse } from "next/server";
import { getRazorpayClient } from "@/lib/razorpay";

export const runtime = "nodejs";

type CreatePaymentLinkBody = {
  amount?: number;
  currency?: string;
  receipt?: string;
  planTitle?: string;
};

export async function POST(request: Request) {
  let body: CreatePaymentLinkBody;

  try {
    body = (await request.json()) as CreatePaymentLinkBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const amount = Number(body.amount);
  const currency = (body.currency ?? "INR").toUpperCase();
  const referenceId = body.receipt?.trim() || `plink_${Date.now()}`;
  const planTitle = body.planTitle?.trim() || "GrowOrbit plan";

  if (!Number.isFinite(amount) || !Number.isInteger(amount)) {
    return NextResponse.json(
      { error: "Amount must be an integer in the smallest currency unit." },
      { status: 400 },
    );
  }

  if (currency !== "INR") {
    return NextResponse.json(
      { error: "Unsupported currency. Use INR for Razorpay payments." },
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
    const callbackUrl = new URL("/pricing", request.url);
    callbackUrl.searchParams.set("payment", "razorpay");

    const paymentLink = await razorpay.paymentLink.create({
      amount,
      currency,
      reference_id: referenceId.slice(0, 40),
      description: `${planTitle} - GrowOrbit`,
      customer: {
        name: "GrowOrbit Customer",
      },
      notify: {
        email: false,
        sms: false,
        whatsapp: false,
      },
      reminder_enable: false,
      callback_url: callbackUrl.toString(),
      callback_method: "get",
      notes: {
        plan_title: planTitle,
        receipt: referenceId,
      },
    });

    return NextResponse.json({
      payment_link_id: paymentLink.id,
      short_url: paymentLink.short_url,
    });
  } catch (error) {
    console.error("[create-payment-link] Razorpay payment link creation failed", error);

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
        { error: "Razorpay rejected the payment link request." },
        { status: statusCode },
      );
    }

    return NextResponse.json(
      { error: "Failed to create Razorpay payment link." },
      { status: 500 },
    );
  }
}
