import Layout from "@/components/auth/staff/Layout";
import Image from "next/image";

function Test() {
  return (
    <>
      {/* <section className="gradient-form h-screen bg-neutral-200 dark:bg-neutral-700 flex justify-center items-center ">
        <div className="h-full w-full md:w-4/5 lg:w-3/4  p-10">
          <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="w-full">
              <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                <div className="g-0 lg:flex lg:flex-wrap">
                  <div className="px-4 md:px-0 lg:w-6/12">
                    <div className="md:mx-6 md:p-12">
                      <div className="text-center">
                        <h4 className="mb-12 mt-1 py-4 text-xl font-semibold">
                          Pioneer Entertainment
                        </h4>
                      </div>

                      <form>
                        <p className="mb-4 text-center">
                          Please login to your account
                        </p>
                        <div
                          className="relative mb-4"
                          data-te-input-wrapper-init
                        >
                          <input
                            type="text"
                            className="input-box"
                            id="exampleFormControlInput1"
                            placeholder="Username"
                          />
                        </div>

                        <div
                          className="relative mb-4"
                          data-te-input-wrapper-init
                        >
                          <input
                            type="password"
                            className="input-box"
                            id="exampleFormControlInput11"
                            placeholder="Password"
                          />
                        </div>

                        <div className="mb-12 pb-1 pt-1 text-center">
                          <button
                            className="bg-black mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="button"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                          >
                            Log in
                          </button>

                          <a href="#!">Forgot password?</a>
                        </div>

                        <div className="flex items-center justify-between pb-6">
                          <p className="mb-0 mr-2">Do not have an account?</p>
                          <button
                            type="button"
                            className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                          >
                            Register
                          </button>
                        </div>
                      </form>
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
      </section> */}
      <Layout />
    </>
  );
}

export default Test;
