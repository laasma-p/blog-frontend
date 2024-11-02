import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const formDataChangeHandler = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setValidationErrors((prevErrors) => {
      return { ...prevErrors, [event.target.name]: null };
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName) {
      errors.firstName = "First name is required.";
    }

    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email format is invalid.";
    }

    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }

    return errors;
  };

  const registerHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(
          data.message || "Registration failed. Please try again later."
        );
      } else {
        setSuccessMessage(data.message || "User successfully registered.");
        setFormData({ firstName: "", email: "", password: "" });
      }
    } catch (error) {
      setErrorMessage(
        error.message || "An unexpected error occured. Please try again."
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
            Register
          </h2>
          {successMessage && (
            <p className="text-mantis text-md text-center">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-amaranth text-md text-center">{errorMessage}</p>
          )}
          <form
            onSubmit={registerHandler}
            className="bg-white-smoke p-4 rounded-lg shadow-lg mx-auto"
          >
            <div className="mb-6">
              <label
                htmlFor="firstName"
                className="block font-medium text-nero text-lg mb-2"
              >
                First name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className={`p-2 w-full border rounded-md focus:outline-none focus:ring-2 ${
                  validationErrors.firstName
                    ? "border-amaranth focus:ring-amaranth"
                    : "border-chetwode-blue focus:ring-chetwode-blue"
                }`}
                value={formData.firstName}
                onChange={formDataChangeHandler}
              />
              {validationErrors.firstName && (
                <p className="text-amaranth">{validationErrors.firstName}</p>
              )}
            </div>
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
                    ? "border-amaranth focus:ring-amaranth"
                    : "border-chetwode-blue focus:ring-chetwode-blue"
                }`}
                value={formData.email}
                onChange={formDataChangeHandler}
              />
              {validationErrors.email && (
                <p className="text-amaranth">{validationErrors.email}</p>
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
                    ? "border-amaranth focus:ring-amaranth"
                    : "border-chetwode-blue focus:ring-chetwode-blue"
                }`}
                value={formData.password}
                onChange={formDataChangeHandler}
              />
              {validationErrors.password && (
                <p className="text-amaranth">{validationErrors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className={`w-full py-2 bg-chetwode-blue text-white-smoke rounded-md shadow-md transition-colors duration-300 ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-east-side hover:text-nero"
              }`}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
