"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useContext, useEffect, useState } from "react";
const Provider = ({ children }) => {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

  const [userDetail, setUserDetail] = useState(null);

  // check for user logged in or not
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storage = JSON.parse(localStorage.getItem("userDetail"));

      if (!storage?.email || !storage) {
        // redirect to home page
      } else {
        setUserDetail(storage);
      }
    }
  }, []);

  return (
    <ConvexProvider client={convex}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
          <div>{children}</div>
        </UserDetailContext.Provider>
      </GoogleOAuthProvider>
    </ConvexProvider>
  );
};

export default Provider;

export const userContext = () => {
  return useContext(UserDetailContext);
};