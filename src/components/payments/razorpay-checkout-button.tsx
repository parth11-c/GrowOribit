"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => RazorpayCheckoutInstance;
  }
}

type RazorpayCheckoutButtonProps = {
  amount: number;
  currency?: string;
  receipt?: string;
  planTitle: string;
  planId: string;
  billPlan: "monthly" | "annually";
  buttonText: string;
  className?: string;
  disabled?: boolean;
};

type CreateOrderResponse = {
  order_id: string;
  amount: number;
  currency: string;
};

type GetKeyResponse = {
  key_id: string;
};

type ErrorResponse = {
  error?: string;
};

type VerifyPaymentResponse = {
  success: boolean;
  error?: string;
};

type RazorpaySuccessResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayCheckoutOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpaySuccessResponse) => void | Promise<void>;
  method?: {
    upi?: boolean;
    card?: boolean;
    netbanking?: boolean;
    wallet?: boolean;
    emi?: boolean;
    paylater?: boolean;
  };
  modal?: {
    ondismiss?: () => void;
  };
  theme?: {
    color?: string;
  };
};

type RazorpayCheckoutInstance = {
  open: () => void;
  on: (event: "payment.failed", callback: (response: unknown) => void) => void;
};

const MINIMUM_AMOUNT = 100;

const getRazorpayErrorMessage = (response: unknown) => {
  if (!response || typeof response !== "object") return null;

  const error = (response as { error?: unknown }).error;
  if (!error || typeof error !== "object") return null;

  const description = (error as { description?: unknown }).description;
  if (typeof description === "string" && description.trim()) return description.trim();

  const reason = (error as { reason?: unknown }).reason;
  if (typeof reason === "string" && reason.trim()) return reason.trim();

  const code = (error as { code?: unknown }).code;
  if (typeof code === "string" && code.trim()) return code.trim();

  return null;
};

export function RazorpayCheckoutButton({
  amount,
  currency = "INR",
  receipt,
  planTitle,
  buttonText,
  className,
  disabled = false,
  planId,
  billPlan,
}: RazorpayCheckoutButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const fallbackReceipt = useId().replace(/:/g, "");

  const startCheckout = async () => {
    if (amount < MINIMUM_AMOUNT) {
      setStatus("Amount must be at least 100 in the smallest currency unit.");
      return;
    }

    if (!window.Razorpay) {
      setStatus("Razorpay checkout is still loading. Please try again.");
      return;
    }

    setIsLoading(true);
    setStatus(null);

    try {
      const keyResponse = await fetch("/api/razorpay-key", { method: "GET" });
      const keyData = (await keyResponse.json()) as GetKeyResponse | ErrorResponse;

      if (!keyResponse.ok || !("key_id" in keyData) || !keyData.key_id) {
        const errorMessage =
          "error" in keyData ? keyData.error : undefined;
        throw new Error(errorMessage ?? "Missing Razorpay key id.");
      }

      const keyId = keyData.key_id;

      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency,
          receipt: receipt ?? `receipt_${fallbackReceipt}`,
        }),
      });

      const orderData = (await orderResponse.json()) as CreateOrderResponse | ErrorResponse;

      if (!orderResponse.ok || !("order_id" in orderData)) {
        const errorMessage =
          "error" in orderData ? orderData.error : undefined;
        throw new Error(errorMessage ?? "Unable to create Razorpay order.");
      }

      const razorpay = new window.Razorpay({
        key: keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "GrowOrbit",
        description: `${planTitle} plan`,
        order_id: orderData.order_id,
        method: {
          upi: true,
          card: true,
        },
        handler: async (response) => {
          try {
            const verifyResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                order_id: orderData.order_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = (await verifyResponse.json()) as VerifyPaymentResponse;

            if (!verifyResponse.ok || !verifyData.success) {
              throw new Error(verifyData.error ?? "Payment verification failed.");
            }

            // Redirect to success page with plan details
            const params = new URLSearchParams({
              plan: planId,
              billing: billPlan,
            });
            router.push(`/success?${params.toString()}`);
          } catch (error) {
            setStatus(
              error instanceof Error ? error.message : "Payment verification failed.",
            );
          } finally {
            setIsLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            setStatus("Checkout was cancelled.");
            setIsLoading(false);
          },
        },
        theme: {
          color: "#ff0006",
        },
      });

      razorpay.on("payment.failed", (response) => {
        const errorMessage = getRazorpayErrorMessage(response);
        setStatus(errorMessage ?? "Payment failed. Please try again.");
        setIsLoading(false);
      });

      razorpay.open();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to start checkout.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Button
        size="lg"
        type="button"
        onClick={() => void startCheckout()}
        disabled={isLoading || disabled}
        className={className}
      >
        {isLoading ? "Processing..." : buttonText}
      </Button>
      {status ? (
        <p className="mt-4 text-center text-sm font-medium text-white/65">{status}</p>
      ) : null}
    </div>
  );
}
