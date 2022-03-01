import React from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuAlt1Icon, XIcon } from "@heroicons/react/solid";
import { Link, NavLink } from "react-router-dom";
// import Logo from "../../images/logo.webp";
import "./Header.css";
import useAuth from "../../../Hooks/useAuth";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const { user, logOut } = useAuth();
  return (
    <header className="header">
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 py-1 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuAlt1Icon
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <Link to="/home">
                    <div className="flex-shrink-0 flex items-center">
                      {/* <img src={Logo} alt="" /> */}
                      <h2 className="text-3xl text-white italic">Hello</h2>
                    </div>
                  </Link>
                  <div className="hidden sm:block sm:ml-auto mt-3">
                    <div className="flex space-x-4 text-white font-medium ">
                      <NavLink to="/home">Home</NavLink>
                      <NavLink to="/tab1">Tab-1</NavLink>
                      <NavLink to="/tab2">Tab-2</NavLink>
                      <h4>{user?.displayName}</h4>
                      {user ? (
                        <button className="border px-3 py-1" onClick={logOut}>
                          Logout
                        </button>
                      ) : (
                        <NavLink to="/signin">Sign in</NavLink>
                      )}
                      <Menu
                        as="div"
                        className="hidden lg:block ml-1 relative z-40"
                      >
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <NavLink
                                  to="/tab1"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-lg text-gray-900"
                                  )}
                                >
                                  Tab-1
                                </NavLink>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <NavLink
                                  to="/tab2"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-lg text-gray-900"
                                  )}
                                >
                                  Tab-2
                                </NavLink>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <div>
                  <NavLink
                    className="bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    to="/home"
                  >
                    Home
                  </NavLink>
                </div>
                <div>
                  <NavLink
                    className="bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    to="/tab1"
                  >
                    Tab-1
                  </NavLink>
                </div>
                <div>
                  <NavLink
                    className="bg-gray-900 text-white text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    to="/tab2"
                  >
                    Tab-2
                  </NavLink>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </header>
  );
};

export default Header;
