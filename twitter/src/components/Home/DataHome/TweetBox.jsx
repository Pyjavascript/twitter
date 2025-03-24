import { useState, useEffect } from "react";
import ImgIco from "./icons/imgIco";
import axios from "axios";
import { useUserAuth } from "../../../context/userauth";
import { useTranslation } from "react-i18next";
import AudioRecorder from '../../pages/Audio/AudioRecorder'

function TweetBox() {
  const { t } = useTranslation();
  const [post, SetPost] = useState("");
  const [imgurl, Setimgurl] = useState("");
  const [isloading, Setisloading] = useState(false);
  const [canPost, SetcanPost] = useState(false);
  const [open, Setopen] = useState(false);
  const [following, Setfollowing] = useState( JSON.parse(localStorage.getItem("Following")) || []);
  const { user } = useUserAuth();
  const email = user?.email;
  const profileImage = user?.photoURL || user?.profileImage || "/avatar.png";
  let postCount;
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    const checkPostingEligibility = () => {
      const now = new Date();
      const ISTOffset = 5.5 * 60 * 60 * 1000;
      const istTime = new Date(now.getTime() + ISTOffset);
      const hours = istTime.getHours();
      const minutes = istTime.getMinutes();
      
      const todayDate = istTime.toISOString().split("T")[0]; // Extract YYYY-MM-DD
      const storedDate = localStorage.getItem("lastPostDate");
      
      localStorage.setItem("postCount", following.length > 10 ? 100 : following.length >= 2 ? 2 : 0);
      if (storedDate !== todayDate) {
        // Reset post count for a new day
        localStorage.setItem("lastPostDate", todayDate);
      }
  
      if (following.length >= 1) {
        SetcanPost(hours === 10 && minutes >= 0 && minutes <= 30);
      } else if (following.length > 10) {
        SetcanPost(hours === 10 && minutes >= 0 && minutes <= 30);
      } else if (following.length === 0) {
        SetcanPost(hours === 10 && minutes >= 0 && minutes <= 30);
      } else {
        SetcanPost(false);
      }
    };
  
    checkPostingEligibility();
  }, [following]);
  

  const requestNotificationPermission = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
        } else {
          console.log("Notification permission denied.");
        }
      });
    }
  };

  const checkTweetForKeywords = (text) => {
    const keywords = ["cricket", "science"];
    return keywords.some((keyword) => text.toLowerCase().includes(keyword));
  };

  const showNotification = (text) => {
    const notificationsEnabled = localStorage.getItem("notifications") === "enabled";
    
    if (notificationsEnabled && Notification.permission === "granted") {
      new Notification("New Tweet Alert!", {
        body: text,
        icon: "",
      });
      alert("New Tweet Alert: " + text);
    }
  };

  const handleuploadimag = (e) => {
    Setisloading(true);
    const img = e.target.files[0];
    const formData = new FormData();
    formData.set("image", img);
    axios
      .post(
        `https://api.imgbb.com/1/upload?key=98257fe3ec3403ba357fa7640e88fb49`,
        formData
      )
      .then((res) => {
        Setimgurl(res.data.data.display_url);
        Setisloading(false);
      })
      .catch((e) => console.log(e));
  };
  
  const handletweet = async (e) => {
    e.preventDefault();
    
    postCount = localStorage.getItem("postCount");
    postCount = Number(postCount);
    if(postCount){ //!postCount
      alert("Your post limit has been reached for today. Please try again tomorrow.");
    }else{
      if(canPost){ //!canPost
        alert("You can only post between 10:00 AM - 10:30 AM IST");
      }
      else{
        let tempName = "";
        let tempUsername = "";
  
        if (user?.providerData[0]?.providerId === "password") {
          const res = await fetch(`https://twitter-jfq3.onrender.com/api/loggedinuser?email=${email}`);
          const data = await res.json();
          tempName = data[0].displayName;
          tempUsername = data[0].username;
        } else {
          tempName = user?.displayName;
          tempUsername = email?.split("@")[0];
        }
  
        if (tempName) {
          const userpost = {
            profilephoto: profileImage,
            post: post,
            photo: imgurl,
            username: tempUsername,
            name: tempName,
            email: email,
            audioUrl: ""
          };
          console.log(userpost);
          
  
          Setimgurl("");
          SetPost("");
          localStorage.setItem("audioUrl", "");

          if (checkTweetForKeywords(post)) {
            showNotification(post);
          }
  
          fetch("https://twitter-jfq3.onrender.com/api/post", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(userpost),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
             if(postCount > 0){
              postCount = postCount - 1;
              localStorage.setItem("postCount", postCount);
              
             }
            });
        }
      }
    }
  };

  return (
    <div className="sm:block md:block border-b-[1px]">
      <form onSubmit={handletweet}>
        <div className="flex gap-2 p-2 pt-4">
          <div
            style={{
              backgroundImage: `url(${profileImage})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              borderRadius: "50%",
              width: "48px",
              height: "48px",
            }}
          ></div>
          <input
            className="text-lg outline-none"
            type="text"
            placeholder={t("tweetBox.placeholder")}
            onChange={(e) => SetPost(e.target.value)}
            value={post}
          />
        </div>

        <div className="flex justify-between items-end p-4 w-full">
          <div className="flex">
           <div className="flex gap-2 justify-between items-center">
           <label className="cursor-pointer" htmlFor="image">
              {isloading ? <p>{t('tweetBox.uploading')}</p> : <p>{imgurl ? "Image Uploaded" : <ImgIco />}</p>}
            </label>
            <div className="cursor-pointer text-sky-500 text-2xl" onClick={() => Setopen(true)} >
            <ion-icon name="mic-circle-outline"></ion-icon>
            </div>
           </div>
            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleuploadimag}
            />
          </div>
          <button
            type="submit"
            className="font-bold bg-[rgba(65,156,241,1)] text-white p-1 px-6 rounded-full"
          >
             {t('tweetBox.tweetButton')}
          </button>
        </div>
      </form>
        {
          open && <AudioRecorder email={email} isOpen={Setopen} />
        }
    </div>
  );
}

export default TweetBox; 