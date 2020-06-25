import React, { useState, useEffect, useRef } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

import {
  SearchTaskForm,
  SearchTaskTitle,
  SearchTaskOption
} from "./SearchTask.styles";

const SearchTask = () => {
  const [keyword, setKeyword] = useState("");
  const [selectedTaskTitle, setSelectedTaskTitle] = useState("");

  const { overlay, tasks } = useStoreState(state => state);
  const { setSelectedTask } = useStoreActions(actions => actions);

  // Task search results placeholder ref
  const taskRef = useRef();

  useEffect(() => {
    setSelectedTask("");
    // eslint-disable-next-line
  }, [overlay]);

  const regex = new RegExp(keyword, "i");

  // Iterate over the tasks array and and check each of the values against the keyword
  let result = [];
  if (keyword.length > 2) {
    tasks.forEach((task, i) => {
      let obj = {};

      for (const key in task) {
        if (task.hasOwnProperty(key)) {
          if (regex.test(task[key])) {
            obj._id = task._id;
            obj.title = task.title;
            obj[key] = task[key];
          }
        }
      }
      Object.keys(obj).length && result.push(obj);
    });
  }

  return (
    <SearchTaskForm>
      <SearchTaskTitle
        value={selectedTaskTitle}
        placeholder="Search task"
        type="text"
        onChange={e => {
          setKeyword(e.target.value);
          // Needed to update value when task is selected
          setSelectedTaskTitle(e.target.value);
          taskRef.current.style.display = "inherit";
        }}
      />
      <span ref={taskRef}>
        {result.map((res, i) => (
          <SearchTaskOption
            key={i}
            onClick={() => {
              setSelectedTask(res._id);
              setSelectedTaskTitle(res.title);
              taskRef.current.style.display = "none";
            }}
          >
            {res.title}
          </SearchTaskOption>
        ))}
      </span>
    </SearchTaskForm>
  );
};

export default SearchTask;
