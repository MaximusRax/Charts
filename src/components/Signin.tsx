import { useAuth } from "../context/useAuth.ts";

const Signin = () => {
  const cntx = useAuth();
  console.log(cntx);
  return (
    <>
      <h1 className="landing-header">Paper Like A Boss</h1>
    </>
  );
};

export default Signin;
