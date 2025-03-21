import React, { useState } from "react";

function Widget() {
  const [query, setQuery] = useState("");
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTweets = async () => {
    setLoading(true);
    setTweets([]); // Clear old results
    try {
      const response = await fetch(`http://https://twitter-jfq3.onrender.com/searchTweets?q=${query}`);
      const data = await response.json();
  
      if (data.error) {
        console.error("Error:", data.error);
        setTweets([]); // No results found
      } else {
        setTweets(data.tweets || []);
      }
    } catch (error) {
      console.error("Error fetching tweets:", error);
      setTweets([]); // Prevent stale data
    }
    setLoading(false);
  };
  

  return (
    <div className="chatbot-container p-4 h-screen overflow-scroll">
      <h2 className="text-xl font-bold">Ask the Chatbot!</h2>
      <div className="flex gap-2 my-2">
        <input
          type="text"
          placeholder="Ask about cricket, tech, etc."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 flex-1"
        />
        <button
          onClick={fetchTweets}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading tweets...</p>}

      {tweets.map((tweet, index) => (
  <div key={index} className="border p-3 rounded">
    <p className="text-sm text-gray-700">{tweet.text}</p>
    <a
      href={`https://twitter.com/i/web/status/${tweet.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 underline"
    >
      View on Twitter
    </a>
  </div>
))}

    </div>
  );
}

export default Widget;
