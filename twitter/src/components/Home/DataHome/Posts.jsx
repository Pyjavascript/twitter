import React from "react";
import Tick from "./icons/Tick";
import Share from "./icons/Share";
import Like from "./icons/Like";
import Comment from "./icons/Comment";
import Save from "./icons/Save";
import Send from "./icons/Send";
import Views from "./icons/Views";

function Posts({ p }) {
  const { name, username, post, profilephoto, photo, id } = p;
  return (
    <div className="flex justify-start w-full cursor-pointer hover:bg-slate-50">
      <div className="p-2 px-2 flex justify-start gap-1 border-b-[1px]">
        <div className="w-10 h-10 sm:w-16 sm:h-16 lg:w-10 lg:h-10">
          <img
            src={profilephoto}
            className="rounded-full w-full object-cover"
            alt="Profile"
          />
        </div>
        <div className="flex flex-col justify-start w-full">
          <div className="flex gap-2">
            <div className="flex items-center">
              <h2 className="font-bold">{name}</h2>
              <Tick />
            </div>
            <p className="text-slate-400">{username}</p>
          </div>
          <div className="w-4/4 md:w-full flex flex-col gap-2">
            <p>{post}</p>
            <img src={photo} className="w-full rounded-xl object-contain" />
          </div>
          <div className="w-full flex justify-between p-0 md:p-2">
            <div className="hover:bg-sky-50 p-3 rounded-full">
              <Comment />
            </div>
            <div className="hover:bg-green-50 p-3 rounded-full">
              <Share />
            </div>
            <div className="hover:bg-red-50 p-3 rounded-full">
              <Like />
            </div>
            <div className="hover:bg-sky-100 p-3 rounded-full">
              <Views />
            </div>
            <div className="flex">
              <div className="hover:bg-sky-100 p-3 rounded-full">
                <Save />
              </div>
              <div className="hover:bg-sky-100 p-3 rounded-full">
                <Send />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
