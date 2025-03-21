import { useState, useEffect, useContext } from "react";
import Posts from "../Home/DataHome/Posts";
import TweetBox from "../Home/DataHome/TweetBox";
import { useUserAuth } from "../../context/userauth";
import Create from "../icons/Create";
import { StateContext } from "../../context/StateContext";
import { useTranslation } from "react-i18next";
function Feed() {
  const { t } = useTranslation();
  const { setShowNavbar } = useContext(StateContext);
  const [isOpen, SetisOpen] = useState(false);
  const [post, SetPost] = useState([]);
  const { user } = useUserAuth();
  // console.log(user);

  // console.log(user);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://https://twitter-jfq3.onrender.com/api/post?user=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          SetPost(data);
        })
        .catch((err) => console.error("Error fetching posts:", err));
    }
  }, [user]);

  const [sec, Setsec] = useState("you");
  const profileImage = user?.photoURL || user?.profileImage || "/avatar.png";

  return (
    <>
      <div
        className="sm:hidden flex justify-between p-2 relative"
        onClick={() => {
          setShowNavbar((prev) => !prev);
        }}
      >
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
            {t('sm.premium')}
          </p>
        </div>
      </div>
      <div className="h-screen overflow-hidden overflow-y-auto posts">
        <div className="w-full flex justify-between border-b-[1px]">
          <div
            className={`relative ${
              sec == "you" ? "text-black" : "text-slate-400"
            } font-semibold py-3 w-1/2 h-full flex flex-col justify-center items-center hover:bg-slate-100 cursor-pointer`}
            onClick={() => Setsec("you")}
          >
            <p>{t('sm.you')}</p>
            <div
              className={`${
                sec == "you" ? "block" : "hidden"
              } absolute rounded-full bottom-0 w-14 h-1 bg-[rgba(65,156,241,1)]`}
            ></div>
          </div>
          <div
            className={`relative ${
              sec == "follow" ? "text-black" : "text-slate-400"
            } font-semibold py-3 w-1/2 h-full flex justify-center items-center hover:bg-slate-100 cursor-pointer`}
            onClick={() => Setsec("follow")}
          >
            <p>{t('sm.following')}</p>
            <div
              className={`${
                sec == "follow" ? "block" : "hidden"
              } absolute rounded-full bottom-0 w-14 h-1 bg-[rgba(65,156,241,1)]`}
            ></div>
          </div>
        </div>
        <div className="hidden md:block">
          <TweetBox />
        </div>
        <div className="block">
        {post.map((p, i) => (
          <Posts key={i} p={p} />
        ))}
        </div>
      </div>
      <div
        className="fixed bottom-16 right-5 bg-[rgba(65,156,241,1)] shadow-lg h-14 w-14 rounded-full flex justify-center items-center"
        onClick={() => SetisOpen((prev) => !prev)}
      >
        <Create />
      </div>
      {isOpen ? (
        <div className="bg-white h-screen w-screen absolute top-0 left-0">
          <div className="w-full p-3 py-0 pt-2">
            <div
              className="text-3xl"
              onClick={() => SetisOpen((prev) => !prev)}
            >
              <ion-icon name="arrow-back-outline"></ion-icon>
            </div>
          </div>
          <TweetBox />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Feed;
