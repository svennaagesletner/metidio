import LoginForm from "@/components/forms/auth/login-form";
import { ModeToggle } from "@/components/buttons/modeToggle";
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen ">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-2 md:-mt-32 ">
        <div className="flex h-5 w-full items-end rounded-lg bg-grey-300 md:h-36 text-center">
          <div className="hidden w-full dark:text-white md:block text-2xl">
                  Metid.io
          </div>
        </div>
        <LoginForm />
        <div className="flex justify-center">
        <ModeToggle />
        </div>

      </div>
    </main>
  );
}