import { useSuspenseQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { currentUserOptions } from "@/api/queries/auth";
import { Brush, ChevronsUpDown, CreditCard, LogOut, User2 } from "lucide-react";
import { SidebarMenuButton } from "./ui/sidebar";
import { Link } from "@tanstack/react-router";
import { useLogoutMutation } from "@/api/mutations/auth";

export default function UserAvatar() {
  const { data: currentUser } = useSuspenseQuery(currentUserOptions());
  const logout = useLogoutMutation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="flex justify-between items-center"
        >
          <Avatar>
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start mr-auto">
            <p className="font-medium">{currentUser.name}</p>
            <p className="text-xs">{currentUser.email}</p>
          </div>
          <ChevronsUpDown size={12} className="text-muted-foreground" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Avatar>
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start mr-auto font-medium">
            <p className="font-medium capitalize">{currentUser.name}</p>
            <p className="text-xs lowercase">{currentUser.email}</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/settings/account">
            <User2 />
            Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/settings/billing">
            <CreditCard />
            Billing
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/settings/appearance">
            <Brush />
            Appearance
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={() => logout.mutateAsync()}
        >
          <LogOut />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
