import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

import { TaskPickerForm, TaskPickerSelect } from "./TaskPicker.styles";

const TaskPicker = () => {
  const { tasks, fetching, overlay } = useStoreState(state => state);
  const { getTasks, setSelectedTask } = useStoreActions(actions => actions);

  const fetchTasks = () => {
    if (tasks.length === 0) getTasks();
  };

  useEffect(() => {
    setSelectedTask("");
    // eslint-disable-next-line
  }, [overlay]);

  return (
    <TaskPickerForm>
      <TaskPickerSelect
        onClick={e => fetchTasks()}
        onInput={e => setSelectedTask(e.target.value)}
        name="tasks"
        id="task-select"
      >
        <option value="">Select a task:</option>
        {fetching && <option value="">Loading...</option>}
        {tasks.map(task => {
          return (
            <option key={task._id} value={task._id}>
              {task.title}
            </option>
          );
        })}
      </TaskPickerSelect>
    </TaskPickerForm>
  );
};

export default TaskPicker;
