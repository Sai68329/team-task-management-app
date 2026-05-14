import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [showCreateProject, setShowCreateProject] =
  useState(false);
  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [status, setStatus] = useState("ACTIVE");

  // SEARCH & FILTER

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  // FETCH PROJECTS

  const fetchProjects = async () => {
    try {
      const response = await API.get("/projects/");

      setProjects(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // CREATE PROJECT

  const createProject = async () => {

  if (!name || !description) {

    alert("Please fill all fields");

    return;
  }

  try {

    await API.post("/projects/", {
      name,
      description,
      status,
    });

    alert("Project Created");

    setName("");

    setDescription("");

    setStatus("ACTIVE");

    // CLOSE DROPDOWN AFTER CREATE

    setShowCreateProject(false);

    fetchProjects();

  } catch (error) {

    console.log(error);

    alert("Project Creation Failed");
  }
};

  // FILTER PROJECTS

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "" || project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // STATUS COLORS

  const statusColors = {
    ACTIVE: "bg-indigo-100 text-indigo-700 border border-indigo-200",

    COMPLETED: "bg-teal-100 text-teal-700 border border-teal-200",

    PLANNING: "bg-rose-100 text-rose-700 border border-rose-200",
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <div className="relative overflow-hidden p-10">
        {/* Background Design */}

        <div className="absolute top-[-120px] right-[-100px] w-96 h-96 bg-indigo-200 opacity-20 rounded-full blur-3xl"></div>

        <div className="absolute bottom-[-120px] left-[-100px] w-96 h-96 bg-teal-200 opacity-20 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          {/* Header */}

          <div className="mb-10">
            <h1 className="text-5xl font-bold text-slate-800">Projects</h1>

            <p className="text-slate-500 mt-3 text-lg">
              Organize projects and manage team collaboration
            </p>
          </div>

          {/* Create Project */}

          <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[32px] shadow-2xl p-8 mb-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              Create Project
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                placeholder="Project Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-slate-300 bg-white/70 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none p-4 rounded-2xl transition"
              />

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border border-slate-300 bg-white/70 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none p-4 rounded-2xl transition"
              >
                <option value="ACTIVE">ACTIVE</option>

                <option value="PLANNING">PLANNING</option>

                <option value="COMPLETED">COMPLETED</option>
              </select>
            </div>

            <textarea
              placeholder="Project Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-5 border border-slate-300 bg-white/70 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none p-4 rounded-2xl h-32 resize-none transition"
            />

            <button
              onClick={createProject}
              className="mt-5 bg-indigo-700 hover:bg-indigo-800 text-white px-8 py-4 rounded-2xl font-medium transition shadow-lg shadow-indigo-100"
            >
              Create Project
            </button>
          </div>

          {/* Search & Filters */}

          <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[28px] shadow-xl p-6 mb-10">
            <div className="flex flex-col lg:flex-row gap-5">
              {/* Search */}

              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border border-slate-300 bg-white/70 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none px-5 py-4 rounded-2xl transition"
                />
              </div>

              {/* Status Filter */}

              <div className="w-48">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full border border-slate-300 bg-white/70 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none px-4 py-3 rounded-2xl transition"
                >
                  <option value="">All Status</option>

                  <option value="ACTIVE">ACTIVE</option>

                  <option value="PLANNING">PLANNING</option>

                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </div>
            </div>
          </div>

          {/* Empty State */}

          {filteredProjects.length === 0 ? (

  <div className="relative overflow-hidden bg-white/70 backdrop-blur-xl border border-white/40 rounded-[36px] p-16 shadow-2xl text-center">

    {/* Background Blur */}

    <div className="absolute top-[-40px] right-[-30px] w-36 h-36 bg-indigo-100 rounded-full blur-3xl opacity-60"></div>

    <div className="absolute bottom-[-40px] left-[-30px] w-36 h-36 bg-teal-100 rounded-full blur-3xl opacity-60"></div>

    <div className="relative z-10">

      {/* Icon */}

      <div className="w-24 h-24 mx-auto rounded-3xl bg-indigo-100 flex items-center justify-center shadow-sm mb-8">

        <div className="w-12 h-12 rounded-2xl bg-indigo-700 flex items-center justify-center text-white text-2xl">
          📁
        </div>

      </div>

      {/* Heading */}

      <h2 className="text-4xl font-bold text-slate-800">
        No Projects Found
      </h2>

      <p className="text-slate-500 mt-4 text-lg leading-8 max-w-xl mx-auto">
        No matching projects were found based on your current search or filter selection.
      </p>

      {/* Suggestions */}

      <div className="flex flex-wrap justify-center gap-4 mt-10">

        <div className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-5 py-3 rounded-2xl text-sm font-medium">
          Try a different project name
        </div>

        <div className="bg-teal-50 border border-teal-100 text-teal-700 px-5 py-3 rounded-2xl text-sm font-medium">
          Clear status filters
        </div>

        <div className="bg-rose-50 border border-rose-100 text-rose-700 px-5 py-3 rounded-2xl text-sm font-medium">
          Create a new project
        </div>

      </div>

    </div>

  </div>

) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => navigate(`/projects/${project.id}`)}
                  className="relative overflow-hidden bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-7 shadow-xl hover:-translate-y-1 hover:shadow-2xl transition duration-300"
                >
                  <div className="absolute top-[-30px] right-[-20px] w-24 h-24 bg-indigo-100 rounded-full blur-2xl opacity-70"></div>

                  <div className="relative z-10">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                          {project.name}
                        </h2>
                      </div>

                      <span
                        className={`${statusColors[project.status]} px-4 py-1 rounded-full text-xs font-semibold`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <p className="text-slate-600 mt-5 leading-7">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Projects;
