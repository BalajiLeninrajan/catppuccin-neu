/* ── page registry ──────────────────────────────────────────────────────────
   The single source of truth for routes, sidebar order, and page titles.
   Each entry: { path, title, group, component }. Groups render in GROUPS
   order; pages render in PAGES order within their group.                   */

import Introduction from "./pages/introduction.jsx";
import Density from "./pages/density.jsx";

import Colors from "./pages/colors.jsx";
import Typography from "./pages/typography.jsx";
import Depth from "./pages/depth.jsx";

import Button from "./pages/button.jsx";
import Input from "./pages/input.jsx";
import Segmented from "./pages/segmented.jsx";
import Stepper from "./pages/stepper.jsx";
import Chip from "./pages/chip.jsx";
import Banner from "./pages/banner.jsx";
import Surfaces from "./pages/surfaces.jsx";
import AccentCard from "./pages/accent-card.jsx";
import Stat from "./pages/stat.jsx";
import Progress from "./pages/progress.jsx";
import Table from "./pages/table.jsx";
import Terminal from "./pages/terminal.jsx";
import Popover from "./pages/popover.jsx";
import Modal from "./pages/modal.jsx";
import Drawer from "./pages/drawer.jsx";
import Toast from "./pages/toast.jsx";
import EmptyState from "./pages/empty-state.jsx";
import PageFurniture from "./pages/page-furniture.jsx";

export const GROUPS = ["Getting started", "Foundation", "Components"];

export const PAGES = [
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
