import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="relative z-10 mx-auto flex min-h-[calc(100vh-100px)] w-full max-w-[1440px] items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <SignIn appearance={{ elements: { rootBox: "w-full" } }} />
      </div>
    </main>
  );
}
