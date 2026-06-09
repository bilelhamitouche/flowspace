import Task from "./task";

export default function List() {
  return (
    <div className="flex flex-col gap-2">
      <h2>To-Do</h2>
      <ul className="flex flex-col gap-1 p-4 border">
        <Task />
      </ul>
    </div>
  );
}
