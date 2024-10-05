const Register = () => {
  return (
    <div>
      <div>
        <h2>Register</h2>
        <form>
          <div>
            <label htmlFor="firstName">First name</label>
            <input type="text" name="firstName" id="firstName" />
          </div>
          <div>
            <label htmlFor="email">E-mail</label>
            <input type="email" name="email" id="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>
          <button>Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
