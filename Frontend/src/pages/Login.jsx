import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    if (!email || !password) {

      alert("Please fill all fields");

      return;
    }

    try {

      const response = await API.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Invalid Credentials");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-100 flex items-center justify-center px-6">

      {/* Background Blur Effects */}

      <div className="absolute top-[-120px] left-[-100px] w-[420px] h-[420px] bg-indigo-300 opacity-30 rounded-full blur-3xl"></div>

      <div className="absolute bottom-[-140px] right-[-120px] w-[420px] h-[420px] bg-teal-300 opacity-30 rounded-full blur-3xl"></div>

      {/* Floating Background Cards */}

      <div className="absolute top-24 left-16 w-72 h-44 bg-white/40 backdrop-blur-xl border border-white/30 rounded-[32px] rotate-[-12deg] shadow-2xl p-6 flex flex-col justify-between">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-xs text-slate-500">
              Productivity
            </p>

            <h2 className="text-3xl font-bold text-indigo-700 mt-2">
              92%
            </h2>

          </div>

          <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-2xl">
            📈
          </div>

        </div>

        <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">

          <div className="w-[92%] h-full bg-indigo-600 rounded-full"></div>

        </div>

      </div>

      <div className="absolute bottom-28 right-20 w-80 h-52 bg-white/30 backdrop-blur-xl border border-white/30 rounded-[32px] rotate-[10deg] shadow-2xl p-6">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-slate-500 text-sm">
              Active Tasks
            </p>

            <h2 className="text-5xl font-bold text-slate-800 mt-3">
              48
            </h2>

          </div>

          <div className="w-16 h-16 rounded-2xl bg-teal-100 flex items-center justify-center text-3xl">
            ⚡
          </div>

        </div>

        <div className="flex gap-3 mt-8">

          <div className="bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium">
            Completed
          </div>

          <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium">
            AI Managed
          </div>

        </div>

      </div>

      <div className="absolute top-[40%] right-[18%] w-52 h-32 bg-indigo-100/40 backdrop-blur-xl border border-white/20 rounded-[28px] rotate-[18deg] shadow-xl p-5 flex flex-col justify-center">

        <p className="text-slate-500 text-sm">
          Team Efficiency
        </p>

        <h2 className="text-4xl font-bold text-slate-800 mt-2">
          +34%
        </h2>

      </div>

      {/* Main Login Card */}

      <div className="relative z-10 w-full max-w-md">

        <div className="relative overflow-hidden bg-white/70 backdrop-blur-2xl border border-white/40 rounded-[36px] shadow-2xl p-10">

          {/* Internal Blur Design */}

          <div className="absolute top-[-60px] right-[-40px] w-40 h-40 bg-indigo-200 opacity-30 rounded-full blur-3xl"></div>

          <div className="absolute bottom-[-50px] left-[-40px] w-40 h-40 bg-teal-200 opacity-30 rounded-full blur-3xl"></div>

          <div className="relative z-10">

            <div className="mb-10">

              <h1 className="text-4xl font-bold text-slate-800">
                Welcome Back
              </h1>

              <p className="text-slate-500 mt-3">
                Login to continue managing your projects and tasks
              </p>

            </div>

            <div className="flex flex-col gap-5">

              <input
                type="email"
                placeholder="Email"
                className="border border-slate-300 bg-white/70 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none p-4 rounded-2xl transition"
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <input
                type="password"
                placeholder="Password"
                className="border border-slate-300 bg-white/70 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none p-4 rounded-2xl transition"
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                onClick={handleLogin}
                className="bg-indigo-700 hover:bg-indigo-800 text-white p-4 rounded-2xl text-lg font-medium transition shadow-lg shadow-indigo-100"
              >
                Login
              </button>

              <Link
                to="/signup"
                className="text-center text-indigo-700 font-medium hover:text-indigo-800 transition"
              >
                Create Account
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;