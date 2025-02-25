import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import Customlink from "./Customlink";
import Sidebaropt from "./Sidebaropt";
import { StateContext } from '../../context/StateContext';
import { useTranslation } from "react-i18next";
import {
  MoreIcon,
  ProfileIcon,
  HomeIcon,
  SearchIcon,
  NotiIcon,
  MessIcon,
  BookIcon,
  ListIcon,
  PremIcon,
  Dots,
  Logout
} from "./Icons";
function Sidebar({ handlelogout, user }) {
  const { t } = useTranslation();
  
  const navigate = useNavigate();

  const result = user?.email?.split("@");
  const profileImage = user?.photoURL || user?.profileImage || "/avatar.png";

    

  const links = [
    { to: "feed", icon: <HomeIcon />, text: `${t('sidebar.home')}` },
    { to: "explore", icon: <SearchIcon />, text: `${t('sidebar.explore')}` },
    { to: "notification", icon: <NotiIcon />, text: `${t('sidebar.notifications')}` },
    { to: "messages", icon: <MessIcon />, text: `${t('sidebar.messages')}` },
    { to: "bookmarks", icon: <BookIcon />, text: `${t('sidebar.bookmarks')}` },
    { to: "lists", icon: <ListIcon />, text: `${t('sidebar.lists')}` },
    { to: "Premium", icon: <PremIcon />, text: `${t('sidebar.premium')}` },
    { to: "profile", icon: <ProfileIcon />, text: `${t('sidebar.profile')}` },
    { to: "more", icon: <MoreIcon />, text: `${t('sidebar.more')}` },
  ];
  const [show,SetShow] = useState(false)
  const { showNavbar,setShowNavbar } = useContext(StateContext);

  return (
    <>
      <div className={`w-screen flex-col justify-start md:w-64 gap-1 p-2 border-r h-screen  ${showNavbar ? 'flex' : 'hidden'} md:flex z-30`}>
        <div>
          <div className="text-[#419CF1] text-3xl p-2 px-4 w-full flex justify-between">
            <ion-icon name="logo-twitter"></ion-icon>
            <div className="md:hidden"  onClick={() => {
          setShowNavbar((prev) => !prev);
        }}>

            <ion-icon name="close-outline"></ion-icon>
            </div>
          </div>
          <div className="w-1/2 flex flex-col">
            {links.map(({ to, icon, text }) => (
              <Customlink key={to} to={to} onClick={() => {
                setShowNavbar((prev) => !prev);
              }}>
                <Sidebaropt icon={icon} text={text} />
              </Customlink>
            ))}
          </div>
          <div className="flex px-5 py-1 gap-2 cursor-pointer" onClick={() => {
            handlelogout()
            setShowNavbar((prev) => !prev);
            }}>
             <Logout/>
            <p className="text-xl">{t('sidebar.logout')}</p>
          </div>
        </div>
        <div className="px-5">
        <button className="md:w-2/3 lg:block bg-blue-500 text-white px-10 md:px-4 py-2 rounded-full">
        {t('tweetBox.tweetButton')}
        </button>
        </div>

        <div className="flex items-center md:justify-center justify-start px-8 lg:justify-start active:bg-slate-200 md:p-0 relative rounded-full cursor-pointer transition-all w-2/3 md:w-full" onClick={() => SetShow((prev) => !prev)}>
          <div className={`w-64 h-24 absolute -left-3 -top-28 bg-white rounded-xl shadow-xl p-5 ${show ? 'flex' : 'hidden'} flex-col justify-between px-6`}>
            <p className="font-bold">Add an existing account</p>
            <p onClick={handlelogout} className="font-bold">Log out @{result}</p>
          </div>
          <div className="flex justify-start items-center -ml-5">
          <img
            src={profileImage}
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div className="md:block  lg:block">
            <h4 className="text-black font-bold">
              {user?.displayName || "Guest User"}
            </h4>
            <h5 className="text-gray-400 -mt-1">@{result || "username"}</h5>
          </div>
          </div>
          <div className=" md:block cursor-pointer hover:bg-sky-50 rounded-full p-2 ">
            <Dots />
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
