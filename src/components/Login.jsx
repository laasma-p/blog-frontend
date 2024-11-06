import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
    setValidationErrors((prevErrors) => {
      return { ...prevErrors, email: null };
    });
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
    setValidationErrors((prevErrors) => {
      return { ...prevErrors, password: null };
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email format is invalid.";
    }

    if (!password) {
      errors.password = "Password is required.";
    }

    return errors;
  };

  const loggingInHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(
          data.message || "Login failed. Please try again later."
        );
      } else {
        const expirationTime = Date.now() + 3600000;

        localStorage.setItem("token", data.token);
        localStorage.setItem("expirationTime", expirationTime);

        setIsAuthenticated(true);
        navigate("/dashboard");
      }
    } catch (error) {
      setErrorMessage(
        error.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white-smoke min-h-screen">
      <div className="container mx-auto py-8 px-4 flex flex-col">
        <div className="p-4 w-full max-w-xl mx-auto">
          <h2 className="text-4xl font-semibold text-nero mb-6 text-center">
            Login
          </h2>
          {errorMessage && (
            <p className="text-bright-red text-md text-center">
              {errorMessage}
            </p>
          )}
          <form
            onSubmit={loggingInHandler}
            className="bg-white-smoke p-4 rounded-lg mx-auto"
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
                className={`p-2 w-full border rounded-md focus:outline-none focus:ring-2 ${
                  validationErrors.email
                    ? "border-bright-red focus:ring-bright-red"
                    : "border-bright-purple focus:ring-bright-purple"
                }`}
                value={email}
                onChange={emailChangeHandler}
              />
              {validationErrors.email && (
                <p className="text-bright-red">{validationErrors.email}</p>
              )}
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
                className={`p-2 w-full border rounded-md focus:outline-none focus:ring-2 ${
                  validationErrors.password
                    ? "border-bright-red focus:ring-bright-red"
                    : "border-bright-purple focus:ring-bright-purple"
                }`}
                value={password}
                onChange={passwordChangeHandler}
              />
              {validationErrors.password && (
                <p className="text-bright-red">{validationErrors.password}</p>
              )}
            </div>
            <button
              className={`w-full py-2 bg-dark-purple text-white-smoke rounded-md transition-colors duration-300 ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-light-purple hover:text-nero"
              }`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
