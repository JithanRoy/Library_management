import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, firestore } from "../../firebase";

export default function Signup() {
  const [usersInfo, setUsersInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isDisable, setIsDisable] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsersInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsDisable(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        usersInfo.email,
        usersInfo.password
      );

      const user = userCredential.user;

      console.log(user);
      setTimeout(() => {
        setIsDisable(false);
      }, 1000);

      await setDoc(doc(firestore, "users", user.uid), {
        name: usersInfo.name,
        email: usersInfo.email,
        password: usersInfo.password,
      });
      console.log("User created successfully");
      history.push("/");
    } catch (error) {
      const errorMessage = error.message;
      const errorCode = error.code;
      console.error("Signup failed:", errorMessage);
      console.log(errorCode);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Signup
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Name"
              value={usersInfo.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={usersInfo.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="mt-2 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              value={usersInfo.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isDisable}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 ${
                isDisable
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-indigo-700"
              } hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isDisable ? "Signing up" : "Signup"}
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <p>
            Already have an account?{" "}
            <Link
              to="/"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
