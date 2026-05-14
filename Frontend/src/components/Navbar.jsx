import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const location = useLocation();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/");
  };

  const navLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Projects",
      path: "/projects",
    },
    {
      name: "Tasks",
      path: "/tasks",
    },
    {
      name: "Create Task",
      path: "/create-task",
    },
  ];

  return (
    <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/40 shadow-lg">

      {/* Background Design */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-50px] left-[20%] w-40 h-40 bg-indigo-200 opacity-20 rounded-full blur-3xl"></div>

        <div className="absolute top-[-50px] right-[15%] w-40 h-40 bg-teal-200 opacity-20 rounded-full blur-3xl"></div>

      </div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5 px-6 lg:px-10 py-5">

        {/* Logo Section */}

        <div>

          <h1 className="text-3xl font-bold text-indigo-700 tracking-tight">
            Task Manager
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            AI Powered Team Workspace
          </p>

        </div>

        {/* Navigation */}

        <div className="flex flex-wrap items-center gap-3">

          {navLinks.map((link) => (

            <Link
              key={link.path}
              to={link.path}
              className={`px-5 py-2.5 rounded-2xl text-sm font-medium transition duration-300

              ${
                location.pathname === link.path

                  ? "bg-indigo-100 text-indigo-700 border border-indigo-200 shadow-sm"

                  : "text-slate-600 hover:bg-white/80 hover:text-indigo-700 border border-transparent"
              }
              `}
            >
              {link.name}
            </Link>

          ))}

        </div>

        {/* User Section */}

        <div className="flex items-center gap-4">

          {/* Profile */}

          <div className="flex items-center gap-3 bg-white/70 backdrop-blur-xl border border-white/40 px-4 py-2 rounded-2xl shadow-sm">

            {/* Avatar */}

            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-600 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-md">

              {user?.name
                ? user.name.charAt(0).toUpperCase()
                : "U"}

            </div>

            {/* User Info */}

            <div className="hidden sm:block">

              <p className="text-sm font-semibold text-slate-800">
                {user?.name || "User"}
              </p>

              <p className="text-xs text-slate-500">
                {user?.role || "ADMIN"}
              </p>

            </div>

          </div>

          {/* Logout */}

          <button
            onClick={logout}
            className="bg-rose-700 hover:bg-rose-800 text-white px-5 py-2.5 rounded-2xl text-sm font-medium transition duration-300 shadow-lg shadow-rose-100"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
}

export default Navbar;