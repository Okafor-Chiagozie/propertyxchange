import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import Navbar from './Navbar';
import { MdMenu, MdClose } from 'react-icons/md';
import { LuUserRound } from 'react-icons/lu';
import { useAuth0 } from '@auth0/auth0-react';
import ProfileMenu from './ProfileMenu';

const Header = () => {
  const [active, setActive] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const toggleMenu = () => {
    setMenuOpened((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollThreshold = 30;
      if (scrollY > scrollThreshold) {
        setActive(true);
        if (menuOpened) {
          setMenuOpened(false);
        }
      } else {
        setActive(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [menuOpened]);

  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  return (
    <header
      className={`${active ? 'py-1 bg-white shadow-md' : 'py-2 bg-[#D0CCC9]'} max-padd-container fixed top-0 w-full left-0 right-0 z-50 transition-all duration-200`}
    >
      {/* CONTAINER */}
      <div className="flexBetween">
        {/* LOGO */}
        <div>
          <Link to="/">
            <img src={logo} alt="Logo" className="h-16" />
          </Link>
        </div>
        {/* NAVBAR */}
        <div className="flexCenter gap-x-4">
          {/* DESKTOP */}
          <Navbar
            containerStyles="hidden lg:flex gap-x-5 lg:gap-x-12 capitalize medium-15"
          />
          {/* MOBILE */}
          <Navbar
            containerStyles={`${menuOpened ? 'flex items-start flex-col gap-y-8 capitalize fixed top-20 right-8 p-12 bg-white shadow-md rounded-2xl w-64 medium-15 ring-1 ring-slate-900/5 transition-all duration-300 z-50' : 'flex items-start flex-col gap-y-8 capitalize fixed top-20 -right-[100%] p-12 bg-white shadow-md rounded-2xl w-64 medium-15 ring-1 ring-slate-900/5 transition-all duration-300'}`}
          />
        </div>
        {/* BUTTONS */}
        <div className="flexBetween gap-x-3 sm:gap-x-5 bold-16">
          {!menuOpened ? (
            <MdMenu
              onClick={toggleMenu}
              className="lg:hidden cursor-pointer text-3xl"
            />
          ) : (
            <MdClose
              onClick={toggleMenu}
              className="lg:hidden cursor-pointer text-3xl"
            />
          )}
          {!isAuthenticated ? (
            <button
              onClick={loginWithRedirect}
              className="flexCenter gap-x-2 !px-5 btn-dark"
            >
              <LuUserRound className="text-xl" />
              <span>Log In</span>
            </button>
          ) : (
            <ProfileMenu user={user} logout={logout} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;