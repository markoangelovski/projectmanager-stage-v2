import React, { useEffect /* , useState */ } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
// import { FaFile } from "react-icons/fa";

import { TasksWrapper /* , TaskMenu, TaskMenuItem */ } from "./Tasks.styles";

// import NewTask from "../../components/NewTask/NewTask";
import TaskListItem from "../../components/TaskListItem/TaskListItem";

const Tasks = ({ taskId }) => {
  // const [newTask, setNewTask] = useState(false);

  const { projects, tasks, fetching } = useStoreState(state => state);
  console.log("<Tasks>", tasks);

  const getProjects = useStoreActions(actions => actions.getProjects);

  useEffect(() => {
    if (projects.length === 0) getProjects();
    // eslint-disable-next-line
  }, []);

  if (fetching) return <div>Loading tasks...</div>;

  return (
    <TasksWrapper>
      {/* <TaskMenu>
        <TaskMenuItem>
          <FaFile onClick={() => setNewTask(true)} />
        </TaskMenuItem>
        {newTask && <NewTask setNewTask={setNewTask} />}
      </TaskMenu> */}
      {tasks.map(task => (
        <TaskListItem key={task._id} taskId={task._id} />
      ))}
    </TasksWrapper>
  );
};

export default Tasks;
