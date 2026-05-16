import { Suspense } from "react";
import { SuccessContent } from "./success-content";

export const dynamic = "force-dynamic";

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </main>
    }>
      <SuccessContent />
    </Suspense>
  );
}