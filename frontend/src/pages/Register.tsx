import { Link } from "react-router-dom";
import Input from "../components/common/Input";
import { Button } from "../components/ui/button";

export default function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 via-white to-pink-50 px-6">

      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">

        <h1 className="mb-2 text-center text-3xl font-bold">
          Create Account 🚀
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Join EMOFI today.
        </p>

        <form className="space-y-5">

          <div>
            <label className="mb-2 block font-medium">
              Name
            </label>

            <Input
              type="text"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Email
            </label>

            <Input
              type="email"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Password
            </label>

            <Input
              type="password"
              placeholder="Create password"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Confirm Password
            </label>

            <Input
              type="password"
              placeholder="Confirm password"
            />
          </div>

          <Button
            className="w-full"
            size="lg"
          >
            Register
          </Button>

        </form>

        <p className="mt-8 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-violet-600"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}