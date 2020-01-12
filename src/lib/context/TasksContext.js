import React, { createContext, useState } from "react";

export const TasksContext = createContext();

const TasksContextProvider = props => {
  const [tasks, setTasks] = useState([
    {
      title: "Taksuš",
      column: "Upcoming",
      notes: ["5de856cd743fd53237cf905d"],
      links: ["5de805ee4585ca441180896d"],
      subtasks: [],
      tags: [],
      done: false,
      _id: "5de087f5f6be4e686a66666",
      project: "5de06639dcaabc585f230340",
      description: "",
      pl: "",
      kanboard: "",
      nas: "",
      dueDate: 1575072000000,
      date: 1574995957856,
      owner: "5dc660807f59df39a1461e07",
      __v: 6
    },
    {
      title: "Taksušinjo",
      column: "In Progress",
      notes: ["5de856cd743fd53237cf905d"],
      links: ["5de805ee4585ca441180896d"],
      subtasks: [],
      tags: [],
      done: false,
      _id: "5de087f5f6be4e686a977777",
      project: "5de06639dcaabc585f230341",
      description: "",
      pl: "",
      kanboard: "",
      nas: "",
      dueDate: 1575072000000,
      date: 1574995957856,
      owner: "5dc660807f59df39a1461e07",
      __v: 6
    }
  ]);

  return (
    <TasksContext.Provider value={{ tasks }}>
      {props.children}
    </TasksContext.Provider>
  );
};

export default TasksContextProvider;
