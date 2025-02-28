import { useState } from "react";
import AddTaskInput from "../components/AddTaskInput";
import TaskCard from "../components/TaskCard";
// import { usePersistedState } from "../hooks/usePersistedState";
import { Task } from "../types/task";

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "water plants", isMarked: true },
    { id: 2, title: "cook breakfast", isMarked: false },
  ]);

  const [editMode, setEditMode] = useState(false);
  const [taskIdToEdit, setTaskIdToEdit] = useState(0);

  function addTask(formData: FormData) {
    const task = formData.get("task");
    if (task) {
      setTasks((prev) => [
        ...prev,
        { id: Date.now(), title: `${task}`, isMarked: false },
      ]);
    } else {
      return;
    }
  }

  function deleteTask(id: number) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function editTask(id: number, title: string) {
    if (editMode) {
      setEditMode(false);
      setTaskIdToEdit(0);
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, title: title } : { ...task }
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
            isMarked={task.isMarked}
            toggleMark={toggleMark}
            onDelete={deleteTask}
            editMode={editMode}
            editId={taskIdToEdit}
            onEdit={editTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
