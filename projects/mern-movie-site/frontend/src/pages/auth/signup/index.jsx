import SigninAndSignupForm from "features/auth/components/SigninAndSignupForm";
import banner from "assets/images/banner-about.png";

const SignupPage = () => {
  return (
    <div>
      <div
        className="min-h-[30vh] md:min-h-[50vh] flex items-center justify-center"
        style={{
          background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 2)),
                url(${banner}) no-repeat center/cover`,
        }}
      >
        <div className="text-center font-semibold text-xl text-white">
          Signup
        </div>
      </div>
      <div className="my-8">
        <SigninAndSignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
