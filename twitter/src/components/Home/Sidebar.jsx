import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Customlink from "./Customlink";
import Sidebaropt from "./Sidebaropt";
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
} from "./Icons";
// import useLoggedinuser from "../../hooks/useLoggedinuser";
function Sidebar({ handlelogout, user }) {
  const [anchor, setAnchor] = useState(null);
  // const openMenu = Boolean(anchor);
  // const {loggedinuser} = useLoggedinuser();
  const navigate = useNavigate();

  const handleClick = (e) => {
    setAnchor(e.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };

  const result = user?.email?.split("@");
  const profileImage = user?.photoURL || user?.profileImage || "/avatar.png";

    

  const links = [
    { to: "feed", icon: <HomeIcon />, text: "Home" },
    { to: "explore", icon: <SearchIcon />, text: "Explore" },
    { to: "notification", icon: <NotiIcon />, text: "Notification" },
    { to: "messages", icon: <MessIcon />, text: "Messages" },
    { to: "bookmarks", icon: <BookIcon />, text: "Bookmarks" },
    { to: "lists", icon: <ListIcon />, text: "Lists" },
    { to: "Premium", icon: <PremIcon />, text: "Premium" },
    { to: "profile", icon: <ProfileIcon />, text: "Profile" },
    { to: "more", icon: <MoreIcon />, text: "More" },
  ];
  const [show,SetShow] = useState(false)

  return (
    <>
      {/* <div className="sm:hidden flex justify-between p-2">
        <img
          src={profileImage}
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex items-center justify-end">
          <div className="text-[#419CF1] text-3xl p-2 px-4">
            <ion-icon name="logo-twitter"></ion-icon>
          </div>
          <p className="font-bold h-7 p-3 py-4 rounded-full  flex justify-center items-center bg-black text-white">
            Try Premium
          </p>
        </div>
      </div> */}
      <div className="hidden sm:flex flex-col justify-between md:w-64 gap-1 p-2 border-r h-screen ">
        <div>
          <div className="text-[#419CF1] text-3xl p-2 px-4">
            <ion-icon name="logo-twitter"></ion-icon>
          </div>
          <div className="flex flex-col gap-1">
            {links.map(({ to, icon, text }) => (
              <Customlink key={to} to={to}>
                <Sidebaropt icon={icon} text={text} />
              </Customlink>
            ))}
          </div>
        </div>
        <button className="hidden lg:block bg-blue-500 text-white px-4 py-2 rounded-full">
          Tweet
        </button>

        <div className=" flex items-center justify-center lg:justify-start gap-10 active:bg-slate-200 p-2 relative rounded-full cursor-pointer transition-all " onClick={() => SetShow((prev) => !prev)}>
          <div className={`w-64 h-24 absolute -left-3 -top-28 bg-white rounded-xl shadow-xl p-5 ${show ? 'flex' : 'hidden'} flex-col justify-between px-6`}>
            <p className="font-bold">Add an existing account</p>
            <p onClick={handlelogout} className="font-bold">Log out @{result}</p>
          </div>
          <div className="flex justify-start items-center gap-2">
          <img
            src={profileImage}
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div className="hidden md:block lg:block">
            <h4 className="text-black font-bold">
              {user?.displayName || "Guest User"}
            </h4>
            <h5 className="text-gray-400 -mt-1">@{result || "username"}</h5>
          </div>
          </div>
          <div className="hidden md:block cursor-pointer hover:bg-sky-50 rounded-full p-2 ">
            <Dots />
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
