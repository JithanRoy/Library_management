import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Forgetpassword() {
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleResetPassword = async () => {
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Forgot Password
          </h2>
        </div>
        {!resetSent ? (
          <>
            <p className="text-center">
              Enter your email to receive a password reset link.
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            <button
              onClick={handleResetPassword}
              className="mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset Password
            </button>
            {errorMsg && (
              <p className="mt-2 text-sm text-red-600">{errorMsg}</p>
            )}
          </>
        ) : (
          <>
            <p className="text-center">
              Password reset email sent. Check your email for further
              instructions.
            </p>
            <p className="mt-2 text-center">
              Go back to{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
              .
            </p>
          </>
        )}
      </div>
    </div>
  );
}
