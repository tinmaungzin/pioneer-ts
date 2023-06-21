import Loading from "@/components/util/Loading";
import { User } from "@/utils/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

function LoadingIndex() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user as User;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    // if (user && user.staff_type_id === 1) {
    //   router.push("/dashboard/admins");
    // }
    // if (user && user.staff_type_id === 2) {
    //   router.push("/dashboard/tables");
    // }
  }, [router, status, user]);
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <Loading height="h-32" width="w-32" />
      </div>
    </>
  );
}

export default LoadingIndex;
