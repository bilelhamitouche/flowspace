import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";

export default function MobileMenu() {
  return (
    <Drawer direction="top">
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div>Hello World</div>
      </DrawerContent>
    </Drawer>
  );
}
