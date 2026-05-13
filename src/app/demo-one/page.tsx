import { ClerkAuthStrip } from "@/components/clerk-auth-strip";
import LumaBar from "@/components/ui/futuristic-nav";

export default function DemoOne() {
  return (
    <div className="relative min-h-screen bg-background">
      <ClerkAuthStrip />
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-muted">
          Demo
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
          Luma bar
        </h1>
        <p className="mt-3 text-muted">
          Fixed bottom navigation — tap an icon to see the active pill animate.
        </p>
      </div>
      <LumaBar />
    </div>
  );
}
