import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Dashboard() {

  const [tasks, setTasks] = useState([]);

  // FETCH TASKS

  const fetchTasks = async () => {

    try {

      const response = await API.get("/tasks/");

      setTasks(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // DYNAMIC COUNTS

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "COMPLETED"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "TODO"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "IN_PROGRESS"
  ).length;

  // DASHBOARD CARDS

  const cards = [
    {
      title: "Total Tasks",
      value: totalTasks,
      color:
        "bg-slate-800",
    },
    {
      title: "Completed",
      value: completedTasks,
      color:
        "bg-teal-700",
    },
    {
      title: "In Progress",
      value: inProgressTasks,
      color:
        "bg-indigo-700",
    },
    {
      title: "Pending",
      value: pendingTasks,
      color:
        "bg-rose-700",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="relative overflow-hidden p-10">

        {/* Background Blur Design */}

        <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-indigo-200 opacity-20 rounded-full blur-3xl"></div>

        <div className="absolute bottom-[-120px] left-[-100px] w-96 h-96 bg-teal-200 opacity-20 rounded-full blur-3xl"></div>

        <div className="relative z-10">

          {/* Header */}

          <div className="mb-12">

            <h1 className="text-5xl font-bold text-slate-800">
              Dashboard
            </h1>

            <p className="text-slate-500 mt-3 text-lg">
              Track projects, manage tasks and improve productivity
            </p>

          </div>

          {/* Stats Cards */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {cards.map((card, index) => (

              <div
                key={index}
                className={`relative overflow-hidden ${card.color} text-white p-8 rounded-[28px] shadow-xl`}
              >

                {/* Decorative Circle */}

                <div className="absolute top-[-40px] right-[-30px] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

                <div className="relative z-10">

                  <p className="text-sm opacity-80 tracking-wide">
                    {card.title}
                  </p>

                  <h2 className="text-6xl font-bold mt-6">
                    {card.value}
                  </h2>

                </div>

              </div>

            ))}

          </div>

          {/* App Benefits Section */}

          <div className="mt-14 relative overflow-hidden bg-white/70 backdrop-blur-xl border border-white/40 rounded-[32px] shadow-2xl p-10">

            {/* Decorative Background */}

            <div className="absolute top-[-60px] right-[-40px] w-52 h-52 bg-indigo-200 opacity-20 rounded-full blur-3xl"></div>

            <div className="absolute bottom-[-50px] left-[-40px] w-44 h-44 bg-teal-200 opacity-20 rounded-full blur-3xl"></div>

            <div className="relative z-10">

              <div className="mb-10">

                <h2 className="text-4xl font-bold text-slate-800">
                  Why Teams Use This Platform
                </h2>

                <p className="text-slate-500 mt-3">
                  AI powered workflow management for modern teams
                </p>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                {/* Card 1 */}

                <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-6">

                  <div className="w-14 h-14 bg-indigo-700 rounded-2xl flex items-center justify-center text-white text-2xl">
                    ⚡
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mt-6">
                    Faster Workflow
                  </h3>

                  <p className="text-slate-600 mt-3 leading-7">
                    Organize projects and manage team tasks efficiently in one place.
                  </p>

                </div>

                {/* Card 2 */}

                <div className="bg-teal-50 border border-teal-100 rounded-3xl p-6">

                  <div className="w-14 h-14 bg-teal-700 rounded-2xl flex items-center justify-center text-white text-2xl">
                    🤖
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mt-6">
                    AI Suggestions
                  </h3>

                  <p className="text-slate-600 mt-3 leading-7">
                    Smart AI prioritization helps teams focus on critical work first.
                  </p>

                </div>

                {/* Card 3 */}

                <div className="bg-rose-50 border border-rose-100 rounded-3xl p-6">

                  <div className="w-14 h-14 bg-rose-700 rounded-2xl flex items-center justify-center text-white text-2xl">
                    📊
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mt-6">
                    Real-Time Tracking
                  </h3>

                  <p className="text-slate-600 mt-3 leading-7">
                    Monitor pending, completed and active tasks with live analytics.
                  </p>

                </div>

                {/* Card 4 */}

                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6">

                  <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-white text-2xl">
                    👥
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mt-6">
                    Team Collaboration
                  </h3>

                  <p className="text-slate-600 mt-3 leading-7">
                    Assign tasks, update progress and collaborate seamlessly across teams.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;