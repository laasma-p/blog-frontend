import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const loggingInHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="bg-white-smoke min-h-screen flex justify-center">
      <div className="max-w-md w-full p-6 text-nero">
        <h2 className="text-3xl pb-4 font-semibold">Login</h2>
        <form className="space-y-4" onSubmit={loggingInHandler}>
          <div>
            <label htmlFor="email" className="block font-medium">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="mt-1 p-2 w-full border border-chetwode-blue rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-east-side"
              required
              value={email}
              onChange={emailChangeHandler}
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="mt-1 p-2 w-full border border-chetwode-blue rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-east-side"
              value={password}
              onChange={passwordChangeHandler}
            />
          </div>
          <button className="w-full py-2 bg-chetwode-blue text-white-smoke rounded-md shadow-md hover:bg-east-side hover:text-nero transition-colors duration-300">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;