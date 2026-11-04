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
import Layout from "./pages/layout";
import Accessibility from "./pages/accessibility";
import Behavior from "./pages/behavior";

import Button from "./pages/button";
import Input from "./pages/input";
import Selection from "./pages/selection";
import Segmented from "./pages/segmented";
import Tabs from "./pages/tabs";
import Menu from "./pages/menu";
import Slider from "./pages/slider";

import Chip from "./pages/chip";
import Banner from "./pages/banner";
import Progress from "./pages/progress";
import Skeleton from "./pages/skeleton";
import Stepper from "./pages/stepper";
import Toast from "./pages/toast";
import EmptyState from "./pages/empty-state";

import Surfaces from "./pages/surfaces";
import AccentCard from "./pages/accent-card";
import Accordion from "./pages/accordion";
import Avatar from "./pages/avatar";
import Stat from "./pages/stat";
import KeyValue from "./pages/key-value";
import BarChart from "./pages/bar-chart";
import Legend from "./pages/legend";
import Table from "./pages/table";
import Terminal from "./pages/terminal";
import Codeblock from "./pages/codeblock";
import Command from "./pages/command";

import Popover from "./pages/popover";
import Modal from "./pages/modal";
import Drawer from "./pages/drawer";

import PageFurniture from "./pages/page-furniture";
import Pagination from "./pages/pagination";
import Prose from "./pages/prose";

import DashboardExample from "./pages/example-dashboard";
import SettingsExample from "./pages/example-settings";
import InvoiceExample from "./pages/example-invoice";
import EmptyProjectExample from "./pages/example-empty";

export const GROUPS = [
  "Getting started",
  "Foundation",
  "Controls",
  "Status & feedback",
  "Containers & data",
  "Overlays",
  "Page",
  "Examples",
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
  { path: "/density", title: "Density and contract props", group: "Foundation", component: Density },
  { path: "/layout", title: "Layout", group: "Foundation", component: Layout },
  { path: "/accessibility", title: "Accessibility", group: "Foundation", component: Accessibility },
  { path: "/behavior", title: "Behavior", group: "Foundation", component: Behavior },

  { path: "/button", title: "Button", group: "Controls", component: Button },
  { path: "/input", title: "Input & field", group: "Controls", component: Input },
  { path: "/selection", title: "Selection", group: "Controls", component: Selection },
  { path: "/segmented", title: "Segmented", group: "Controls", component: Segmented },
  { path: "/tabs", title: "Tabs", group: "Controls", component: Tabs },
  { path: "/menu", title: "Menu", group: "Controls", component: Menu },
  { path: "/slider", title: "Slider", group: "Controls", component: Slider },

  { path: "/chip", title: "Chip", group: "Status & feedback", component: Chip },
  { path: "/banner", title: "Banner", group: "Status & feedback", component: Banner },
  { path: "/progress", title: "Progress", group: "Status & feedback", component: Progress },
  { path: "/skeleton", title: "Skeleton", group: "Status & feedback", component: Skeleton },
  { path: "/stepper", title: "Stepper", group: "Status & feedback", component: Stepper },
  { path: "/toast", title: "Toast", group: "Status & feedback", component: Toast },
  { path: "/empty-state", title: "Empty state", group: "Status & feedback", component: EmptyState },

  { path: "/surfaces", title: "Surfaces", group: "Containers & data", component: Surfaces },
  { path: "/accent-card", title: "Accent card", group: "Containers & data", component: AccentCard },
  { path: "/accordion", title: "Accordion", group: "Containers & data", component: Accordion },
  { path: "/avatar", title: "Avatar", group: "Containers & data", component: Avatar },
  { path: "/stat", title: "Stat", group: "Containers & data", component: Stat },
  { path: "/key-value", title: "Key-value list", group: "Containers & data", component: KeyValue },
  { path: "/bar-chart", title: "Bar chart", group: "Containers & data", component: BarChart },
  { path: "/legend", title: "Legend", group: "Containers & data", component: Legend },
  { path: "/table", title: "Table", group: "Containers & data", component: Table },
  { path: "/terminal", title: "Terminal", group: "Containers & data", component: Terminal },
  { path: "/codeblock", title: "Code block", group: "Containers & data", component: Codeblock },
  { path: "/command", title: "Command", group: "Containers & data", component: Command },

  { path: "/popover", title: "Popover & tooltip", group: "Overlays", component: Popover },
  { path: "/modal", title: "Modal", group: "Overlays", component: Modal },
  { path: "/drawer", title: "Drawer", group: "Overlays", component: Drawer },

  { path: "/page-furniture", title: "Page furniture", group: "Page", component: PageFurniture },
  { path: "/pagination", title: "Pagination & breadcrumbs", group: "Page", component: Pagination },
  { path: "/prose", title: "Prose & skip link", group: "Page", component: Prose },

  { path: "/examples/dashboard", title: "Dashboard", group: "Examples", component: DashboardExample },
  { path: "/examples/settings", title: "Settings", group: "Examples", component: SettingsExample },
  { path: "/examples/invoice", title: "Invoice detail", group: "Examples", component: InvoiceExample },
  { path: "/examples/empty-project", title: "Empty project", group: "Examples", component: EmptyProjectExample },
];
