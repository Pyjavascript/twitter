import React from "react";
import { TwitterTimelineEmbed, TwitterTweetEmbed } from "react-twitter-embed";

function Widget() {
  return (
    <div className="h-screen pt-2 p-3 flex flex-col gap-5 overflow-hidde border-l-[1px]">
      {/* Search Bar */}
      <div className="flex gap-2 justify-center items-center bg-slate-100 p-2 py-2 rounded-full pl-4">
        <div className="flex justify-center items-center text-2xl">
          <ion-icon name="search-outline"></ion-icon>
        </div>
        <input
          type="text"
          placeholder="Search Twitter"
          className="text-base w-full bg-transparent outline-none"
        />
      </div>

      {/* Twitter Embeds */}
      <div className="flex flex-col gap-1 pl-2 overflow-hidden">
        <h2 className="font-extrabold text-2xl">What's Happening</h2>
        
        {/* Embedded Tweet */}
        <TwitterTweetEmbed tweetId={"1816174440071241866"} />

        {/* Embedded Timeline */}
        <div className="overflow-hidden">
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="Valorant"
            options={{ height: 510, width: 340 }} // Match width to container
          />
        </div>
      </div>
    </div>
  );
}

export default Widget;
