import { SEO } from "@/lib/seo";
import signInSvg from "@/assets/sign-up.svg";
import { SignUpView } from "@/feature/auth/components/sign-up-view";

function SignUpPage() {
  SEO({ title: "sign-up" });

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* LEFT SIDE (SVG) */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center ">
        <img src={signInSvg} alt="login" className="max-w-md w-full" />
      </div>

      {/* RIGHT SIDE (FORM) */}
      <div className="w-full md:w-1/2 flex items-center justify-center ">
        <div className="w-full max-w-md">
          <SignUpView />
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
