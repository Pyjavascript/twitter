import React, { useState, useEffect, useRef } from "react";

function Widget() {
  const [searchQuery, setSearchQuery] = useState("Valorant");
  const [TwitterTimelineEmbed, setTwitterTimelineEmbed] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    import("react-twitter-embed").then((module) => {
      setTwitterTimelineEmbed(() => module.TwitterTimelineEmbed);
    });
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query.replace(/\s+/g, "_"));
  };

  return (
    <div className="h-screen pt-2 p-3 flex flex-col gap-5 overflow-hidden border-l-[1px]">
      <div className="flex gap-2 justify-center items-center bg-slate-100 p-2 py-2 rounded-full pl-4">
        <div className="flex justify-center items-center text-2xl">
          <ion-icon name="search-outline"></ion-icon>
        </div>
        <input
          type="text"
          placeholder="Search Twitter"
          className="text-base w-full bg-transparent outline-none"
          value={searchQuery.replace(/_/g, " ")}
          onChange={handleSearchChange}
        />
      </div>

      <div className="flex flex-col gap-1 pl-2 overflow-hidden">
        <h2 className="font-extrabold text-2xl">Search Results for "{searchQuery.replace(/_/g, " ")}"</h2>

        {TwitterTimelineEmbed ? (
          <div className="overflow-hidden" ref={ref}>
            <TwitterTimelineEmbed
              key={searchQuery}
              sourceType="profile"
              screenName={searchQuery}
              options={{ height: 510, width: 340 }}
            />
          </div>
        ) : (
          <p>Loading Twitter feed...</p>
        )}
      </div>
    </div>
  );
}

export default Widget;
