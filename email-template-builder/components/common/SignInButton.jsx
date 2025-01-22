"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "../ui/button";
import axios from "axios";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const SignInButton = () => {
  // Mutation to save user info to the convex database
  const createUser = useMutation(api.users.createUser);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        console.log("Google token response:", tokenResponse);

        // Fetch user info from Google API
        const userInfoResponse = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse?.access_token}` },
          }
        );
        const userInfo = userInfoResponse?.data;
        console.log("Google user info:", userInfo);

        // Save user info to the convex database
        const response = await createUser({
          name: userInfo?.name,
          email: userInfo?.email,
          picture: userInfo?.picture,
        });
        console.log("Convex createUser response:", response);

        // Prepare user details with Convex ID
        const userDetails = {
          ...userInfo,
          _id: response?._id || response, // Use response structure appropriately
        };

        // Save user info to the local storage
        if (typeof window !== "undefined") {
          localStorage.setItem("userDetail", JSON.stringify(userDetails));
          console.log("User details saved to localStorage:", userDetails);
        }
      } catch (error) {
        console.error("Error during Google login or Convex mutation:", error);
      }
    },
    onError: (errorResponse) =>
      console.error("Google login error:", errorResponse),
  });

  return (
    <div className="sign-in-button">
      <Button onClick={googleLogin}>Get Started</Button>
    </div>
  );
};

export default SignInButton;
