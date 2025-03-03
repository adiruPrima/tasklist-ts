import { Plus } from "lucide-react";
import { useState } from "react";

type InputProps = {
  onAdd: (formData: FormData) => void;
};

function AddTaskInput({ onAdd }: InputProps) {
  const [priorityValue, setPriorityValue] = useState(1);
  const [task, setTask] = useState("");

  function handlePriorityChange() {
    setPriorityValue((prev) => (prev > 3 ? 1 : prev + 1));
  }

  function handleTaskChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTask(e.target.value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // manually create a formData object and append priority and task
    const formData = new FormData();
    formData.append("task", task);
    formData.append("priority", priorityValue.toString());

    setTask(""); // clear out input

    // call the parent 'onAdd' handler with the formData
    onAdd(formData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-4 mx-auto mb-8 justify-center max-w-[35rem]"
    >
      <button
        type="button"
        name="priority"
        value={priorityValue}
        onClick={handlePriorityChange}
        className={`${
          priorityValue === 1
            ? "bg-green-500/50 border-green-500"
            : priorityValue === 2
            ? "bg-yellow-500/50 border-yellow-500"
            : priorityValue === 3
            ? "bg-orange-500/50 border-orange-500"
            : priorityValue === 4
            ? "bg-red-500/50 border-red-500"
            : ""
        } uppercase font-bold w-40 border-4 rounded-2xl cursor-pointer`}
      >
        {priorityValue === 1
          ? "low"
          : priorityValue === 2
          ? "medium"
          : priorityValue === 3
          ? "high"
          : priorityValue === 4
          ? "urgent"
          : ""}
      </button>
      <input
        type="text"
        name="task"
        id="task"
        value={task}
        onChange={handleTaskChange}
        className="bg-white dark:bg-slate-800 text-lg py-2 px-4 w-full"
      />
      <button type="submit" className="bg-blue-500 px-4 cursor-pointer">
        <Plus />
      </button>
    </form>
  );
}

export default AddTaskInput;
