import React from "react";
import { Link, NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
const Header = () => {
  const [user] = useAuthState(auth);

  // logout
  const logout = () => {
    signOut(auth);
  };
  return (
    <Disclosure as="nav" className="bg-gray-800 sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-2xl text-red-600">Pro</span>
                  <span className="text-2xl text-white">Trainer</span>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    <Link
                      to="/home"
                      className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Home
                    </Link>

                    <HashLink
                      to="/home#services"
                      smooth
                      className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Services
                    </HashLink>
                    <HashLink
                      to="/home#trainer"
                      smooth
                      className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Trainer
                    </HashLink>

                    <Link
                      to="/about"
                      className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      About
                    </Link>
                    <Link
                      to="/blogs"
                      className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Blogs
                    </Link>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {user ? (
                  <div className="flex justify-center items-center text-white px-3 py-2 rounded-md text-sm font-medium">
                    <button
                      onClick={logout}
                      className="bg-gray-900 ml-5 text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* panel for small device */}
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/home"
                className="bg-gray-900 text-white mx-1 px-2  py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <HashLink
                to="/home#services"
                smooth
                className="bg-gray-900 text-white px-2 mx-1 py-2 rounded-md text-sm font-medium"
              >
                Services
              </HashLink>
              <HashLink
                to="/home#trainer"
                smooth
                className="bg-gray-900 text-white px-2 mx-1 py-2 rounded-md text-sm font-medium"
              >
                Trainer
              </HashLink>

              <Link
                to="/blogs"
                className="bg-gray-900 text-white mx-1 px-2 py-2 rounded-md text-sm font-medium"
              >
                Blogs
              </Link>
              <Link
                to="/about"
                className="bg-gray-900 text-white mx-1 px-2 py-2 rounded-md text-sm font-medium"
              >
                About
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
