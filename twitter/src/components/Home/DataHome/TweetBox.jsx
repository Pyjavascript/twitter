import { useState, useEffect } from "react";
import ImgIco from "./icons/imgIco";
import axios from "axios";
import { useUserAuth } from "../../../context/userauth";
import { useTranslation } from "react-i18next";

function TweetBox() {
  const { t } = useTranslation();
  const [post, SetPost] = useState("");
  const [imgurl, Setimgurl] = useState("");
  const [isloading, Setisloading] = useState(false);
  const [name, Setname] = useState("");
  const [username, Setusername] = useState("");
  const { user } = useUserAuth();
  const email = user?.email;
  const profileImage = user?.photoURL || user?.profileImage || "/avatar.png";

  useEffect(() => {
    requestNotificationPermission();
  }, []);

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
        icon: "/notification-icon.png", // You can add a custom icon
      });
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

    let tempName = "";
    let tempUsername = "";

    if (user?.providerData[0]?.providerId === "password") {
      const res = await fetch(`http://localhost:3000/api/loggedinuser?email=${email}`);
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
      };

      console.log(userpost);
      Setimgurl("");
      SetPost("");

      if (checkTweetForKeywords(post)) {
        showNotification(post);
      }

      fetch("http://localhost:3000/api/post", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userpost),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
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
            <label className="cursor-pointer" htmlFor="image">
              {isloading ? <p>{t('tweetBox.uploading')}</p> : <p>{imgurl ? "Image Uploaded" : <ImgIco />}</p>}
            </label>
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
    </div>
  );
}

export default TweetBox;