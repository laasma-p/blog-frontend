const Login = () => {
  return (
    <div>
      <div>
        <h2>Login</h2>
        <form>
          <div>
            <label htmlFor="email">E-mail</label>
            <input type="email" name="email" id="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>
          <button>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
