import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

function ProjectDetails() {

  const { id } = useParams();

  const [project, setProject] = useState(null);

  const [tasks, setTasks] = useState([]);

  const fetchProjectDetails = async () => {

    try {

      const response = await API.get(
        `/projects/${id}`
      );

      setProject(response.data.project);
      setTasks(response.data.tasks);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchProjectDetails();

  }, []);

  if (!project) {

    return (
      <div className="min-h-screen bg-slate-100">
        <Navbar />
      </div>
    );
  }
   return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="p-10">

        {/* Header */}

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm mb-10">

          <div className="flex justify-between items-start">

            <div>

              <h1 className="text-5xl font-bold text-slate-800">
                {project.name}
              </h1>

              <p className="text-slate-500 mt-4 text-lg leading-8">
                {project.description}
              </p>
              </div>

            <div className="bg-indigo-100 text-indigo-700 px-5 py-2 rounded-2xl font-medium">
              {project.status}
            </div>

          </div>

        </div>

        {/* Tasks */}

        <div className="mb-8">

          <h2 className="text-3xl font-bold text-slate-800">
            Project Tasks
          </h2>

          <p className="text-slate-500 mt-2">
            Tasks assigned under this project
          </p>

        </div>

        {tasks.length === 0 ? (

          <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center shadow-sm">

            <h2 className="text-2xl font-bold text-slate-800">
              No Tasks Found
            </h2>

            <p className="text-slate-500 mt-3">
              Create tasks for this project
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {tasks.map((task) => {

              const deadlineDate = new Date(task.deadline);
               return (

                <div
                  key={task.id}
                  className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm hover:shadow-lg transition"
                >

                  <div className="flex justify-between items-start">

                    <h2 className="text-2xl font-bold text-slate-800">
                      {task.title}
                    </h2>

                    <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-xl text-xs font-semibold">
                      {task.priority}
                    </div>

                  </div>

                  <p className="text-slate-600 mt-5 leading-7">
                    {task.description}
                  </p>
                  <div className="mt-6 space-y-3">

                    <div className="flex justify-between">

                      <span className="text-slate-500">
                        Assigned To
                      </span>

                      <span className="font-medium text-slate-800">
                        {task.assigned_user}
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-slate-500">
                        Deadline
                      </span>

                      <span className="font-medium text-slate-800">
                        {deadlineDate.toLocaleDateString()}
                      </span>
                       </div>

                    <div className="flex justify-between">

                      <span className="text-slate-500">
                        Status
                      </span>

                      <span className="font-medium text-indigo-700">
                        {task.status}
                      </span>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
          )}

      </div>

    </div>
  );
}

export default ProjectDetails;