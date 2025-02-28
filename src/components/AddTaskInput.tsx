import { Plus } from "lucide-react";

type InputProps = {
  onAdd: (formData: FormData) => void;
};

function AddTaskInput({ onAdd }: InputProps) {
  return (
    <form
      action={onAdd}
      className="flex gap-4 mx-auto mb-8 justify-center max-w-[35rem]"
    >
      <input
        type="text"
        name="task"
        id="task"
        className="bg-white dark:bg-slate-800 text-lg py-2 px-4 w-full"
      />
      <button className="bg-blue-500 px-4 cursor-pointer">
        <Plus />
      </button>
    </form>
  );
}

export default AddTaskInput;
