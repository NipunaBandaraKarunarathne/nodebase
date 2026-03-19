"use client";
import {
  CreditCardIcon,
  FolderOpenIcon,
  HistoryIcon,
  KeyIcon,
  LogOutIcon,
  StarIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

const menuItems = [
  {
    title: "Menu Items",
    items: [
      {
        title: "Workfolws",
        icon: FolderOpenIcon,
        href: "/workflows",
      },
      {
        title: "Credentials",
        icon: KeyIcon,
        href: "/credentials",
      },
      {
        title: "Executions",
        icon: HistoryIcon,
        href: "/executions",
      },
    ],
  },
];

export const AppSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="gap-x-4 h-10 px-4">
            <Link
              href="/workflows"
              prefetch
              className="flex items-center gap-x-4"
            >
              <Image
                src="/logo.svg"
                alt="NodeBase Logo"
                width={30}
                height={30}
              />
              <span className="text-sm font-bold">NodeBase</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((menu) => {
          return (
            <SidebarGroup key={menu.title}>
              <SidebarGroupContent>
                <SidebarMenu>
                {menu.items.map((item) => {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={
                          item.href === "/"
                            ? pathname === "/"
                            : pathname.startsWith(item.href)
                        }
                        asChild
                        className="gap-x-4 h-10 px-4"
                      >
                        <Link
                          href={item.href}
                          prefetch
                          className="flex items-center gap-x-4"
                        >
                          <item.icon className="w-4 h-4" />
                          <span className="text-sm">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={"Upgrade to Pro"}
              className="gap-x-4 h-10 px-4"
              onClick={() => {}}
            >
              <StarIcon className="w-4 h-4" />
              <span className="text-sm">Upgrade to Pro</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={"Billing Portal"}
              className="gap-x-4 h-10 px-4"
              onClick={() => {}}
            >
              <CreditCardIcon className="w-4 h-4" />
              <span className="text-sm">Billing Portal</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={"Sign Out"}
              className="gap-x-4 h-10 px-4"
              onClick={() =>authClient.signOut({
                fetchOptions:{
                    onSuccess:()=>{
                        router.push("/login")
                    }
                }
              })}
            >
              <LogOutIcon className="w-4 h-4" />
              <span className="text-sm">Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
