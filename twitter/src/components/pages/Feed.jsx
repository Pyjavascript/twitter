import {useState,useEffect} from 'react'
import Posts from '../Home/DataHome/Posts';
import TweetBox from '../Home/DataHome/TweetBox';
import { useUserAuth } from '../../context/userauth'
function Feed() {
  const [post,SetPost] = useState([])
  const {user} = useUserAuth()
  
  useEffect(() => {
    fetch('http://localhost:3000/post')
    .then(res => res.json())
    .then(data => {
      SetPost(data)
    })
  },[])

  const [sec,Setsec] = useState('you')
  const profileImage = user?.photoURL || user?.profileImage || "/avatar.png";

  return (
    <>
    <div className="sm:hidden flex justify-between p-2">
        <img
          src={profileImage}
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex items-center justify-end">
          <div className="text-[#419CF1] text-3xl p-2 px-4">
            <ion-icon name="logo-twitter"></ion-icon>
          </div>
          <p className="font-bold h-7 p-3 py-4 rounded-full  flex justify-center items-center bg-black text-white">
            Try Premium
          </p>
        </div>
      </div>
    <div className='h-screen overflow-hidden overflow-y-auto posts'>
      <div className='w-full flex justify-between border-b-[1px]'>
        <div className={`relative ${sec == 'you' ? 'text-black' : 'text-slate-400'} font-semibold py-3 w-1/2 h-full flex flex-col justify-center items-center hover:bg-slate-100 cursor-pointer`} onClick={() => Setsec("you")}>
          <p>For you</p>
          <div className={`${sec == 'you' ? 'block': 'hidden'} absolute rounded-full bottom-0 w-14 h-1 bg-[rgba(65,156,241,1)]`}>

          </div>
        </div>
        <div className={`relative ${sec == 'follow' ? 'text-black' : 'text-slate-400'} font-semibold py-3 w-1/2 h-full flex justify-center items-center hover:bg-slate-100 cursor-pointer`} onClick={() => Setsec("follow")}>
          <p>Following</p>
          <div className={`${sec == 'follow' ? 'block': 'hidden'} absolute rounded-full bottom-0 w-14 h-1 bg-[rgba(65,156,241,1)]`}>

          </div>
        </div>
      </div>
      <TweetBox />
      {post.map((p,i) => (
        <Posts key={i} p={p} />
      ))}
    </div>
    </>
  )
}

export default Feed