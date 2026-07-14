import { Link } from "react-router-dom";
import Input from "../components/common/Input";
import { Button } from "../components/ui/button";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 via-white to-pink-50 px-6">

      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">

        <h1 className="mb-2 text-center text-3xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Login to continue using EMOFI.
        </p>

        <form className="space-y-5">

          <div>
            <label className="mb-2 block font-medium">
              Email
            </label>

            <Input
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Password
            </label>

            <Input
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <Button
            className="w-full"
            size="lg"
          >
            Login
          </Button>

        </form>

        <p className="mt-8 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-violet-600"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}