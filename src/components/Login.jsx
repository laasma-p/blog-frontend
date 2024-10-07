import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const loggingInHandler = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } else {
      console.error("Cannot log in.");
    }
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
