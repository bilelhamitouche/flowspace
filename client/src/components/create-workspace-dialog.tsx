import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { DropdownMenuItem } from "./ui/dropdown-menu";

export default function CreateWorkspaceDialog() {
  return (
    <Dialog>
      <DropdownMenuItem asChild>
        <DialogTrigger>Add Workspace</DialogTrigger>
      </DropdownMenuItem>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Workspace</DialogTitle>
          <DialogDescription>
            Fill in th form to create your workspace
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
