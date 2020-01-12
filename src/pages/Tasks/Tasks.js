import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

const Tasks = props => {
  // const { tasks } = useContext(TasksContext);
  const { tasks, fetching } = useStoreState(state => state);
  console.log("<Tasks>", tasks);

  const getTasks = useStoreActions(actions => actions.getTasks);

  useEffect(() => {
    if (tasks.length === 0) getTasks();
    // eslint-disable-next-line
  }, []);

  if (fetching) return <div>Loading tasks...</div>;

  return (
    <>
      {tasks.map(task => (
        <div key={task._id}>
          <div>Task: {task.title}</div>
          <div>Column: {task.column}</div>
        </div>
      ))}
    </>
  );
};

export default Tasks;
