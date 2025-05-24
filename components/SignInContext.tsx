import React, { createContext, useState } from "react";

export const SignInContext = createContext({
  isSignedIn: false,
  userAvatar: "",
  handleSignInSuccess: (avatarUrl: string) => {},
});

export const SignInProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userAvatar, setUserAvatar] = useState("");

  const handleSignInSuccess = (avatarUrl: string) => {
    setIsSignedIn(true);
    setUserAvatar(avatarUrl);
  };

  return (
    <SignInContext.Provider value={{ isSignedIn, userAvatar, handleSignInSuccess }}>
      {children}
    </SignInContext.Provider>
  );
};
