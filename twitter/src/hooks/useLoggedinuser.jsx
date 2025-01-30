import { useEffect, useState } from "react";
import { useUserAuth } from "../context/userauth";

function useLoggedinuser() {
  const { user } = useUserAuth();
  const email = user?.email;
  const [loggedinuser,Setloggedinuser] = useState({})
  useEffect(() => {
    fetch(`http://localhost:5000/loggedinuser?email=${email}`)
    .then((res) => res.json())
    .then(data => {
        Setloggedinuser(data)
    })
  },[email,loggedinuser])
  return [loggedinuser,Setloggedinuser]
}

export default useLoggedinuser;
