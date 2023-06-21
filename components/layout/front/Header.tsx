import { User } from "@/utils/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import SocialIcons from "./SocialIcons";

function Header() {
  const { data: session, status } = useSession();
  const user = session?.user as User;
  const unauthenticated =
    status === "unauthenticated" || (user && !("user_type_id" in user));

  return (
    <>
      <div className=" py-4 bg-black shadow">
        <div className="px-8 md:px-20 py-4 flex justify-between items-center">
          {unauthenticated ? (
            <Link href="/login">
              <div className="text-white flex flex-col items-center">
                <i className="fa-solid fa-right-to-bracket text-lg lg:text-2xl"></i>
                <p className="text-center text-sm lg:text-base">Login</p>
              </div>
            </Link>
          ) : (
            <Link href="/profile">
              <div className="text-white flex flex-col items-center">
                <i className="fa-solid fa-user text-lg lg:text-2xl"></i>
                <p className="text-center text-sm lg:text-base">Profile</p>
              </div>
            </Link>
          )}

          <div>
            <div>
              <Link href="/">
                <Image
                  className="w-24 h-16 lg:w-28 lg:h-20"
                  src="/images/logo.png"
                  alt="logo"
                  width={500}
                  height={300}
                />
              </Link>
            </div>
          </div>
          <div className="text-white flex flex-col items-center">
            <i className="fa-solid fa-headphones text-lg lg:text-2xl"></i>
            <p className="text-center text-sm lg:text-base">Hotline</p>
          </div>
        </div>
        <SocialIcons />
      </div>
    </>
  );
}

export default Header;
