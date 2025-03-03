import { useState } from "react";
import AddTaskInput from "../components/AddTaskInput";
import TaskCard from "../components/TaskCard";
// import { usePersistedState } from "../hooks/usePersistedState";
import { Task } from "../types/task";

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [editMode, setEditMode] = useState(false);
  const [taskIdToEdit, setTaskIdToEdit] = useState(0);

  function addTask(formData: FormData) {
    const task = formData.get("task");
    const priority = Number(formData.get("priority"));
    if (task) {
      setTasks((prev) => [
        ...prev,
        {
          id: Date.now(),
          title: `${task}`,
          priority: priority,
          isMarked: false,
        },
      ]);
    } else {
      return;
    }
  }

  function deleteTask(id: number) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function deleteAll() {
    setTasks([]);
  }

  function editTask(id: number, title: string, priority: number) {
    if (editMode) {
      setEditMode(false);
      setTaskIdToEdit(0);
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? { ...task, title: title, priority: priority }
            : { ...task }
        )
      );
    } else {
      setEditMode(true);
      setTaskIdToEdit(id);
    }
    return;
  }

  function toggleMark(id: number) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isMarked: !task.isMarked } : { ...task }
      )
    );
  }

  function isAllMarked(): boolean {
    const unmarked = tasks.find((task) => !task.isMarked);
    // if unmarked task found, isAllMarked = false
    return unmarked ? false : true;
  }

  function markAllToggle() {
    // unmark all
    if (isAllMarked()) {
      setTasks((prev) => prev.map((task) => ({ ...task, isMarked: false })));
    }
    // mark all
    else {
      setTasks((prev) => prev.map((task) => ({ ...task, isMarked: true })));
    }
  }

  console.log(tasks);
  return (
    <div className="p-4">
      <AddTaskInput onAdd={addTask} />
      <ul className="flex flex-col gap-8 items-center">
        {tasks.map((task) => (
          <TaskCard
            id={task.id}
            key={task.id}
            title={task.title}
            priority={task.priority}
            isMarked={task.isMarked}
            toggleMark={toggleMark}
            onDelete={deleteTask}
            editMode={editMode}
            editId={taskIdToEdit}
            onEdit={editTask}
          />
        ))}
      </ul>
      {tasks.length > 0 && (
        <div className="mx-auto mt-8 flex justify-between items-center max-w-[35rem]">
          <button
            onClick={markAllToggle}
            className={`${
              isAllMarked()
                ? "text-yellow-700 dark:text-yellow-500"
                : "text-green-700 dark:text-green-500"
            } text-xl cursor-pointer`}
          >
            {isAllMarked() ? "Unmark All" : "Mark All"}
          </button>
          <button
            onClick={deleteAll}
            className="text-red-800 dark:text-red-500 text-xl cursor-pointer"
          >
            Delete All
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskList;
