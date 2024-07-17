import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { Book } from "react-feather";

export default function BasePage(props: { children: any }) {
  const { children } = props;

  return (
    <div className="dark h-full min-h-screen bg-background text-foreground">
      <Navbar className="mb-14" isBordered={true}>
        <NavbarContent className="hidden sm:flex gap-4">
          <NavbarBrand>
            <Link href="/" className="font-extrabold text-inherit flex gap-1">
              <Book size={18} />
              Bookstore
            </Link>
          </NavbarBrand>

          <NavbarItem>
            <Link color="foreground" href="/authors">
              Authors
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/books">
              Books
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <Link href="/admin">
            <Button size="sm" variant="ghost">
              Admin
            </Button>
          </Link>
        </NavbarContent>
      </Navbar>
      <div className="mx-auto max-w-[1024px]">{children}</div>
    </div>
  );
}
