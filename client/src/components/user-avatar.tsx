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

export default function UserAvatar() {
  const { data: user } = useSuspenseQuery(currentUserOptions());
  const logout = useLogoutMutation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <SidebarMenuButton className="flex justify-between items-center">
            <Avatar>
              <AvatarImage src="heep" alt="user avatar" />
              <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
            </Avatar>
          </SidebarMenuButton>
        }
      />
      <DropdownMenuContent>
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
