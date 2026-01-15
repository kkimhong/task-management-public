"use client";

import * as React from "react";
import {
  AudioWaveform,
  ChartSpline,
  ClipboardCheck,
  Command,
  CreditCard,
  FileText,
  Folder,
  GalleryVerticalEnd,
  LockKeyhole,
  PieChart,
  Settings2,
  Users,
  Wrench,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavProjects } from "./nav-projects";

const data = {
  user: {
    name: "kruy kimhong",
    email: "kruykimhongkkh@gmail.com.com",
    avatar: "https://cdn-icons-png.flaticon.com/512/5787/5787016.png",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Project Management",
      url: "/project-management",
      icon: Folder,
      isActive: true,
      items: [
        {
          title: "Marketing Campaign",
          url: "/projects/1",
        },
        {
          title: "Product Launch",
          url: "/projects/2",
        },
        {
          title: "Engineering",
          url: "/projects/3",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Dashboard",
      url: "/",
      icon: ChartSpline,
    },
    {
      name: "Task",
      url: "/tasks",
      icon: ClipboardCheck,
    },
    {
      name: "Project",
      url: "/projects",
      icon: Folder,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
