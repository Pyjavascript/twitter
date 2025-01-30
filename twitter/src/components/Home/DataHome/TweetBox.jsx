import { useState } from "react";
import ImgIco from "./icons/imgIco";
import axios from "axios";
import { useUserAuth } from "../../../context/userauth";
import useLoggedinuser from "../../../hooks/useLoggedinuser";
import { Profiler } from "react";

function TweetBox() {
  const [post, SetPost] = useState("");
  const [imgurl, Setimgurl] = useState("");
  const [isloading, Setisloading] = useState(false);
  const [name, Setname] = useState("");
  const [username, Setusername] = useState("");
  const { user } = useUserAuth();
  const [loggedinuser] = useLoggedinuser();
  const email = user?.email;
  const useprofilepic = loggedinuser[0]?.profileImage
    ? loggedinuser[0].profileImage
    : user && user.photoURL;
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
        console.log(res.data);
        Setisloading(false);
      })
      .catch((e) => console.log(e));
  };
  const handletweet = (e) => {
    e.preventDefault();
    if (user?.providerData[0]?.providerId === "password") {
      fetch(`https://twitter-jfq3.onrender.com/loggedinuser?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          Setname(data[0].name);
          Setusername(data[0].username);
        });
    } else {
      Setname(user?.displayName)
      Setusername(email?.split('@')[0])
    }
    if(name){
      const userpost = {
        profilephoto: useprofilepic,
        post:post,
        photo:imgurl,
        username:username,
        name: name,
        email: email
      }
      Setimgurl('')
      SetPost('')
      fetch('https://twitter-jfq3.onrender.com/post',{
        method:"POST",
        headers:{
          'content-type': 'application/json'
        },
        body:JSON.stringify(userpost),
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        
      })
    }
  };
  return (
    <div className="hidden sm:block md:block border-b-[1px]">
      <form onSubmit={handletweet}>
        <div className="flex gap-2 p-2 pt-4">
          <div
            style={{
              backgroundImage: `url(${useprofilepic})`,
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
            placeholder="What is happening?!"
            onChange={(e) => SetPost(e.target.value)}
            required
            value={post}
          />
        </div>

        <div className="flex justify-between items-end p-4 w-full">
          <div className="flex">
            <div>
              <label className="cursor-pointer" htmlFor="image">
                {isloading ? (
                  <p>Uploading image</p>
                ) : (
                  <p>{imgurl ? "Image Uploaded" : <ImgIco />}</p>
                )}
              </label>
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleuploadimag}
              />
            </div>
          </div>
          <button type="submit" className="font-bold bg-[rgba(65,156,241,1)] text-white p-1 px-6 rounded-full">
            Tweet
          </button>
        </div>
      </form>
    </div>
  );
}

export default TweetBox;
