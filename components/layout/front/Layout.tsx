import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useSession } from "next-auth/react";
import { User } from "@/utils/types";

function Layout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const user = session?.user as User;

  return (
    <>
      <Header status={status} user={user} />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
}

export default Layout;
