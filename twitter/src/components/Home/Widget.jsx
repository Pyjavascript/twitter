import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import TweetEmbed from 'react-tweet-embed';

function Widget() {
  const [searchQuery, setSearchQuery] = useState("Valorant");

  const handleSearch = (e) => {
    e.preventDefault();
    // Add your search logic here
  };

  return (
    <div className="h-screen pt-2 p-3 flex flex-col gap-5 overflow-hidden border-l-[1px]">
      {/* Search Bar */}
      <div className="sticky top-0 bg-white">
        <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-full">
          <BiSearch className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search Twitter"
            className="bg-transparent flex-1 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Twitter Timeline Embed based on search */}
      <div className="flex flex-col gap-1 pl-2 overflow-hidden">
        <h2 className="font-extrabold text-2xl">
          Search Results for "{searchQuery.replace(/_/g, " ")}"
        </h2>

        <div className="overflow-hidden">
          <TweetEmbed
            id='1234567890' // Replace with the tweet ID you want to embed
            options={{ height: 510, width: 340 }}
          />
        </div>
      </div>

      {/* What's happening section */}
      <div className="flex flex-col gap-3 bg-gray-50 rounded-xl pt-2 pb-4">
        <h2 className="font-bold text-xl px-4">What's happening</h2>
        
        {/* You can add trending topics or news items here */}
        <div className="hover:bg-gray-100 p-4 transition duration-200">
          <h3 className="font-bold">Trending Topic #1</h3>
          <p className="text-gray-500 text-sm">50.4K Tweets</p>
        </div>

        <div className="hover:bg-gray-100 p-4 transition duration-200">
          <h3 className="font-bold">Trending Topic #2</h3>
          <p className="text-gray-500 text-sm">40.2K Tweets</p>
        </div>

        <div className="hover:bg-gray-100 p-4 transition duration-200">
          <h3 className="font-bold">Trending Topic #3</h3>
          <p className="text-gray-500 text-sm">30.1K Tweets</p>
        </div>
      </div>

      {/* Who to follow section */}
      <div className="flex flex-col gap-3 bg-gray-50 rounded-xl pt-2 pb-4">
        <h2 className="font-bold text-xl px-4">Who to follow</h2>
        
        {/* You can add suggested users to follow here */}
        <div className="hover:bg-gray-100 p-4 transition duration-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div>
              <h3 className="font-bold">User Name</h3>
              <p className="text-gray-500 text-sm">@username</p>
            </div>
          </div>
          <button className="bg-black text-white rounded-full px-4 py-1.5 text-sm font-bold">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
}

export default Widget;