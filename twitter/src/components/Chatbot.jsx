import React, { useState } from "react";

function Chatbot() {
        const data =  [
            {
                "id": "1886421167315222992",
                "text": "RT @jaifrompanja: Nen cricket aadinapudu Ne Amma inka pedha manishi kuda kaledu \n\nNa joliki Raaku ra please",
                "edit_history_tweet_ids": [
                    "1886421167315222992"
                ]
            },
            {
                "id": "1886421162952950239",
                "text": "@zeeshan226216 Cricket",
                "edit_history_tweet_ids": [
                    "1886421162952950239"
                ]
            },
            {
                "id": "1886421153574781032",
                "text": "#INDvsENG: #JofraArcher's delivery fractures India star's finger, out of action for...\n\nhttps://t.co/pFAbjGUcIm",
                "edit_history_tweet_ids": [
                    "1886421153574781032"
                ]
            },
            {
                "id": "1886421151817273653",
                "text": "RT @AvunuMawa: 🗣️Question: Which team is the most dangerous in IPL?\n\nChris Gayle : Other teams play cricket, but SRH plays with destiny. Wh…",
                "edit_history_tweet_ids": [
                    "1886421151817273653"
                ]
            },
            {
                "id": "1886421150651072838",
                "text": "RT @AvunuMawa: 🗣️Question: Which team is the most dangerous in IPL?\n\nChris Gayle : Other teams play cricket, but SRH plays with destiny. Wh…",
                "edit_history_tweet_ids": [
                    "1886421150651072838"
                ]
            },
            {
                "id": "1886421139053834374",
                "text": "#BetwaySA20 and Cricket South Africa have agreed a competition window for the next three years #SSCricket\nhttps://t.co/tdQCeteJup",
                "edit_history_tweet_ids": [
                    "1886421139053834374"
                ]
            },
            {
                "id": "1886421134603592189",
                "text": "RT @AvunuMawa: 🗣️Question: Which team is the most dangerous in IPL?\n\nChris Gayle : Other teams play cricket, but SRH plays with destiny. Wh…",
                "edit_history_tweet_ids": [
                    "1886421134603592189"
                ]
            },
            {
                "id": "1886421120091340995",
                "text": "RT @ITGDsports: My ultimate dream is to see two women’s teams playing some gully sport and fully enjoying it: Smriti Mandhana \n\n#SmritiMand…",
                "edit_history_tweet_ids": [
                    "1886421120091340995"
                ]
            },
            {
                "id": "1886421104857870391",
                "text": "RT @ImtiazMadmood: The girl who was thrown in the dustbin as soon as she was born is today the captain of the Australian cricket team.\n\nThe…",
                "edit_history_tweet_ids": [
                    "1886421104857870391"
                ]
            },
            {
                "id": "1886421096846750076",
                "text": "@PKMKB_Troll Cricket is an irrelevant sport outside of South Asia 😂🤣",
                "edit_history_tweet_ids": [
                    "1886421096846750076"
                ]
            }
        ]
  const [searchQuery, setSearchQuery] = useState("");
  const [tweets, setTweets] = useState(data); // Initialize as an empty array

//   const fetchTweets = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/search-tweets?q=${searchQuery}`
//       );
//       const data = await response.json();
//       setTweets(data?.data || []); // Set tweets to an empty array if no data is returned
//     } catch (error) {
//       console.error("Error fetching tweets", error);
//       setTweets([]); // In case of error, set tweets to an empty array
//     }
//   };

  return (
    <div className="p-2 px-0 w-full h-full relative border-l border-1">
        <h1 className="font-bold text-3xl border-b py-[2px] px-5">Chatbot</h1>
      <div className="flex gap-2 px-5 py-2">
      <input
        type="text"
        placeholder="Search Twitter..."
        className="bg-gray-100 p-3 py-1 rounded-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="bg-[#3B82F6] px-3 rounded-full text-white">Search</button>
      </div>
      
      <div className="overflow-scroll flex flex-col gap-2 chatbot p-5">
        {tweets?.length > 0 ? (
          tweets.map((tweet) => (
           <>
           <div className="border p-2">
           <p key={tweet.id}>{tweet.text}</p><br/>
           </div>
           </>
          ))
        ) : (
          <p>No tweets found for this query.</p>
        )}
      </div>
    </div>
  );
}

export default Chatbot;
