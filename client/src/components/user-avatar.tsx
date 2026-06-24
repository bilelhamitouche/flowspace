import { useSuspenseQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SidebarMenuButton } from "./ui/sidebar";
import { currentUserOptions } from "@/api/queries/auth";
import { useLogoutMutation } from "@/api/mutations/auth";
import { Paintbrush, Settings } from "lucide-react";

export default function UserAvatar() {
  const { data: user } = useSuspenseQuery(currentUserOptions());
  const logout = useLogoutMutation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <SidebarMenuButton
            size="lg"
            className="flex justify-between items-center"
          >
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src="heep" alt="user avatar" />
                <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs">{user.email}</span>
              </div>
            </div>
          </SidebarMenuButton>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuItem>
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage src="heep" alt="user avatar" />
              <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">{user.name}</span>
              <span className="text-xs">{user.email}</span>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Paintbrush />
          <span>Appearance</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={async () => {
            await logout.mutateAsync();
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
