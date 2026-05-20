import {
  Activity,
  BookAlert,
  KanbanSquare,
  ListTodo,
  Tablet,
  Users,
  Workflow,
} from "lucide-react";
import Feature from "./feature";

export default function Features() {
  return (
    <section
      id="features"
      className="container flex flex-col gap-6 items-center p-8 py-20 mx-auto max-w-7xl"
    >
      <div className="flex flex-col gap-2 items-center max-w-2xl">
        <p className="text-lg font-medium uppercase text-primary">
          Our Features
        </p>
        <h2 className="text-2xl font-semibold text-center md:text-3xl">
          Project management without the chaos
        </h2>
        <p className="text-base font-medium text-center md:text-lg text-foreground/60">
          Everything your team needs to organize projects, collaborate
          efficiently, and stay productive.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Feature
          title="Flexible Kanban Boards"
          description="Organize tasks with customizable boards, lists, and workflows tailored to your team."
          icon={<KanbanSquare size={40} />}
        />
        <Feature
          title="Real-Time Collaboration"
          description="Work together with your team through task assignments, comments, and live updates."
          icon={<Users size={40} />}
        />
        <Feature
          title="Powerful Task Tracking"
          description="Track progress, priorities, due dates, and responsibilities in one organized workspace."
          icon={<ListTodo size={40} />}
        />
        <Feature
          title="Accessible Anywhere"
          description="Manage projects seamlessly across desktop and mobile devices with a responsive interface."
          icon={<Tablet size={40} />}
        />
        <Feature
          title="Team Workspaces"
          description="Separate projects into dedicated workspaces built for teams, clients, or departments."
          icon={<Workflow size={40} />}
        />
        <Feature
          title="Activity Tracking"
          description="Stay informed with updates, task activity, and project changes across your workspace."
          icon={<BookAlert size={40} />}
        />
      </div>
    </section>
  );
}
