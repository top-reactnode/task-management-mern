import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../components/utils/api";
import dateFormatter from "../../components/utils/dateFormatter";

const Task = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchTask = async () => {
    try {
      const { data } = await api.get(`api/task/${id}`);
      setTask(data);
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    try {
      const confim = window.confirm("Are you sure you want to delete this task?");
      if (!confim) return;
      await api.delete(`api/tasks/${id}`);
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8">{error}</div>;

  return (
    <div className="p-8">
      <div className="card task-main">
        <div className="card-body flex justify-between items-start">
          <div>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
            <p>Created on: {dateFormatter(task.created_on)}</p>
            <p>Deadline: {dateFormatter(task.deadline)}</p>
            <p>Status: {task.status ? "Completed" : "Pending"}</p>
          </div>
          <div className="flex gap-2">
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate(`/tasks/${id}/edit`);
              }}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
