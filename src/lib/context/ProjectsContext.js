import React, { createContext, useState } from "react";

export const ProjectsContext = createContext();

const ProjectsContextProvider = props => {
  const [projectsCount, setProjectsCount] = useState(2);
  const [projects, setProjects] = useState([
    {
      title: "Projekat",
      tasks: [
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
        }
      ],
      done: false,
      _id: "5de06639dcaabc585f230340",
      description: "",
      pl: "",
      kanboard: "",
      dev: "",
      stage: "",
      prod: "",
      live: "",
      nas: "",
      date: 1574987321059,
      owner: {
        _id: "5dc660807f59df39a1461e07",
        avatar_url:
          "https://images.unsplash.com/photo-1481608790904-6b47c88e5b00?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=150&h=150&fit=crop&ixid=eyJhcHBfaWQiOjF9"
      },
      __v: 47
    },
    {
      title: "Skroz Novi Projekat",
      tasks: [
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
      ],
      done: false,
      _id: "5de06639dcaabc585f230341",
      description: "",
      pl: "",
      kanboard: "",
      dev: "",
      stage: "",
      prod: "",
      live: "",
      nas: "",
      date: 1574987351059,
      owner: {
        _id: "5dc660807f59df39a1461e07",
        avatar_url:
          "https://images.unsplash.com/photo-1481608790904-6b47c88e5b00?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=150&h=150&fit=crop&ixid=eyJhcHBfaWQiOjF9"
      },
      __v: 47
    }
  ]);

  return (
    <ProjectsContext.Provider
      value={{
        projectsCount,
        projects
      }}
    >
      {props.children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsContextProvider;
