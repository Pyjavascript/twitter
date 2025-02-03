import React, { useState } from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";

function Widget() {
  const [searchQuery, setSearchQuery] = useState("Valorant"); // Default search

  // Handle input change and replace spaces with underscores
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query.replace(/\s+/g, "_")); // Replace spaces with underscores
  };

  return (
    <div className="h-screen pt-2 p-3 flex flex-col gap-5 overflow-hidden border-l-[1px]">
      {/* Search Bar */}
      <div className="flex gap-2 justify-center items-center bg-slate-100 p-2 py-2 rounded-full pl-4">
        <div className="flex justify-center items-center text-2xl">
          <ion-icon name="search-outline"></ion-icon>
        </div>
        <input
          type="text"
          placeholder="Search Twitter"
          className="text-base w-full bg-transparent outline-none"
          value={searchQuery.replace(/_/g, " ")} // Display spaces as underscores in the input box
          onChange={handleSearchChange}
        />
      </div>

      {/* Twitter Timeline Embed based on search */}
      <div className="flex flex-col gap-1 pl-2 overflow-hidden">
        <h2 className="font-extrabold text-2xl">Search Results for "{searchQuery.replace(/_/g, " ")}"</h2>

        <div className="overflow-hidden">
          <TwitterTimelineEmbed
            key={searchQuery} // This forces a re-render when searchQuery changes
            sourceType="profile"
            screenName={searchQuery} // Dynamically update based on search (underscore replaced here)
            options={{ height: 510, width: 340 }}
          />
        </div>
      </div>
    </div>
  );
}

export default Widget;
