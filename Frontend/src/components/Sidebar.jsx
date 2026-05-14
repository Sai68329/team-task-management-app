import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const location = useLocation();

  const links = [
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
    <div className="w-72 min-h-screen bg-white border-r border-slate-200 p-8 shadow-sm">

      <div className="mb-12">

        <h1 className="text-3xl font-bold text-indigo-700 tracking-tight">
          Task Manager
        </h1>

        <p className="text-slate-500 text-sm mt-2">
          AI Powered Workspace
        </p>

      </div>

      <div className="flex flex-col gap-3">

        {links.map((link) => (

          <Link
            key={link.path}
            to={link.path}
            className={`px-5 py-3 rounded-2xl text-sm font-medium transition

            ${
              location.pathname === link.path
                ? "bg-indigo-100 text-indigo-700"
                : "text-slate-600 hover:bg-slate-100 hover:text-indigo-700"
            }

            `}
          >
            {link.name}
          </Link>

        ))}

      </div>
    </div>
  );
}

export default Sidebar;