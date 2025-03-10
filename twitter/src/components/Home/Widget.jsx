import React, { useState } from "react";

function Widget() {
  const [query, setQuery] = useState("");
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTweets = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/searchTweets?q=${query}`);
      const data = await response.json();
      setTweets(data.tweets);
    } catch (error) {
      console.error("Error fetching tweets:", error);
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

      <div className="tweets-list mt-4 space-y-4">
        {tweets.map((tweet, index) => (
          <div key={index} className="border p-3 rounded">
            <p className="text-sm text-gray-700">{tweet.text}</p>
            <a
              href={`https://twitter.com/${tweet.user}/status/${tweet.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View on Twitter
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Widget;
