function TaskCard({
  task,
  updateTaskStatus,
}) {

  const priorityColors = {

    HIGH:
      "bg-rose-100 text-rose-700 border border-rose-200",

    MEDIUM:
      "bg-indigo-100 text-indigo-700 border border-indigo-200",

    LOW:
      "bg-teal-100 text-teal-700 border border-teal-200",
  };

  const statusColors = {

    TODO:
      "text-slate-500",

    IN_PROGRESS:
      "text-indigo-700",

    COMPLETED:
      "text-teal-700",
  };

  // DEADLINE LOGIC

  const deadlineDate =
    new Date(task.deadline);

  const currentDate =
    new Date();

  const isOverdue =
    deadlineDate < currentDate &&
    task.status !== "COMPLETED";

  const isDueToday =
    deadlineDate.toDateString() ===
    currentDate.toDateString();

  return (

    <div className={`

      relative overflow-hidden
      bg-white
      p-7
      rounded-3xl
      border
      shadow-sm
      hover:shadow-xl
      hover:-translate-y-1
      transition duration-300

      ${
        isOverdue
          ? "border-rose-300"
          : "border-slate-200"
      }

    `}>

      {/* Background Blur */}

      <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-indigo-100 rounded-full blur-2xl opacity-50"></div>

      <div className="relative z-10">

        {/* Top Section */}

        <div className="flex justify-between items-start">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              {task.title}
            </h2>

            <p className="text-slate-500 text-sm mt-2">
              {task.project_name}
            </p>

            <p className="text-slate-500 text-sm mt-1">
              Assigned to:
              {" "}
              {task.assigned_user}
            </p>

          </div>

          <span
            className={`${priorityColors[task.priority]} px-4 py-1 rounded-full text-xs font-semibold`}
          >
            {task.priority}
          </span>

        </div>

        {/* Description */}

        <p className="text-slate-600 mt-6 leading-7">
          {task.description}
        </p>

        {/* Deadline */}

        <div className="mt-6">

          <div className={`

            inline-flex items-center gap-2
            px-4 py-2 rounded-2xl text-sm font-medium

            ${
              isOverdue
                ? "bg-rose-100 text-rose-700"
                : isDueToday
                ? "bg-yellow-100 text-yellow-700"
                : "bg-slate-100 text-slate-700"
            }

          `}>

            <span>
              📅
            </span>

            <span>

              {isOverdue
                ? "Overdue"
                : isDueToday
                ? "Due Today"
                : "Deadline"}

              :
              {" "}

              {deadlineDate.toLocaleDateString()}

            </span>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-8 flex justify-between items-center">

          <div>

            <p className="text-xs text-slate-400 uppercase tracking-wide">
              Status
            </p>

            <p
              className={`font-semibold mt-1 ${statusColors[task.status]}`}
            >
              {task.status}
            </p>

          </div>

          {/* Status Update */}

          <select
            value={task.status}
            onChange={(e) =>
              updateTaskStatus(
                task.id,
                e.target.value
              )
            }
            className="border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
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

    </div>

  );
}

export default TaskCard;