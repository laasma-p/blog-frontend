import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
  });

  const formDataChangeHandler = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const registerHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="bg-white-smoke min-h-screen flex justify-center">
      <div className="max-w-md w-full p-6 text-nero">
        <h2 className="text-3xl pb-4 font-semibold">Register</h2>
        <form className="space-y-4" onSubmit={registerHandler}>
          <div>
            <label htmlFor="firstName" className="block font-medium">
              First name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="mt-1 p-2 w-full border border-chetwode-blue rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-east-side"
              required
              value={formData.firstName}
              onChange={formDataChangeHandler}
            />
          </div>
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
              value={formData.email}
              onChange={formDataChangeHandler}
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
              required
              value={formData.password}
              onChange={formDataChangeHandler}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-chetwode-blue text-white-smoke rounded-md shadow-md hover:bg-east-side hover:text-nero transition-colors duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
