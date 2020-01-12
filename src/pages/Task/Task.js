import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

const Task = props => {
  const { tasks, fetching } = useStoreState(state => state);

  const getTasks = useStoreActions(actions => actions.getTasks);

  const selectedTask = tasks.find(
    task => props.match.params.taskId === task._id
  );

  console.log("<Task>", selectedTask);

  useEffect(() => {
    if (tasks.length === 0) getTasks();
    // eslint-disable-next-line
  }, []);

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
