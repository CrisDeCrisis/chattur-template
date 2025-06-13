import {
  ChartNoAxesCombined,
  Handshake,
  History,
  Map,
  PencilLine,
  PieChart,
  Settings2,
} from "lucide-react";

export const sidebarData = {
  user: {
    name: "Cristian Gonzalez",
    email: "cristiand.gonzalez094@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Nuevo chat",
      url: "/",
      icon: PencilLine,
    },
    {
      title: "Historial",
      url: "#",
      icon: History,
    },
    {
      title: "Mapas",
      url: "#",
      icon: Map,
    },
    {
      title: "Configuraciones",
      url: "#",
      icon: Settings2,
      items: [
        // {
        //   title: "General",
        //   url: "#",
        // },
        // {
        //   title: "Team",
        //   url: "#",
        // },
        // {
        //   title: "Billing",
        //   url: "#",
        // },
        // {
        //   title: "Limits",
        //   url: "#",
        // },
      ],
    },
  ],
  adminOptions: [
    {
      name: "Marketing",
      url: "/marketing",
      icon: ChartNoAxesCombined,
    },
    {
      name: "Métricas",
      url: "/metrics",
      icon: PieChart,
    },
    {
      name: "Reseñas",
      url: "/reviews",
      icon: Handshake,
    },
  ],
};
