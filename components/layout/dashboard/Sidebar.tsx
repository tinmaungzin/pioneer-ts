import { routes } from "@/routes";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type RouteType = {
  name: string;
  url: string;
  icon: string;
  type: string;
};
type GroupRoute = {
  [key: string]: RouteType[];
  people: RouteType[];
  preparation: RouteType[];
  reward: RouteType[];
  report: RouteType[];
};

export default function Sidebar() {
  const router = useRouter();

  const groupedRoutes: GroupRoute = routes.reduce((acc, route) => {
    if (!acc[route.type]) {
      acc[route.type] = [];
    }
    acc[route.type].push(route);
    return acc;
  }, {} as GroupRoute);

  return (
    <>
      <div className="flex flex-col min-h-screen p-3 bg-white shadow w-60 fixed">
        <div className="space-y-7 divide-y-2">
          <div className="flex items-center justify-center">
            <h2 className="text-xl font-semibold uppercase">Pioneer</h2>
          </div>
          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm divide-y-2">
              {Object.entries(groupedRoutes).map(([type, routes]) => (
                <div key={type} className="">
                  <li className="py-2">
                    <span className="px-3 text-xs text-gray-500 uppercase">
                      {type}
                    </span>
                  </li>
                  {routes.map((route, index) => {
                    const isSelected = router.pathname.startsWith(route.url);
                    return (
                      <li className="rounded-sm pb-1" key={index}>
                        <Link
                          href={route.url}
                          className={`flex items-center p-2 space-x-3 rounded-md hover:text-gray-700 ${
                            isSelected
                              ? "text-black bg-gray-200"
                              : "text-gray-500"
                          }`}
                        >
                          <div className="w-5">
                            <i className={`${route.icon}`}></i>
                          </div>
                          <span>{route.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
