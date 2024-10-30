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
      const expirationTime = Date.now() + 3600000;

      localStorage.setItem("token", data.token);
      localStorage.setItem("expirationTime", expirationTime);

      setIsAuthenticated(true);
      navigate("/dashboard");
    } else {
      console.error("Cannot log in.");
    }
  };

  return (
    <div className="bg-white-smoke min-h-screen">
      <div className="container mx-auto py-8 px-4 flex flex-col">
        <div
          className="p-4 w-full border-border-chetwode-blue
           max-w-xl mx-auto"
        >
          <h2 className="text-4xl font-semibold text-nero mb-6 text-center">
            Login
          </h2>
          <form
            onSubmit={loggingInHandler}
            className="bg-white-smoke p-4 rounded-lg shadow-lg mx-auto"
          >
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block font-medium text-nero text-lg mb-2"
              >
                E-mail
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="p-2 w-full border border-chetwode-blue rounded-md focus:outline-none focus:ring-2 focus:ring-east-side"
                required
                value={email}
                onChange={emailChangeHandler}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block font-medium text-nero text-lg mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="p-2 w-full border border-chetwode-blue rounded-md focus:outline-none focus:ring-2 focus:ring-east-side"
                required
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
    </div>
  );
};

export default Login;
