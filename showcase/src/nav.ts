/* ── page registry ──────────────────────────────────────────────────────────
   The single source of truth for routes, sidebar order, and page titles.
   Each entry: { path, title, group, component }. Groups render in GROUPS
   order; pages render in PAGES order within their group.                   */

import type { ComponentType } from "preact";

import Introduction from "./pages/introduction";

import Colors from "./pages/colors";
import Typography from "./pages/typography";
import Depth from "./pages/depth";
import Motion from "./pages/motion";
import Density from "./pages/density";

import Button from "./pages/button";
import Input from "./pages/input";
import Selection from "./pages/selection";
import Segmented from "./pages/segmented";

import Chip from "./pages/chip";
import Banner from "./pages/banner";
import Progress from "./pages/progress";
import Stepper from "./pages/stepper";
import Toast from "./pages/toast";
import EmptyState from "./pages/empty-state";

import Surfaces from "./pages/surfaces";
import AccentCard from "./pages/accent-card";
import Accordion from "./pages/accordion";
import Avatar from "./pages/avatar";
import Stat from "./pages/stat";
import Table from "./pages/table";
import Terminal from "./pages/terminal";
import Codeblock from "./pages/codeblock";

import Popover from "./pages/popover";
import Modal from "./pages/modal";
import Drawer from "./pages/drawer";

import PageFurniture from "./pages/page-furniture";

export const GROUPS = [
  "Getting started",
  "Foundation",
  "Controls",
  "Status & feedback",
  "Containers & data",
  "Overlays",
  "Page",
] as const;

export type Group = (typeof GROUPS)[number];

export interface NavEntry {
  path: string;
  title: string;
  group: Group;
  component: ComponentType;
}

export const PAGES: NavEntry[] = [
  { path: "/", title: "Introduction", group: "Getting started", component: Introduction },

  { path: "/colors", title: "Colors", group: "Foundation", component: Colors },
  { path: "/typography", title: "Typography", group: "Foundation", component: Typography },
  { path: "/depth", title: "Depth", group: "Foundation", component: Depth },
  { path: "/motion", title: "Motion", group: "Foundation", component: Motion },
  { path: "/density", title: "Density & contract props", group: "Foundation", component: Density },

  { path: "/button", title: "Button", group: "Controls", component: Button },
  { path: "/input", title: "Input & Field", group: "Controls", component: Input },
  { path: "/selection", title: "Selection", group: "Controls", component: Selection },
  { path: "/segmented", title: "Segmented", group: "Controls", component: Segmented },

  { path: "/chip", title: "Chip", group: "Status & feedback", component: Chip },
  { path: "/banner", title: "Banner", group: "Status & feedback", component: Banner },
  { path: "/progress", title: "Progress", group: "Status & feedback", component: Progress },
  { path: "/stepper", title: "Stepper", group: "Status & feedback", component: Stepper },
  { path: "/toast", title: "Toast", group: "Status & feedback", component: Toast },
  { path: "/empty-state", title: "Empty state", group: "Status & feedback", component: EmptyState },

  { path: "/surfaces", title: "Surfaces", group: "Containers & data", component: Surfaces },
  { path: "/accent-card", title: "Accent card", group: "Containers & data", component: AccentCard },
  { path: "/accordion", title: "Accordion", group: "Containers & data", component: Accordion },
  { path: "/avatar", title: "Avatar", group: "Containers & data", component: Avatar },
  { path: "/stat", title: "Stat", group: "Containers & data", component: Stat },
  { path: "/table", title: "Table", group: "Containers & data", component: Table },
  { path: "/terminal", title: "Terminal", group: "Containers & data", component: Terminal },
  { path: "/codeblock", title: "Code block", group: "Containers & data", component: Codeblock },

  { path: "/popover", title: "Popover & tooltip", group: "Overlays", component: Popover },
  { path: "/modal", title: "Modal", group: "Overlays", component: Modal },
  { path: "/drawer", title: "Drawer", group: "Overlays", component: Drawer },

  { path: "/page-furniture", title: "Page furniture", group: "Page", component: PageFurniture },
];
