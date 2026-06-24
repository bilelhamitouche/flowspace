import { ChevronsUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SidebarMenuButton } from "./ui/sidebar";

export default function WorkspaceSwitcher() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <SidebarMenuButton
            size="lg"
            className="flex justify-between items-center"
          >
            <span>Workspace Switcher</span>
            <ChevronsUpDown />
          </SidebarMenuButton>
        }
      />
      <DropdownMenuContent side="inline-start">Hello</DropdownMenuContent>
    </DropdownMenu>
  );
}
