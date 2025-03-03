import { Check, Pencil, Trash2 } from "lucide-react";
import { Task } from "../types/task";
import { useEffect, useRef, useState } from "react";

type TaskCardProp = Task & {
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string, newPriority: number) => void;
  editMode: boolean;
  editId: number;
  toggleMark: (id: number) => void;
};

function TaskCard({
  id,
  title,
  priority,
  isMarked,
  onDelete,
  onEdit,
  editMode,
  editId,
  toggleMark,
}: TaskCardProp) {
  const [newTitle, setNewTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [newPriority, setNewPriority] = useState(priority);

  useEffect(() => {
    inputRef.current?.focus();
  });

  function handleTaskChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTitle(e.target.value);
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      onEdit(id, newTitle, newPriority);
    }
  }

  function handlePriorityChange() {
    setNewPriority(newPriority > 3 ? 1 : newPriority + 1);
  }

  function priorityBgColor(priority: number) {
    let classes = "";
    switch (priority) {
      case 1:
        classes = "bg-green-500/50 border-green-500";
        break;
      case 2:
        classes = "bg-yellow-500/50 border-yellow-500";
        break;
      case 3:
        classes = "bg-orange-500/50 border-orange-500";
        break;
      case 4:
        classes = "bg-red-500/50 border-red-500";
        break;
      default:
        classes = "";
        break;
    }
    return classes;
  }

  function priorityInnerText(priority: number) {
    let priorityLevel = "";
    switch (priority) {
      case 1:
        priorityLevel = "low";
        break;
      case 2:
        priorityLevel = "medium";
        break;
      case 3:
        priorityLevel = "high";
        break;
      case 4:
        priorityLevel = "urgent";
        break;
      default:
        priorityLevel = "";
        break;
    }
    return priorityLevel;
  }

  return (
    <li
      className={`${
        isMarked ? "bg-lime-500/50" : "bg-zinc-400/50 dark:bg-zinc-600/50"
      } flex justify-between items-center gap-3 py-3 px-3 sm:px-5 w-full max-w-[35rem]`}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Priority */}
        {editMode && editId === id && !isMarked ? (
          <button
            onClick={handlePriorityChange}
            className={`${priorityBgColor(
              newPriority
            )} flex justify-center text-sm font-medium w-16 sm:min-w-18 py-1 rounded-full uppercase`}
          >
            {priorityInnerText(newPriority)}
          </button>
        ) : (
          <div
            className={`${priorityBgColor(
              priority
            )} flex justify-center text-sm font-medium w-16 sm:min-w-18 py-1 rounded-full uppercase`}
          >
            {priorityInnerText(priority)}
          </div>
        )}

        {/* Task value */}
        {editMode && editId === id && !isMarked ? (
          <input
            ref={inputRef}
            type="text"
            name="newTask"
            id="newTask"
            value={newTitle}
            onChange={handleTaskChange}
            onKeyDown={handleKeyPress}
            className="bg-gray-500/30 text-xl px-2 w-full"
          />
        ) : (
          <span
            onClick={() => toggleMark(id)}
            className={`${
              isMarked ? "line-through" : ""
            } text-xl font-light tracking-wide cursor-pointer`}
          >
            {title}
          </span>
        )}
      </div>

      <div className="flex gap-2 sm:gap-3">
        <button
          onClick={() => onEdit(id, newTitle, newPriority)}
          className="bg-yellow-500 p-1 rounded-lg border cursor-pointer"
        >
          {editMode && editId === id && !isMarked ? <Check /> : <Pencil />}
        </button>
        <button
          onClick={() => onDelete(id)}
          className="bg-red-500 p-1 rounded-lg border cursor-pointer"
        >
          <Trash2 />
        </button>
      </div>
    </li>
  );
}

export default TaskCard;
