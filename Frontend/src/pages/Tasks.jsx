import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import API from "../services/api";

function Tasks() {

  const [tasks, setTasks] = useState([]);
    const [aiSummary, setAiSummary] =
  useState("");

const [loadingSummary, setLoadingSummary] =
  useState(false);
  // SEARCH & FILTER STATES

  const [search, setSearch] = useState("");

  const [priorityFilter, setPriorityFilter] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("");

  // FETCH TASKS

  const fetchTasks = async () => {

    try {

      const response =
        await API.get("/tasks/");

      setTasks(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  // UPDATE TASK STATUS

  const updateTaskStatus = async (
    taskId,
    status
  ) => {

    try {

      await API.put(
        `/tasks/${taskId}/status?status=${status}`
      );

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchTasks();

  }, []);

  // FILTERED TASKS

  const filteredTasks =
    tasks.filter((task) => {

      const matchesSearch =
        task.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesPriority =
        priorityFilter === "" ||
        task.priority ===
          priorityFilter;

      const matchesStatus =
        statusFilter === "" ||
        task.status ===
          statusFilter;

      return (
        matchesSearch &&
        matchesPriority &&
        matchesStatus
      );
    });

  // TASK COUNTS

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "COMPLETED"
    ).length;

  const pendingTasks =
    tasks.filter(
      (task) =>
        task.status !==
        "COMPLETED"
    ).length;

  const inProgressTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "IN_PROGRESS"
    ).length;

    const generateAISummary =
  async () => {

    try {

      setLoadingSummary(true);

      const response =
        await API.post(
          "/ai/summary",
          {
            tasks,
          }
        );

      setAiSummary(
        response.data.summary
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoadingSummary(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="relative overflow-hidden p-10">

        {/* Background Design */}

        <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-indigo-200 opacity-20 rounded-full blur-3xl"></div>

        <div className="absolute bottom-[-120px] left-[-120px] w-96 h-96 bg-teal-200 opacity-20 rounded-full blur-3xl"></div>

        <div className="relative z-10">

          {/* Header */}

          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-10">

            <div>

              <h1 className="text-4xl font-bold text-slate-800">
                Tasks
              </h1>

              <p className="text-slate-500 mt-3">
                Track, manage and organize your team workflow
              </p>

            </div>

            <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl px-8 py-5 shadow-xl">

              <p className="text-sm text-slate-500">
                Total Tasks
              </p>

              <h2 className="text-4xl font-bold text-indigo-700 mt-2">
                {tasks.length}
              </h2>

            </div>

          </div>

          {/* Overview Cards */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

            {/* Total */}

            <div className="relative overflow-hidden bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-7 shadow-xl">

              <div className="absolute top-[-40px] right-[-30px] w-28 h-28 bg-indigo-100 rounded-full blur-2xl opacity-70"></div>

              <div className="relative z-10">

                <p className="text-sm text-slate-500">
                  Total Tasks
                </p>

                <h2 className="text-5xl font-bold text-slate-800 mt-5">
                  {tasks.length}
                </h2>

              </div>

            </div>

            {/* Completed */}

            <div className="relative overflow-hidden bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-7 shadow-xl">

              <div className="absolute top-[-40px] right-[-30px] w-28 h-28 bg-teal-100 rounded-full blur-2xl opacity-70"></div>

              <div className="relative z-10">

                <p className="text-sm text-slate-500">
                  Completed
                </p>

                <h2 className="text-5xl font-bold text-teal-700 mt-5">
                  {completedTasks}
                </h2>

              </div>

            </div>

            {/* In Progress */}

            <div className="relative overflow-hidden bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-7 shadow-xl">

              <div className="absolute top-[-40px] right-[-30px] w-28 h-28 bg-indigo-100 rounded-full blur-2xl opacity-70"></div>

              <div className="relative z-10">

                <p className="text-sm text-slate-500">
                  In Progress
                </p>

                <h2 className="text-5xl font-bold text-indigo-700 mt-5">
                  {inProgressTasks}
                </h2>

              </div>

            </div>

            {/* Pending */}

            <div className="relative overflow-hidden bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-7 shadow-xl">

              <div className="absolute top-[-40px] right-[-30px] w-28 h-28 bg-rose-100 rounded-full blur-2xl opacity-70"></div>

              <div className="relative z-10">

                <p className="text-sm text-slate-500">
                  Pending
                </p>

                <h2 className="text-5xl font-bold text-rose-700 mt-5">
                  {pendingTasks}
                </h2>

              </div>

            </div>

          </div>

          {/* Search & Filters */}

          <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[28px] shadow-xl p-6 mb-10">

            <div className="flex flex-col lg:flex-row gap-5">

              {/* Search */}

              <div className="flex-1">

                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  className="w-full border border-slate-300 bg-white/70 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none px-5 py-4 rounded-2xl transition"
                />

              </div>

              {/* Priority Filter */}

              <div className="w-full lg:w-56">

                <select
                  value={priorityFilter}
                  onChange={(e) =>
                    setPriorityFilter(
                      e.target.value
                    )
                  }
                  className="w-full border border-slate-300 bg-white/70 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none px-5 py-4 rounded-2xl transition"
                >

                  <option value="">
                    All Priorities
                  </option>

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

              {/* Status Filter */}

              <div className="w-full lg:w-56">

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value
                    )
                  }
                  className="w-full border border-slate-300 bg-white/70 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none px-5 py-4 rounded-2xl transition"
                >

                  <option value="">
                    All Status
                  </option>

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

          </div>

          {/* Empty State */}

          {filteredTasks.length === 0 ? (

            <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-14 shadow-xl text-center">

              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">

                <div className="w-8 h-8 bg-indigo-700 rounded-lg"></div>

              </div>

              <h2 className="text-2xl font-bold text-slate-800">
                No Tasks Found
              </h2>

              <p className="text-slate-500 mt-3">
                Try changing search or filters
              </p>

            </div>

          ) : (

            <>
              {/* Tasks Grid */}

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {filteredTasks.map(
                  (task) => (

                    <TaskCard
                      key={task.id}
                      task={task}
                      updateTaskStatus={
                        updateTaskStatus
                      }
                    />

                  )
                )}

              </div>

              {/* Bottom Insights */}

              <div className="mt-10 bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-xl">

                <h2 className="text-2xl font-bold text-slate-800">
                  Task Insights
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

                  <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">

                    <p className="text-indigo-700 text-sm font-medium">
                      Productivity
                    </p>

                    <h3 className="text-3xl font-bold text-slate-800 mt-3">
                      {tasks.length > 0
                        ? Math.round(
                            (
                              completedTasks /
                              tasks.length
                            ) * 100
                          )
                        : 0}%
                    </h3>

                  </div>

                  <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5">

                    <p className="text-teal-700 text-sm font-medium">
                      Active Tasks
                    </p>

                    <h3 className="text-3xl font-bold text-slate-800 mt-3">
                      {
                        inProgressTasks
                      }
                    </h3>

                  </div>

                  <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5">

                    <p className="text-rose-700 text-sm font-medium">
                      Pending Work
                    </p>

                    <h3 className="text-3xl font-bold text-slate-800 mt-3">
                      {pendingTasks}
                    </h3>

                  </div>

                </div>

              </div>

            </>

          )}

        </div>
      </div>
    </div>
  );
}

export default Tasks;