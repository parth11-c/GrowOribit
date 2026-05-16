import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { getRazorpayConfig } from "@/lib/razorpay";

export const runtime = "nodejs";

type VerifyPaymentBody = {
  order_id?: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
};

export async function POST(request: Request) {
  let body: VerifyPaymentBody;

  try {
    body = (await request.json()) as VerifyPaymentBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const orderId = body.order_id?.trim() || body.razorpay_order_id?.trim();
  const paymentId = body.razorpay_payment_id?.trim();
  const signature = body.razorpay_signature?.trim();

  if (!orderId || !paymentId || !signature) {
    return NextResponse.json(
      { error: "order_id, razorpay_payment_id, and razorpay_signature are required." },
      { status: 400 },
    );
  }

  let razorpayKeySecret: string;

  try {
    ({ razorpayKeySecret } = getRazorpayConfig());
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Missing Razorpay configuration.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }

  const expectedSignature = crypto
    .createHmac("sha256", razorpayKeySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  const isValid =
    expectedSignature.length === signature.length &&
    crypto.timingSafeEqual(
      Buffer.from(expectedSignature, "utf8"),
      Buffer.from(signature, "utf8"),
    );

  if (!isValid) {
    return NextResponse.json(
      { success: false, error: "Payment signature mismatch." },
      { status: 400 },
    );
  }

  return NextResponse.json({ success: true });
}
