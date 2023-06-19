import { ReactNode, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { User } from "@/utils/types";

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  const { data: session, status } = useSession();
  const user = session?.user as User;
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" && user?.staff_type_id) {
      router.push("/dashboard/login");
    }
  }, [router, status, user?.staff_type_id]);
  return (
    <>
      <Sidebar />
      <div className="ml-60">
        <Header />
        <div className="mx-2 my-2 px-6 py-4 rounded shadow bg-white min-h-screen">
          {children}
        </div>
      </div>
    </>
  );
}

export default Layout;
