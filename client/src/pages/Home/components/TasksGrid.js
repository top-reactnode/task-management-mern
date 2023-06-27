import { Link } from "react-router-dom";
import dateFormatter from "../../../components/utils/dateFormatter";

const TaskGrid = ({ tasks, loading }) => {
  return (
    <div className="flex flex-wrap items-stretch gap-4 my-5">
      {loading ? (
        <div className="my-5 text-dark-2">Loading...</div>
      ) : (
        <>
          {tasks.map((task) => (
            <Link
              className="task card"
              to={`/tasks/${task._id}`}
              key={task._id}
            >
              <div className="card-body">
                <h3 className="card-title mb-2">{task.title}</h3>
                <p className="card-text">{task.description}</p>
              </div>
              <div className="card-footer flex gap-2">
                <span className="small-tab">
                  {task.status ? "Completed" : "Pending"} task
                </span>
                <span className="small-tab">
                  Deadline {dateFormatter(task.deadline)}
                </span>
              </div>
            </Link>
          ))}
          {tasks.length === 0 && (
            <div className="my-5 text-dark-2">
              No tasks found. Kindly create a new task using the button above.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TaskGrid;
