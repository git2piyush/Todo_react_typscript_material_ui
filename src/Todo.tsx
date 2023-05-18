import React, { ChangeEvent, FC, useState } from "react";
import { TextField, Button } from "@material-ui/core";
interface TodoObject {
  id: number;
  name: string;
  is_editing: boolean;
  is_done: boolean;
}

const Todo: FC = () => {
  const [taskArray, setTaskArray] = useState<TodoObject[]>([]);
  const [task, setTask] = useState("");
  const [editTask, setEditTask] = useState("");

  const onChangeTask = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const addTask = () => {
    const newTask: TodoObject = {
      id: taskArray.length === 0 ? 1 : taskArray[taskArray.length - 1].id + 1,
      name: task,
      is_done: false,
      is_editing: false
    };
    setTaskArray([...taskArray, newTask]);
    setTask("");
  };
  const edit = (object: TodoObject) => {
    const updateEditTask = taskArray.map((task) => {
      if (task.id === object.id) {
        return {
          ...task,
          is_editing: !task.is_editing
        };
      } else {
        return {
          ...task,
          is_editing: false
        };
      }
    });
    setTaskArray(updateEditTask);
    setEditTask(object.name);
  };
  const editTaskValue = (task: string) => {
    setEditTask(task);
  };
  const saveTask = (object: TodoObject) => {
    const updateEditTask = taskArray.map((task) => {
      if (task.id === object.id) {
        return {
          ...task,
          name: editTask
        };
      }
      return task
     
    });
    setTaskArray(updateEditTask);
    setEditTask("");
    edit(object);
  };
  const deleteTask = (object: TodoObject) => {
    const updateTaskArray = taskArray.filter((task) => task.id !== object.id);
    setTaskArray(updateTaskArray);
  };

  const markasTaskDone = (object: TodoObject) => {
    const updateTaskArray = taskArray.map((task) => {
      if (task.id === object.id) {
        return {
          ...task,
          is_done: true
        };
      }
      return task
    });

    setTaskArray(updateTaskArray);
  };

  return (
    <div>
      <div>
        <h2>ToDo List</h2>
      </div>

      <div>
        <TextField
          id="standard-basic"
          autoComplete="off"
          value={task}
          onChange={onChangeTask}
          placeholder="Add TO DO"
        />
        <Button
          className="button_style"
          variant="contained"
          color="primary"
          size="small"
          disabled={task === ""}
          onClick={addTask}
        >
          Add
        </Button>
      </div>

      {taskArray.length > 0 && (
        <div>
          <table className="centerTable" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Task</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {taskArray.map((object) => (
                <tr key={object.id}>
                  <td>
                    {object.is_editing ? (
                      <TextField
                        id="standard-basic"
                        value={editTask}
                        onChange={(e) => editTaskValue(e.target.value)}
                      />
                    ) : object.is_done ? (
                      <s>{object.name}</s>
                    ) : (
                      <span>{object.name}</span>
                    )}
                  </td>
                  <td>
                    {object.is_editing ? (
                      <div>
                        <Button
                          className="button_style"
                          variant="outlined"
                          color="primary"
                          size="small"
                          disabled={editTask === ""}
                          onClick={() => saveTask(object)}
                        >
                          Save
                        </Button>
                        <Button
                          className="button_style"
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={() => edit(object)}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Button
                          className="button_style"
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={() => edit(object)}
                        >
                          Edit
                        </Button>
                        <Button
                          className="button_style"
                          variant="outlined"
                          color="secondary"
                          size="small"
                          disabled={object.is_done}
                          onClick={() => markasTaskDone(object)}
                        >
                          Done
                        </Button>
                        <Button
                          className="button_style"
                          variant="outlined"
                          size="small"
                          onClick={() => deleteTask(object)}
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {taskArray.length === 0 && <h2>Nothing to do!</h2>}
    </div>
  );
};

export default Todo;
