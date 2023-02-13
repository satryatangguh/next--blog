import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  const [navbar, setNavbar] = useState(false)
  return (
    <>
      <nav className="w-full bg-black sticky top-0 left-0 right-0 z-10 items-center">
        <div className="justify-between px-4 mx-auto md:items-center md:flex md:px-20">
          <div>
            <div className="flex items-center justify-between py-3 md:block">
              <Link href={'/'}>
                <h2 className="text-2xl text-white font-bold ">Next Blog</h2>
              </Link>
              {/* HAMBURGER BUTTON FOR MOBILE */}
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <Image src="/close.svg" width={30} height={30} alt="logo" />
                  ) : (
                    <Image
                      src="/hamburger-menu.svg"
                      width={30}
                      height={30}
                      alt="logo"
                      className="focus:border-none active:border-none"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-4 md:block md:pb-0 md:mt-0 ${
                navbar ? "p-0 md:p-0 block" : "hidden"
              }`}
            >
              <ul className="md:h-auto items-center justify-center md:flex gap-x-6">
                <li className="text-medium text-white py-2 text-center md:border-b-0  hover:bg-purple-600 md:hover:text-purple-600 md:hover:bg-transparent">
                  <Link href={'/'} onClick={() => setNavbar(!navbar)}>
                    Home
                  </Link>
                </li>
                <li className="text-medium text-white py-2 text-center md:border-b-0  hover:bg-purple-600 md:hover:text-purple-600 md:hover:bg-transparent">
                  <Link href={'/users'} onClick={() => setNavbar(!navbar)}>
                    Users
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;