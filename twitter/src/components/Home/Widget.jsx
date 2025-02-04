import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";

function Widget() {
  const [searchQuery, setSearchQuery] = useState("Technology"); // Default search topic

  useEffect(() => {
    // Load Twitter widget script dynamically
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // Reinitialize Twitter widget after searchQuery updates
    if (window.twttr && window.twttr.widgets) {
      window.twttr.widgets.load();
    }
  }, [searchQuery]); // Runs when searchQuery changes

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

      {/* Twitter Search Feed */}
      <div className="flex flex-col gap-1 pl-2 overflow-hidden">
        <h2 className="font-extrabold text-2xl">
          Search Results for "{searchQuery}"
        </h2>

        <div className="overflow-hidden">
          <a
            key={searchQuery} // Forces re-render when searchQuery changes
            className="twitter-timeline"
            data-height="510"
            data-width="340"
            href={`https://twitter.com/search?q=${encodeURIComponent(searchQuery)}&f=live`}
          >
            Loading tweets...
          </a>
        </div>
      </div>
    </div>
  );
}

export default Widget;
