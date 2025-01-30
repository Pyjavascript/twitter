import { useEffect, useState } from "react";
import { useUserAuth } from "../context/userauth";

function useLoggedinuser() {
  const { user } = useUserAuth();
  const email = user?.email;
  const [loggedinuser,Setloggedinuser] = useState({})
  useEffect(() => {
    fetch(`https://twitter-jfq3.onrender.com/loggedinuser?email=${email}`)
    .then((res) => res.json())
    .then(data => {
        Setloggedinuser(data)
    })
  },[email,loggedinuser])
  return [loggedinuser,Setloggedinuser]
}

export default useLoggedinuser;
