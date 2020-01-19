import React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

const TaskPicker = () => {
  const { tasks, fetching } = useStoreState(state => state);
  const { getTasks, setSelectedTask } = useStoreActions(actions => actions);

  const fetchTasks = () => {
    if (tasks.length === 0) getTasks();
  };

  return (
    <form>
      <label htmlFor="task-select">Choose a task:</label>

      <select
        onClick={e => fetchTasks()}
        onInput={e => setSelectedTask(e.target.value)}
        name="tasks"
        id="task-select"
      >
        <option value="">--Please choose an option--</option>
        {fetching && <option value="">Loading...</option>}
        {tasks.map(task => {
          return (
            <option key={task._id} value={task._id}>
              {task.title}
            </option>
          );
        })}
      </select>
    </form>
  );
};

export default TaskPicker;
