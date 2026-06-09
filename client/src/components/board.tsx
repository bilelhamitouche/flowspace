import type { Project } from "@/types/project";

export default function Board({ project }: { project: Project }) {
  return (
    <div className="p-4 w-full h-full">
      <h3 className="text-xl font-medium">{project.name}</h3>
    </div>
  );
}
