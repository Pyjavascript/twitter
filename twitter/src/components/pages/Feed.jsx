import {useState,useEffect} from 'react'
import Posts from '../Home/DataHome/Posts';
import TweetBox from '../Home/DataHome/TweetBox';
function Feed() {
  const [post,SetPost] = useState([])
  useEffect(() => {
    fetch('https://twitter-jfq3.onrender.com/post')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      
      SetPost(data)
    })
  },[post])
  // const data = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     username: "@johndoe",
  //     post: "Just enjoying a peaceful walk in the park. #Nature",
  //     profilePhoto: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?crop=faces&fit=crop&w=50&h=50",
  //     photo: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?crop=entropy&cs=tinysrgb&fit=max&w=600&h=300",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     username: "@janesmith",
  //     post: "Excited to launch my new blog! Check it out. #BlogLife",
  //     profilePhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=faces&fit=crop&w=50&h=50",
  //     photo: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?crop=entropy&cs=tinysrgb&fit=max&w=600",
  //   },
  //   {
  //     id: 3,
  //     name: "Mike Johnson",
  //     username: "@mikejohnson",
  //     post: "The sunset today was breathtaking. #Photography",
  //     profilePhoto: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?crop=faces&fit=crop&w=50&h=50",
  //     photo: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?crop=entropy&cs=tinysrgb&fit=max&w=600",
  //   },
  //   {
  //     id: 4,
  //     name: "Emily Davis",
  //     username: "@emilydavis",
  //     post: "When life gives you lemons, make lemonade! 🍋",
  //     profilePhoto: "https://images.unsplash.com/photo-1554151228-14d9def656e4?crop=faces&fit=crop&w=50&h=50",
  //     photo: "https://images.unsplash.com/photo-1560807707-8cc77767d783?crop=entropy&cs=tinysrgb&fit=max&w=600",
  //   },
  //   {
  //     id: 5,
  //     name: "Chris Brown",
  //     username: "@chrisbrown",
  //     post: "Exploring the mountains is always a great adventure. #Hiking",
  //     profilePhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=faces&fit=crop&w=50&h=50",
  //     photo: "https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=max&w=600",
  //   },
  //   {
  //     id: 6,
  //     name: "Sophia Martinez",
  //     username: "@sophiamartinez",
  //     post: "Loving the new art exhibit downtown. 🎨",
  //     profilePhoto: "https://images.unsplash.com/photo-1554151228-14d9def656e4?crop=faces&fit=crop&w=50&h=50",
  //     photo: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?crop=entropy&cs=tinysrgb&fit=max&w=600",
  //   },
  //   {
  //     id: 7,
  //     name: "David Wilson",
  //     username: "@davidwilson",
  //     post: "Cooked a new recipe today, and it turned out amazing! 🍴",
  //     profilePhoto: "https://images.unsplash.com/photo-1524503033411-c9566986fc8f?crop=faces&fit=crop&w=50&h=50",
  //     photo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&w=600",
  //   },
  //   {
  //     id: 8,
  //     name: "Mia Taylor",
  //     username: "@miataylor",
  //     post: "Coffee is my best friend during long work hours. ☕",
  //     profilePhoto: "https://images.unsplash.com/photo-1524503033411-c9566986fc8f?crop=faces&fit=crop&w=50&h=50",
  //     photo: "https://images.unsplash.com/photo-1505685296765-3a2736de412f?crop=entropy&cs=tinysrgb&fit=max&w=600",
  //   },
  //   {
  //     id: 9,
  //     name: "James Anderson",
  //     username: "@jamesanderson",
  //     post: "Feeling grateful for all the small things in life. 🙏",
  //     profilePhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=faces&fit=crop&w=50&h=50",
  //     photo: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?crop=entropy&cs=tinysrgb&fit=max&w=600",
  //   },
  //   {
  //     id: 10,
  //     name: "Isabella Moore",
  //     username: "@isabellamoore",
  //     post: "Had a blast at the music festival this weekend! 🎶",
  //     profilePhoto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?crop=faces&fit=crop&w=50&h=50",
  //     photo: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?crop=entropy&cs=tinysrgb&fit=max&w=600",
  //   },
  // ];
  // useEffect(() => {
  //   SetPost(data);
  // }, []);
  const [sec,Setsec] = useState('you')
  const profileImage =
  "https://wallpapers.com/images/hd/tanjiro-pictures-d95tyjljedvuafjf.jpg";

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
      {post.map((p) => (
        <Posts key={p.id} p={p} />
      ))}
    </div>
    </>
  )
}

export default Feed