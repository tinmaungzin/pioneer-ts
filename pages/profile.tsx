import Layout from "@/components/layout/front/Layout";
import { useFetchOneModel } from "@/hooks/useFetchOneModel";
import { User } from "@/utils/types";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import Image from "next/image";
import BookingHistory from "@/components/frontend/profile/BookingHistory";

function UserProfile() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user as User;
  const { model: auth_user } = useFetchOneModel<User>("all", "one_user"); // because user from session data is updating only when user login
  const [openLogout, setOpenLogout] = useState<boolean>(false);

  const unauthenticated =
    status === "unauthenticated" || (user && !("user_type_id" in user));

  if (unauthenticated) {
    router.push("/");
  }

  return (
    <>
      <Layout>
        <div className="w-full lg:w-4/12 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="flex justify-center mt-4">
              <i className="fa-solid fa-user text-8xl "></i>
            </div>
            <div className="px-6">
              <div className="text-center mt-12">
                <h3 className="text-2xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  {auth_user?.name ? auth_user.name : user?.name}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fa-solid fa-phone  mr-2 text-lg text-blueGray-400"></i>
                  {auth_user?.phone_number
                    ? auth_user?.phone_number
                    : user?.phone_number}
                </div>
              </div>
              {auth_user?.point ||
              auth_user?.balance ||
              user?.point ||
              user?.balance ? (
                <div className="flex flex-wrap justify-center">
                  <div className="w-full px-4 text-center mt-8">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-lg font-bold block uppercase tracking-wide text-blueGray-600">
                          {auth_user?.balance} MMK
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Balance
                        </span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-lg font-bold block uppercase tracking-wide text-blueGray-600">
                          {auth_user?.point}
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Points
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex justify-around">
                  <Dialog open={openLogout} onOpenChange={setOpenLogout}>
                    <DialogTrigger>
                      <p className="p-4 cursor-pointer rounded hover:bg-gray-100">
                        Logout
                      </p>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                      <DialogHeader>
                        <p className="text-center font-semibold ">
                          Account Logout
                        </p>
                      </DialogHeader>
                      <p className="text-center py-4">
                        Are you sure you want to logout?
                      </p>
                      <div className="flex justify-center">
                        <button
                          onClick={() => signOut()}
                          className="mx-2 py-1 px-4 text-center text-white bg-black border border-black rounded-md hover:bg-transparent hover:text-black transition font-medium"
                        >
                          Logout
                        </button>
                        <button
                          onClick={() => setOpenLogout(false)}
                          className="mx-2 py-1 px-4 text-center text-black bg-transparent border border-black rounded-md hover:bg-black hover:text-white transition font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <p className="p-4 cursor-pointer rounded hover:bg-gray-100">
                    Change Password
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BookingHistory />
      </Layout>
    </>
  );
}

export default UserProfile;
