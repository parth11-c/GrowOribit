import Razorpay from "razorpay";

let razorpayInstance: Razorpay | null = null;

export const getRazorpayConfig = () => {
  const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
  const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!razorpayKeyId || !razorpayKeySecret) {
    throw new Error(
      "Missing Razorpay environment variables. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.",
    );
  }

  return {
    razorpayKeyId,
    razorpayKeySecret,
  };
};

export const getRazorpayClient = () => {
  if (razorpayInstance) return razorpayInstance;

  const { razorpayKeyId, razorpayKeySecret } = getRazorpayConfig();

  razorpayInstance = new Razorpay({
    key_id: razorpayKeyId,
    key_secret: razorpayKeySecret,
  });

  return razorpayInstance;
};
