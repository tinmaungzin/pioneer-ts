import SocialIcons from "./SocialIcons";
import Link from "next/link";
import Image from "next/image";

function Footer() {
  return (
    <>
      <div className="bg-black grid grid-cols-1 lg:grid-cols-3 py-20 gap-8">
        <div className="flex justify-center items-center">
          <div>
            <p className="text-white text-lg text-center font-semibold">
              Contact Us
            </p>
            <div className="text-white text-center mt-2">
              <p>
                <Link href="tel:+9592588884471">+959-2588884471</Link>
              </p>
              <p>
                <Link href="tel:+959780290666">+959-780290666</Link>
              </p>
              <p>
                <Link href="mailto:pioneerentertainment@gmail.com">
                  pioneerentertainment@gmail.com
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <SocialIcons />
        </div>
        <div className="flex justify-center">
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
    </>
  );
}

export default Footer;
