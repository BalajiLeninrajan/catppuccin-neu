/* ── page registry ──────────────────────────────────────────────────────────
   The single source of truth for routes, sidebar order, and page titles.
   Each entry: { path, title, group, component }. Groups render in GROUPS
   order; pages render in PAGES order within their group.                   */

import type { ComponentType } from "preact";

import Introduction from "./pages/introduction";
import Density from "./pages/density";

import Colors from "./pages/colors";
import Typography from "./pages/typography";
import Depth from "./pages/depth";

import Button from "./pages/button";
import Input from "./pages/input";
import Segmented from "./pages/segmented";
import Stepper from "./pages/stepper";
import Chip from "./pages/chip";
import Banner from "./pages/banner";
import Surfaces from "./pages/surfaces";
import AccentCard from "./pages/accent-card";
import Stat from "./pages/stat";
import Progress from "./pages/progress";
import Table from "./pages/table";
import Terminal from "./pages/terminal";
import Popover from "./pages/popover";
import Modal from "./pages/modal";
import Drawer from "./pages/drawer";
import Toast from "./pages/toast";
import EmptyState from "./pages/empty-state";
import PageFurniture from "./pages/page-furniture";

export const GROUPS = ["Getting started", "Foundation", "Components"] as const;

export type Group = (typeof GROUPS)[number];

export interface NavEntry {
  path: string;
  title: string;
  group: Group;
  component: ComponentType;
}

export const PAGES: NavEntry[] = [
  { path: "/", title: "Introduction", group: "Getting started", component: Introduction },
  { path: "/density", title: "Density & contract props", group: "Getting started", component: Density },

  { path: "/colors", title: "Colors", group: "Foundation", component: Colors },
  { path: "/typography", title: "Typography", group: "Foundation", component: Typography },
  { path: "/depth", title: "Depth", group: "Foundation", component: Depth },

  { path: "/button", title: "Button", group: "Components", component: Button },
  { path: "/input", title: "Input & Field", group: "Components", component: Input },
  { path: "/segmented", title: "Segmented", group: "Components", component: Segmented },
  { path: "/stepper", title: "Stepper", group: "Components", component: Stepper },
  { path: "/chip", title: "Chip", group: "Components", component: Chip },
  { path: "/banner", title: "Banner", group: "Components", component: Banner },
  { path: "/surfaces", title: "Surfaces", group: "Components", component: Surfaces },
  { path: "/accent-card", title: "Accent card", group: "Components", component: AccentCard },
  { path: "/stat", title: "Stat", group: "Components", component: Stat },
  { path: "/progress", title: "Progress", group: "Components", component: Progress },
  { path: "/table", title: "Table", group: "Components", component: Table },
  { path: "/terminal", title: "Terminal", group: "Components", component: Terminal },
  { path: "/popover", title: "Popover", group: "Components", component: Popover },
  { path: "/modal", title: "Modal", group: "Components", component: Modal },
  { path: "/drawer", title: "Drawer", group: "Components", component: Drawer },
  { path: "/toast", title: "Toast", group: "Components", component: Toast },
  { path: "/empty-state", title: "Empty state", group: "Components", component: EmptyState },
  { path: "/page-furniture", title: "Page furniture", group: "Components", component: PageFurniture },
];
