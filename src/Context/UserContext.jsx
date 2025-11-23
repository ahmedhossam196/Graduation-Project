import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props) {
  // useEffect(()=>{
  // if(localStorage.getItem("userToken")){

  //     setuserLogin(localStorage.getItem("userToken"))
  // }

  // } , [])

  const [userLogin, setuserLogin] = useState(localStorage.getItem("userToken"));
  const [userID, setuserID] = useState(null);
  return (
    <UserContext.Provider
      value={{ userLogin, setuserLogin, userID, setuserID }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
