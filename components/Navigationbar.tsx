"use client";

import React, { useContext } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Avatar,
} from "@nextui-org/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { usePathname } from "next/navigation";
import { SignInContext } from "./SignInContext";
import SignInPage from "./sign-in";

interface MenuItem {
  name: string;
  href: string;
}


export default function Navigationbar() {
  const { isSignedIn, userAvatar } = useContext(SignInContext); // Access sign-in state
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { name: "Home", href: "/" },
    { name: "Our Team", href: "/members" },
    { name: "Publications", href: "/publications" },
    { name: "Our Projects", href: "/ourprojects" },
    { name: "Our Desk", href: "/ourdesk" },
    { name: "Contact Us", href: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname?.startsWith(path)) return true;
    return false;
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit md:text-lg text-base">EXINES</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.name} isActive={isActive(item.href)}>
            <Link
              color={isActive(item.href) ? "primary" : "foreground"}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={isActive(item.href) ? "font-medium" : ""}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          {isSignedIn ? (
            <Avatar isBordered color="primary" src={userAvatar} alt="User Avatar" />
          ) : (
            <SignInPage />
          )}
        </NavbarItem>
        
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.name}>
            <Link
              color={isActive(item.href) ? "primary" : "foreground"}
              className={`w-full ${isActive(item.href) ? "font-medium" : ""}`}
              href={item.href}
              size="lg"
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
