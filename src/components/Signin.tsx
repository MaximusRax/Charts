import { useActionState } from "react";
import supabase from "../supabase-client.ts";
import { useAuth } from "../context/useAuth.ts";

const Signin = () => {
  const cntx = useAuth();
  // console.log(cntx);
  const [error, submitAction, isPending] = useActionState<
    Error | null,
    FormData
  >(async (_previousState, formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!email || !password) {
      return new Error("Email and password are required");
    }
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) return new Error("!Unable to Signin");
      if (!error && data?.session) {
        cntx?.setSession(data.session);
        return null;
      }
      return null;
    } catch (error) {
      if (error instanceof Error) console.log(error.message, error.stack);
      return error as Error;
    }
  }, null);


  return (
    <>
      <h1 className="landing-header">Paper Like A Boss</h1>
      <div className="sign-form-container">
        <form
          action={submitAction}
          aria-label="Sign in form"
          aria-describedby="form-description"
        >
          <div id="form-description" className="sr-only">
            Use this form to sign in to your account. Enter your email and
            password.
          </div>

          <h2 className="form-title">Sign in</h2>
          <p>
            Don't have an account yet? {/*<Link className="form-link">*/}
            Sign up
            {/*</Link>*/}
          </p>

          <label htmlFor="email">Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            id="email"
            placeholder=""
            required
            aria-required="true"
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "signin-error" : undefined}
            disabled={isPending}
          />

          <label htmlFor="password">Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            id="password"
            placeholder=""
            required
            aria-required="true"
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "signin-error" : undefined}
            disabled={isPending}
          />

          <button
            type="submit"
            className="form-button"
            // className=
            aria-busy={isPending}
          >
            {isPending ? "Signing in" : "Sign In"}
            {/*'Signing in...' when pending*/}
          </button>
          {error && (
            <div
              id="signin-error"
              role="alert"
              className="sign-form-error-message"
            >
              {error.message}
            </div>
          )}
          {/* Error message */}
        </form>
      </div>
    </>
  );
};

export default Signin;
