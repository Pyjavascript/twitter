import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Editprofile from "./Editprofile";
import Posts from "../Home/DataHome/Posts";
import Arrowback from "../icons/Arrowback";
import axios from "axios";
import useLoggedinuser from "../../hooks/useLoggedinuser";

function Mainprofile({ user }) {
  const navigate = useNavigate();
  const [isloading, Setisloading] = useState(false);
  const [loggedInUser] = useLoggedinuser();
  const username = user?.email?.split("@")[0];
  const [open, Setopen] = useState(false);
  const [post, Setpost] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/userpost?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        Setpost(data);
      });
  }, [user.email]);

  const handluploadcoverimage = (e) => {
    Setisloading(true);
    const img = e.target.files[0];
    const formData = new FormData();
    formData.set("image", img);
    axios
      .post(
        `https://api.imgbb.com/1/upload?key=98257fe3ec3403ba357fa7640e88fb49`,
        formData
      )
      .then((res) => {
        const url = res.data.data.display_url;
        // console.log(res.data);
        const usercoverimage = {
          email: user?.email,
          coverimage: url,
        };
        Setisloading(false);
        if (url) {
          fetch(`http://localhost:5000/userupdate/${user?.email}`, {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(usercoverimage),
          })
            .then((res) => res.json())
            .then((data) => console.log("Done", data));
        }
      })
      .catch((e) => {
        console.log(e);
        window.alert(e);
        Setisloading(false);
      });
  };
  // const data = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     username: "@johndoe",
  //     post: "Just enjoying a peaceful walk in the park. #Nature",
  //     profilePhoto:
  //       "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?crop=faces&fit=crop&w=50&h=50",
  //     photo:
  //       "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?crop=entropy&cs=tinysrgb&fit=max&w=600&h=300",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     username: "@janesmith",
  //     post: "Excited to launch my new blog! Check it out. #BlogLife",
  //     profilePhoto:
  //       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=faces&fit=crop&w=50&h=50",
  //     photo:
  //       "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?crop=entropy&cs=tinysrgb&fit=max&w=600",
  //   },
  //   {
  //     id: 3,
  //     name: "Mike Johnson",
  //     username: "@mikejohnson",
  //     post: "The sunset today was breathtaking. #Photography",
  //     profilePhoto:
  //       "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?crop=faces&fit=crop&w=50&h=50",
  //     photo:
  //       "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?crop=entropy&cs=tinysrgb&fit=max&w=600",
  //   },
  //   {
  //     id: 4,
  //     name: "Emily Davis",
  //     username: "@emilydavis",
  //     post: "When life gives you lemons, make lemonade! 🍋",
  //     profilePhoto:
  //       "https://images.unsplash.com/photo-1554151228-14d9def656e4?crop=faces&fit=crop&w=50&h=50",
  //     photo:
  //       "https://images.unsplash.com/photo-1560807707-8cc77767d783?crop=entropy&cs=tinysrgb&fit=max&w=600",
  //   },
  // ];
  // useEffect(() => {
  //   Setpost(data);
  // }, []);

  return (
    <div className="h-screen here overflow-hidden overflow-y-auto">
      <Editprofile
        open={open}
        Setopen={Setopen}
        user={user}
        loggedInUser={loggedInUser}
      />
      <div className="flex justify-start items-center gap-7 w-full border-b-[1px] px-4 py-1 pb-1">
        <div onClick={() => navigate("/")}>
          <Arrowback />
        </div>
        <div className="flex flex-col justify-start items-start p-0">
          <h1 className="font-bold text-lg">Coderado</h1>
          <p className="text-slate-500 text-xs -mt-1">0 post</p>
        </div>
      </div>
      {/* cover image */}
      <div className="w-full">
        <div className="w-full h-32 bg-slate-300 overflow-hidden relative">
          <img
            src={loggedInUser[0]?.coverimage ? loggedInUser[0].coverimage : user && user.photoURL}
            className="h-auto w-full z-0"
          />
          <div className="w-full h-full flex justify-center items-center z-10 absolute top-0 left-0 bg-transparent text-transparent">
            <ion-icon name="scan-outline"></ion-icon>
          <label htmlFor="file" className="w-full h-full text-2xl absolute"></label>
          </div>
        
          <input
            type="file"
            hidden
            id="file"
            onChange={handluploadcoverimage}
          />
        </div>
        <div className="flex justify-end items-center pt-4 px-4 relative">
          <div className="border-4 border-white h-20 w-20 bg-sky-500 rounded-full absolute left-4 -top-10 overflow-hidden">
            <img
              className="h-full w-full"
              src={
                user.photoURL
                  ? user.photoURL
                  : "https://wallpapers.com/images/hd/tanjiro-pictures-d95tyjljedvuafjf.jpg"
              }
            />
          </div>
          <p
            onClick={() => Setopen((prev) => !prev)}
            className="font-bold text-lg border p-1 px-3 rounded-full hover:bg-slate-100 cursor-pointer"
          >
            Edit profile
          </p>
        </div>
      </div>
      {/* info */}
      <div className="w-full flex flex-col gap-3 px-4">
        <div className="flex flex-col justify-start items-start">
          <h1 className="font-bold text-2xl">{user.displayName}</h1>
          <p className="text-sm text-slate-500">@{user.displayName}</p>
        </div>
        <p>{loggedInUser[0]?.bio ? loggedInUser[0].bio : "bio.."}</p>
        <div className="text-slate-400 flex flex-col md:flex-row md:gap-2">
          <div className="flex items-center text-slate-500">
            <ion-icon name="location-outline"></ion-icon>
            <p>
              {loggedInUser[0]?.location
                ? loggedInUser[0].location
                : "Location"}
            </p>
          </div>
          <div className="flex items-center text-slate-500">
            <div className="-rotate-45">
              <ion-icon name="link-outline"></ion-icon>
            </div>
            <a
              href={`${
                loggedInUser[0]?.website ? loggedInUser[0].website : "https://"
              }`}
              className="text-sky-500"
            >{`${
              loggedInUser[0]?.website ? loggedInUser[0].website : "Website"
            }`}</a>
          </div>
          <div className="flex items-center gap-[1px] text-slate-500">
            <ion-icon name="calendar-outline"></ion-icon>
            <p>{loggedInUser[0]?.joined ? loggedInUser[0].joined : "joined"}</p>
          </div>
        </div>
      </div>
      <div className="mt-5 px-2">
        <h1 className="font-bold text-2xl px-2">Tweets</h1>
        {post.map((p) => (
          <Posts key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}

export default Mainprofile;
