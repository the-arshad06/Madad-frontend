import { Link, useLocation } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";

export default function HaveAcc() {
  const { pathname } = useLocation();

  const isLogin = pathname === "/login";

  return (
    <div className="flex items-center justify-center mt-4">
      <label htmlFor="terms" className="text-gray-600 flex items-center gap-1">
        {isLogin ? (
          <>
            <UserPlus size={18} className="text-blue-600" />
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 underline font-medium hover:text-blue-700"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <LogIn size={18} className="text-blue-600" />
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 underline font-medium hover:text-blue-700"
            >
              Log In
            </Link>
          </>
        )}
      </label>
    </div>
  );
}
