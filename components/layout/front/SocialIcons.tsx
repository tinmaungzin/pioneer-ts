import Image from "next/image";
import Link from "next/link";

function SocialIcons() {
  return (
    <>
      <div className="flex justify-center">
        <Link target="_blank" href="https://www.facebook.com/PioneerClubMDY">
          <Image
            className="w-6 h-6 lg:w-8 lg:h-8 mx-2"
            src="/images/icons/facebook.png"
            alt="logo"
            width={500}
            height={300}
          />
        </Link>
        <Link target="_blank" href="https://m.me/pioneerclubmdy/">
          <Image
            className="w-6 h-6 lg:w-8 lg:h-8 mx-2"
            src="/images/icons/messenger.png"
            alt="logo"
            width={500}
            height={300}
          />
        </Link>
        <Link
          target="_blank"
          href="https://instagram.com/pioneer_mdy_entertainment?igshid=NTdlMDg3MTY= "
        >
          <Image
            className="w-6 h-6 lg:w-8 lg:h-8 mx-2"
            src="/images/icons/instagram.png"
            alt="logo"
            width={500}
            height={300}
          />
        </Link>
        <Link target="_blank" href="https://t.me/pioneermdy">
          <Image
            className="w-6 h-6 lg:w-8 lg:h-8 mx-2"
            src="/images/icons/telegram.png"
            alt="logo"
            width={500}
            height={300}
          />
        </Link>
        <Link
          target="_blank"
          href="https://invite.viber.com/?g2=AQBIC2lJL2tTMU8spoYsotz3UNKPEjwTpFWkjStD2qYvIFLt93nL8q1sfq2g2i2e"
        >
          <Image
            className="w-6 h-6 lg:w-8 lg:h-8 mx-2"
            src="/images/icons/viber.png"
            alt="logo"
            width={500}
            height={300}
          />
        </Link>
      </div>
    </>
  );
}

export default SocialIcons;
