import React from "react";
import { useStoreState } from "easy-peasy";

const Task = props => {
  const { tasks, fetching } = useStoreState(state => state);

  const selectedTask = tasks.find(
    task => props.match.params.taskId === task._id
  );

  console.log("<Task>", selectedTask);

  if (fetching) return <div>Loading task...</div>;

  return (
    <>
      {selectedTask ? (
        <>
          <div>Task title: {selectedTask.title}</div>
          <pre>{JSON.stringify(selectedTask, null, 2)}</pre>{" "}
        </>
      ) : (
        <div>Task not found.</div>
      )}
    </>
  );
};

export default Task;
