import { Check, Pencil, Trash2 } from "lucide-react";
import { Task } from "../types/task";
import { useEffect, useRef, useState } from "react";

type TaskCardProp = Task & {
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
  editMode: boolean;
  editId: number;
  toggleMark: (id: number) => void;
};

function TaskCard({
  id,
  title,
  isMarked,
  onDelete,
  onEdit,
  editMode,
  editId,
  toggleMark,
}: TaskCardProp) {
  const [newTitle, setNewTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTitle(e.target.value);
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      onEdit(id, newTitle);
    }
  }

  return (
    <li
      className={`${
        isMarked
          ? "bg-lime-500/50 line-through"
          : "bg-zinc-400/50 dark:bg-zinc-600/50"
      } flex justify-between items-center gap-3 py-3 px-3 sm:px-5 w-full max-w-[35rem]`}
    >
      {editMode && editId === id && !isMarked ? (
        <input
          ref={inputRef}
          type="text"
          name="newTask"
          id="newTask"
          value={newTitle}
          onChange={handleChange}
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

      <div className="flex gap-2 sm:gap-3">
        <button
          onClick={() => onEdit(id, newTitle)}
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
