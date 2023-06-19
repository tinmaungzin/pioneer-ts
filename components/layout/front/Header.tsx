import Image from "next/image";

function Header() {
  return (
    <>
      <div className="w-screen py-4 bg-black shadow">
        <div className="px-8 md:px-20 py-4 flex justify-between items-center">
          <div className="text-white flex flex-col items-center">
            <i className="fa-solid fa-user text-xl lg:text-2xl"></i>
            <p className="text-center text-sm lg:text-base">Profile</p>
          </div>
          <div>
            <div>
              <Image
                className="w-24 h-16 lg:w-32 lg:h-20"
                src="/images/logo.png"
                alt="logo"
                width={500}
                height={300}
              />
            </div>
          </div>
          <div className="text-white flex flex-col items-center">
            <i className="fa-solid fa-headphones text-xl lg:text-2xl"></i>
            <p className="text-center text-sm lg:text-base">Hotline</p>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            className="w-6 h-6 lg:w-8 lg:h-8 mx-2"
            src="/images/icons/facebook.png"
            alt="logo"
            width={500}
            height={300}
          />
          <Image
            className="w-6 h-6 lg:w-8 lg:h-8 mx-2"
            src="/images/icons/messenger.png"
            alt="logo"
            width={500}
            height={300}
          />
          <Image
            className="w-6 h-6 lg:w-8 lg:h-8 mx-2"
            src="/images/icons/instagram.png"
            alt="logo"
            width={500}
            height={300}
          />
          <Image
            className="w-6 h-6 lg:w-8 lg:h-8 mx-2"
            src="/images/icons/telegram.png"
            alt="logo"
            width={500}
            height={300}
          />
          <Image
            className="w-6 h-6 lg:w-8 lg:h-8 mx-2"
            src="/images/icons/viber.png"
            alt="logo"
            width={500}
            height={300}
          />
        </div>
      </div>
    </>
  );
}

export default Header;
