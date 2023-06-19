import Image from "next/image";
import Login from "./Login";
import { ReactNode } from "react";

function Layout({children}: {children: ReactNode}) {
  return (
    <>
      <section className="gradient-form h-screen bg-neutral-200 dark:bg-neutral-700 flex justify-center items-center">
        <div className="h-full w-full md:w-4/5 lg:w-2/3  p-10 ">
          <div className="g-6 flex  h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="w-full ">
              <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                <div className="g-0 lg:flex lg:flex-wrap py-12 lg:py-0">
                  <div className="px-4 md:px-0 lg:w-6/12">
                    <div className="md:mx-6 md:p-12">
                      <div className="text-center">
                        <h4 className="mb-12 mt-1 pb-4 text-xl font-semibold">
                          Pioneer Entertainment
                        </h4>
                      </div>

                      {children}
                    </div>
                  </div>
                  <div className="bg-black  hidden lg:flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none">
                    <Image
                      className="object-cover w-full h-full"
                      src="/images/login_banner.jpeg"
                      alt="banner"
                      width={500}
                      height={300}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Layout;
