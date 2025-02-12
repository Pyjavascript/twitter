import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import Customlink from "./Customlink";
import Sidebaropt from "./Sidebaropt";
import { StateContext } from '../../context/StateContext';
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
import { useUserAuth } from '../../context/userauth'
// import useLoggedinuser from "../../hooks/useLoggedinuser";
function Sidebar({ handlelogout, user }) {
  const {logout} = useUserAuth()
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
  const handlelout = async () => {
    try {
      await logout()
      navigate('/signup')
    } catch (e) {
      console.log(e.message)
    }
  }

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
    // { to: "/signup", icon: <Logout />, text: "Logout" }
    // /signup
  ];
  const [show,SetShow] = useState(false)
  const { showNavbar,setShowNavbar } = useContext(StateContext);

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
      <div className={`w-screen  flex-col justify-between md:w-64 gap-1 p-2 border-r h-screen  ${showNavbar ? 'flex' : 'hidden'} md:flex z-30`}>
        <div>
          <div className="text-[#419CF1] text-3xl p-2 px-4 w-full flex justify-between">
            <ion-icon name="logo-twitter"></ion-icon>
            <div className="md:hidden"  onClick={() => {
          setShowNavbar((prev) => !prev);
        }}>

            <ion-icon name="close-outline"></ion-icon>
            </div>
          </div>
          <div className="w-1/2 flex flex-col gap-1">
            {links.map(({ to, icon, text }) => (
              <Customlink key={to} to={to}>
                <Sidebaropt icon={icon} text={text} />
              </Customlink>
            ))}
          </div>
          <div className="flex px-5 py-1 gap-2" onClick={handlelogout}>
             <Logout/>
            <p className="text-xl">Logout</p>
          </div>
        </div>
        <div className="px-5">
        <button className="md:w-2/3 lg:block bg-blue-500 text-white px-10 md:px-4 py-2 rounded-full">
          Tweet
        </button>
        </div>

        <div className="flex items-center md:justify-center justify-start px-8 lg:justify-start active:bg-slate-200 md:p-2 relative rounded-full cursor-pointer transition-all w-2/3 md:w-full" onClick={() => SetShow((prev) => !prev)}>
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
