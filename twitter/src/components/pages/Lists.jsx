import React, { useEffect, useState } from "react";
import Arrowback from "../icons/Arrowback";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/userauth";

function Lists() {
  const { user } = useUserAuth();
  const [data, setData] = useState([]);
  const [following, setFollowing] = useState([]);

  const navigate = useNavigate();

  // Fetch users list
  useEffect(() => {
    fetch(`https://twitter-jfq3.onrender.com/api/user`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Load stored following list from localStorage ONCE when the component mounts
  useEffect(() => {
    const storedFollowing = JSON.parse(localStorage.getItem("Following"));
    if (Array.isArray(storedFollowing)) {
      setFollowing(storedFollowing);
    }
  }, []);

  // Update localStorage when following list changes
  useEffect(() => {
    if (following.length > 0) {
      localStorage.setItem("Following", JSON.stringify(following));
    }
  }, [following]);

  const handleFollow = (userId) => {
    if (!following.includes(userId)) {
      const updatedFollowing = [...following, userId];
      setFollowing(updatedFollowing);
      
      fetch("https://twitter-jfq3.onrender.com/api/updatefollow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          following: updatedFollowing, 
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Followed:", data));
    }
  };

  const handleUnfollow = (userId) => {
    const updatedFollowing = following.filter((id) => id !== userId);
    setFollowing(updatedFollowing);
  };

  return (
    <div className="h-full w-full p-4">
      <div className="flex justify-start gap-2">
        <div className="flex justify-center items-center" onClick={() => navigate("/")}>
          <Arrowback />
        </div>
        <h1 className="font-medium text-2xl">Public Space</h1>
      </div>
      <div className="w-full h-auto p-3 px-0 flex flex-col gap-2">
        {data
          .filter((item) => item.email !== user?.email)
          .map((item, ind) => (
            <div className="w-full bg-white p-[5px] flex items-center justify-between border rounded-xl" key={ind}>
              <div className="flex items-center gap-2">
                <div className="bg-black h-10 w-10 rounded-full"></div>
                <div>
                  <p className="text-sm">{item.displayName}</p>
                  <p className="w-32 md:w-auto overflow-y-hidden overflow-scroll pscroll">
                    {item.email}
                  </p>
                </div>
              </div>
              <button
                className={`text-white p-1 px-4 rounded-full ${
                  following.includes(item.email) ? "bg-black" : "bg-sky-500"
                }`}
                onClick={
                  following.includes(item.email)
                    ? () => handleUnfollow(item.email)
                    : () => handleFollow(item.email)
                }
              >
                {following.includes(item.email) ? "Following" : "Follow"}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Lists;
