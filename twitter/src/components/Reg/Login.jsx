import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserAuth } from "../../context/userauth";
function Login() {
  const navigate = useNavigate();
  const [User, SetUser] = useState("");
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [error, SetError] = useState("");
  const { googlesignIn, login } = useUserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email,password)
      navigate("/");
    } catch (err) {
      SetError(err.message);
      window.alert(err.message);
    }
  };
  const handleGoogle = async (e) => {
    e.preventDefault();
    try {
      await googlesignIn();
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="h-screen w-screen flex">
      <div className="h-screen hidden md:flex md:w-1/2 bg-sky-500">
        <img src="src/assets/imgs/login.png" className="h-[100%]" />
      </div>
      <div className="bg-white h-screen md:w-1/2">
        <div className="p-10 pb-0 flex flex-col gap-2">
          <div className="text-[#419CF1] text-5xl">
            <ion-icon name="logo-twitter"></ion-icon>
          </div>
          <h1 className="text-4xl font-bold">Happening now</h1>
          <div className="flex flex-col gap-5">
            <h2 className="text-2xl font-medium">Join twitter today</h2>
            <form action="" className="flex flex-col gap-3 w-2/4">
              <input
                type="text"
                placeholder="@username"
                className="bg-slate-200 placeholder:text-slate-500 p-3 w-64 py-2 rounded-lg focus:outline outline-[#419CF1] outline-2"
                value={User}
                onChange={(e) => SetUser(e.target.value)}
                autoComplete="username"
              />
              <input
                type="text"
                placeholder="Enter Full Name"
                className="bg-slate-200 placeholder:text-slate-500 p-3 w-64 py-2 rounded-lg focus:outline outline-[#419CF1] outline-2"
                value={name}
                onChange={(e) => SetName(e.target.value)}
                autoComplete="name"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="bg-slate-200 placeholder:text-slate-500 p-3 w-64 py-2 rounded-lg focus:outline outline-[#419CF1] outline-2"
                value={email}
                onChange={(e) => SetEmail(e.target.value)}
                autoComplete="email"
              />
              <input
                type="password"
                placeholder="Enter Password"
                className="bg-slate-200 placeholder:text-slate-500 p-3 w-64 py-2 rounded-lg focus:outline outline-[#419CF1] outline-2"
                value={password}
                onChange={(e) => SetPassword(e.target.value)}
                autoComplete="new-password"
              />
              <button
                className="bg-[#419CF1] text-white w-64 py-2 rounded-lg hover:bg-opacity-80 transition-colors flex justify-center items-center"
                onClick={handleSubmit}
              >
                Sign Up
              </button>
              <div className="md:w-[80%] w-64 flex justify-center items-center ">
                <hr className="w-[50%]" />
              </div>
              <div className="flex flex-col justify-center items-start gap-3">
                <div
                  className="cursor-pointer h-12 md:w-[85%] w-64 border-2 border-slate-200 rounded-lg flex justify-start items-center px-4"
                  onClick={handleGoogle}
                >
                  <img
                    src="src/assets/imgs/google.svg"
                    alt=""
                    className="h-[100%]"
                  />
                  <p>Sign in with Google</p>
                </div>
                <p className="md:pl-8 text-sm w-60 flex justify-center items-center">
                  Already have an account
                  <Link to="/login" className="text-[#419CF1]">
                    Log in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
