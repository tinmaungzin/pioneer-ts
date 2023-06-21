import Image from "next/image";

function SocialIcons() {
  return (
    <>
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
    </>
  );
}

export default SocialIcons;
