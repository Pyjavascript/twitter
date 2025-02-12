import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Editprofile from "./Editprofile";
import Posts from "../Home/DataHome/Posts";
import Arrowback from "../icons/Arrowback";
import axios from "axios";
import useLoggedinuser from "../../hooks/useLoggedinuser";

function Mainprofile({ user }) {
  const navigate = useNavigate();
  const [isloading, Setisloading] = useState(true);
  const [loggedInUser] = useLoggedinuser();
  const [open, Setopen] = useState(false);
  const [post, Setpost] = useState([]);
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://twitter-jfq3.onrender.com/userpost?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          Setpost(data);
          Setisloading(false);
        })
        .catch((err) => {
          console.error("Error fetching posts:", err);
          Setisloading(false);
        });
    } else {
      Setisloading(false);
    }
  }, [user?.email]);

  const handleObtainLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

          const nominatimURL = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

          try {
            const locationRes = await axios.get(nominatimURL);
            const address = locationRes.data.address;
            const city = address.city || address.town || address.village || "Unknown City";
            const state = address.state || "Unknown State";
            const country = address.country || "Unknown Country";

            setLocation({ city, state, country });

            const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=ba51aa1d379a2d6159a84593c8d81ec9`;

            const weatherRes = await axios.get(weatherURL);
            setWeather(weatherRes.data);
          } catch (error) {
            console.error("Error fetching location/weather data:", error);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  if (isloading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="h-screen overflow-hidden overflow-y-auto">
      <Editprofile open={open} Setopen={Setopen} user={user} loggedInUser={loggedInUser} />

      <div className="flex justify-start items-center gap-7 w-full border-b-[1px] px-4 py-1 pb-1">
        <div onClick={() => navigate("/")}>
          <Arrowback />
        </div>
        <div className="flex flex-col justify-start items-start">
          <h1 className="font-bold text-lg">Coderado</h1>
          <p className="text-slate-500 text-xs -mt-1">{post.length} posts</p>
        </div>
      </div>

      <div className="w-full">
        <div className="w-full h-32 bg-slate-300 overflow-hidden relative">
          <img src={loggedInUser[0]?.coverimage || user?.photoURL} className="h-auto w-full z-0" />
        </div>
        <div className="flex justify-end items-center pt-4 px-4 relative">
          <div className="border-4 border-white h-20 w-20 bg-sky-500 rounded-full absolute left-4 -top-10 overflow-hidden">
            <img className="h-full w-full" src={user.photoURL || "https://wallpapers.com/images/hd/tanjiro-pictures-d95tyjljedvuafjf.jpg"} />
          </div>
          <p onClick={() => Setopen((prev) => !prev)} className="font-bold text-lg border p-1 px-3 rounded-full hover:bg-slate-100 cursor-pointer">
            Edit profile
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-3 px-4">
        <div className="flex flex-col justify-start items-start">
          <h1 className="font-bold text-2xl">{user.displayName}</h1>
          <p className="text-sm text-slate-500">@{user.displayName}</p>
        </div>
        <p>{loggedInUser[0]?.bio || "bio.."}</p>

        <div className="text-slate-400 flex flex-col md:flex-row md:gap-2">
          <button onClick={handleObtainLocation} className="bg-blue-500 text-white px-3 py-1 rounded-lg">
            Obtain Location
          </button>
          <div className="flex items-center text-slate-500">
            <ion-icon name="location-outline"></ion-icon>
            <p>{location ? `${location.city}, ${location.state}, ${location.country}` : "Location"}</p>
          </div>

          {weather && (
            <div className="text-slate-500 flex items-center">
              <ion-icon name="cloud-outline"></ion-icon>
              <p>{`${weather.weather[0].description}, ${weather.main.temp}°C`}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 px-2">
        <h1 className="font-bold text-2xl px-2">Tweets</h1>
        {post.map((p) => (
          <Posts key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}

export default Mainprofile;
