export const routes = [
  {
    name: "Admin",
    url: "/dashboard/admins",
    icon: "fa-solid fa-user-shield",
    type: "people",
    auth: ["admin"]
  },
  {
    name: "Receptionist",
    url: "/dashboard/receptionists",
    icon: "fa-solid fa-user-gear",
    type: "people",
    auth: ["admin"]
  },
  {
    name: "Salesperson",
    url: "/dashboard/salespersons",
    icon: "fa-solid fa-user-clock",
    type: "people",
    auth: ["admin"]
  },
  {
    name: "User",
    url: "/dashboard/users",
    icon: "fa-solid fa-user-pen",
    type: "people",
    auth: ["admin", "receptionist"]
  },
  {
    name: "Type",
    url: "/dashboard/types",
    icon: "fa-solid fa-sitemap",
    type: "preparation",
    auth: ["admin"]
  },
  {
    name: "Set",
    url: "/dashboard/sets",
    icon: "fa-solid fa-kitchen-set",
    type: "preparation",
    auth: ["admin"]
  },
  {
    name: "Table Set",
    url: "/dashboard/table_sets",
    icon: "fa-solid fa-tablets",
    type: "preparation",
    auth: ["admin"]
  },

  {
    name: "Event",
    url: "/dashboard/events",
    icon: "fa-solid fa-calendar-days",
    type: "preparation",
    auth: ["admin"]
  },
  {
    name: "Package",
    url: "/dashboard/packages",
    icon: "fa-solid fa-box-open",
    type: "reward",
    auth: ["admin"]
  },
  {
    name: "Point",
    url: "/dashboard/points",
    icon: "fa-solid fa-gift",
    type: "reward",
    auth: ["admin"]
  },
  {
    name: "Table",
    url: "/dashboard/tables",
    icon: "fa-solid fa-table",
    type: "report",
    auth: ["admin", "receptionist"]
  },
  {
    name: "Report",
    url: "/dashboard/reports",
    icon: "fa-solid fa-chart-simple",
    type: "report",
    auth: ["admin"]
  },
];
