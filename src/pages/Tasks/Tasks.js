import React from "react";
import { useStoreState } from "easy-peasy";

const Tasks = props => {
  const { tasks, fetching } = useStoreState(state => state);
  console.log("<Tasks>", tasks);

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
