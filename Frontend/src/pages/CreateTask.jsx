import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function CreateTask() {

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [priority, setPriority] =
    useState("MEDIUM");

  const [status, setStatus] =
    useState("TODO");

  const [deadline, setDeadline] =
    useState("");

  const [assignedTo, setAssignedTo] =
    useState("");

  const [projectId, setProjectId] =
    useState("");

  const [users, setUsers] =
    useState([]);

  const [projects, setProjects] =
    useState([]);

  // FETCH USERS & PROJECTS

  const fetchUsersAndProjects =
    async () => {

      try {

        const usersResponse =
          await API.get("/auth/users");

        const projectsResponse =
          await API.get("/projects/");

        setUsers(usersResponse.data);

        setProjects(
          projectsResponse.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchUsersAndProjects();

  }, []);

  // AI PRIORITY

  const suggestPriority = async () => {

    if (!description) {

      alert(
        "Please enter task description"
      );

      return;
    }

    try {

      const response =
        await API.post(
          "/ai/priority",
          {
            description,
          }
        );

      setPriority(
        response.data.priority
      );

    } catch (error) {

      console.log(error);

      alert(
        "AI Suggestion Failed"
      );
    }
  };

  // CREATE TASK

  const createTask = async () => {

    if (
      !title ||
      !description ||
      !assignedTo ||
      !projectId ||
      !deadline
    ) {

      alert(
        "Please fill all fields"
      );

      return;
    }

    try {

      await API.post("/tasks/", {

        title,

        description,

        priority,

        status,

        deadline,

        assigned_to:
          Number(assignedTo),

        project_id:
          Number(projectId),
      });

      alert(
        "Task Created Successfully"
      );

      // RESET

      setTitle("");

      setDescription("");

      setPriority("MEDIUM");

      setStatus("TODO");

      setDeadline("");

      setAssignedTo("");

      setProjectId("");

    } catch (error) {

      console.log(error);

      alert(
        "Task Creation Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="relative overflow-hidden p-10 flex justify-center">

        {/* Background Design */}

        <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-indigo-200 opacity-20 rounded-full blur-3xl"></div>

        <div className="absolute bottom-[-120px] right-[-100px] w-96 h-96 bg-teal-200 opacity-20 rounded-full blur-3xl"></div>

        {/* Main Card */}

        <div className="relative z-10 w-full max-w-4xl overflow-hidden bg-white/70 backdrop-blur-xl border border-white/40 rounded-[32px] shadow-2xl p-10">

          {/* Internal Design */}

          <div className="absolute top-[-60px] right-[-60px] w-52 h-52 bg-indigo-200 opacity-20 rounded-full blur-3xl"></div>

          <div className="absolute bottom-[-60px] left-[-50px] w-48 h-48 bg-teal-200 opacity-20 rounded-full blur-3xl"></div>

          <div className="relative z-10">

            {/* Header */}

            <div className="mb-10">

              <h1 className="text-4xl font-bold text-slate-800">
                Create Task
              </h1>

              <p className="text-slate-500 mt-3">
                Organize, assign and
                track tasks efficiently
              </p>

            </div>

            {/* Form */}

            <div className="flex flex-col gap-7">

              {/* TITLE */}

              <div>

                <label className="text-sm font-medium text-slate-600">
                  Task Title
                </label>

                <input
                  type="text"
                  placeholder="Enter task title"
                  className="w-full mt-2 border border-slate-300 bg-white/70 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none p-4 rounded-2xl transition"
                  value={title}
                  onChange={(e) =>
                    setTitle(
                      e.target.value
                    )
                  }
                />

              </div>

              {/* DESCRIPTION */}

              <div>

                <label className="text-sm font-medium text-slate-600">
                  Task Description
                </label>

                <textarea
                  placeholder="Describe the task..."
                  className="w-full mt-2 border border-slate-300 bg-white/70 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none p-4 rounded-2xl h-40 resize-none transition"
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value
                    )
                  }
                />

              </div>

              {/* PRIORITY + STATUS */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>

                  <label className="text-sm font-medium text-slate-600">
                    Priority
                  </label>

                  <select
                    className="w-full mt-2 border border-slate-300 bg-white/70 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none p-4 rounded-2xl transition"
                    value={priority}
                    onChange={(e) =>
                      setPriority(
                        e.target.value
                      )
                    }
                  >

                    <option value="HIGH">
                      HIGH
                    </option>

                    <option value="MEDIUM">
                      MEDIUM
                    </option>

                    <option value="LOW">
                      LOW
                    </option>

                  </select>

                </div>

                <div>

                  <label className="text-sm font-medium text-slate-600">
                    Status
                  </label>

                  <select
                    className="w-full mt-2 border border-slate-300 bg-white/70 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none p-4 rounded-2xl transition"
                    value={status}
                    onChange={(e) =>
                      setStatus(
                        e.target.value
                      )
                    }
                  >

                    <option value="TODO">
                      TODO
                    </option>

                    <option value="IN_PROGRESS">
                      IN_PROGRESS
                    </option>

                    <option value="COMPLETED">
                      COMPLETED
                    </option>

                  </select>

                </div>

              </div>

              {/* AI BUTTON */}

              <button
                onClick={
                  suggestPriority
                }
                className="bg-slate-800 hover:bg-slate-900 text-white p-4 rounded-2xl font-medium transition"
              >
                Suggest Priority with AI
              </button>

              {/* DEADLINE */}

              <div>

                <label className="text-sm font-medium text-slate-600">
                  Deadline
                </label>

                <input
                  type="datetime-local"
                  className="w-full mt-2 border border-slate-300 bg-white/70 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none p-4 rounded-2xl transition"
                  value={deadline}
                  onChange={(e) =>
                    setDeadline(
                      e.target.value
                    )
                  }
                />

              </div>

              {/* USER + PROJECT */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* USERS */}

                <div>

                  <label className="text-sm font-medium text-slate-600">
                    Assign User
                  </label>

                  <select
                    className="w-full mt-2 border border-slate-300 bg-white/70 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none p-4 rounded-2xl transition"
                    value={assignedTo}
                    onChange={(e) =>
                      setAssignedTo(
                        e.target.value
                      )
                    }
                  >

                    <option value="">
                      Select User
                    </option>

                    {users.map(
                      (user) => (

                        <option
                          key={user.id}
                          value={
                            user.id
                          }
                        >
                          {user.name}
                        </option>

                      )
                    )}

                  </select>

                </div>

                {/* PROJECTS */}

                <div>

                  <label className="text-sm font-medium text-slate-600">
                    Select Project
                  </label>

                  <select
                    className="w-full mt-2 border border-slate-300 bg-white/70 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none p-4 rounded-2xl transition"
                    value={projectId}
                    onChange={(e) =>
                      setProjectId(
                        e.target.value
                      )
                    }
                  >

                    <option value="">
                      Select Project
                    </option>

                    {projects.map(
                      (project) => (

                        <option
                          key={
                            project.id
                          }
                          value={
                            project.id
                          }
                        >
                          {project.name}
                        </option>

                      )
                    )}

                  </select>

                </div>

              </div>

              {/* SUBMIT */}

              <button
                onClick={createTask}
                className="bg-indigo-700 hover:bg-indigo-800 text-white p-4 rounded-2xl text-lg font-medium transition mt-2 shadow-lg shadow-indigo-100"
              >
                Create Task
              </button>

            </div>

            {/* Bottom Tips */}

            <div className="mt-10 bg-slate-50 border border-slate-200 rounded-3xl p-6">

              <h2 className="text-xl font-bold text-slate-800">
                Productivity Tips
              </h2>

              <div className="mt-5 flex flex-col gap-4 text-slate-600">

                <p>
                  • Use AI suggestions
                  for better task
                  prioritization
                </p>

                <p>
                  • Break large tasks
                  into smaller manageable
                  tasks
                </p>

                <p>
                  • Set realistic
                  deadlines for improved
                  productivity
                </p>

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTask;