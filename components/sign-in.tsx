"use client";

import React, { useCallback, useMemo } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { FaRegUser } from "react-icons/fa";
import { useSignIn, useUser, SignOutButton, useClerk } from "@clerk/nextjs";
import { Input } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isLoaded: isSignInLoaded, signIn, setActive } = useSignIn();
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  // Improved sign-out handler
  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
      toast.success("Signed out successfully!", {
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
      // Optional: redirect to home or login page
      router.push('/');
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out", {
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
    }
  }, [signOut, router]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!isSignInLoaded) return;

      const formData = new FormData(e.target as HTMLFormElement);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      try {
        const result = await signIn.create({
          identifier: email,
          password: password,
        });

        if (result.status === "complete") {
          toast.success("Login Successful!", {
            style: { borderRadius: "10px", background: "#333", color: "#fff" },
          });
          await setActive({ session: result.createdSessionId });
          onOpenChange(); // Close the modal
        }
      } catch (err: any) {
        console.error(err.errors[0].message);
        toast.error(err.errors[0].message, {
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
      }
    },
    [isSignInLoaded, signIn, setActive, onOpenChange]
  );

  const AuthComponent = useMemo(() => {
    if (isSignedIn && user) {
      return (
        <Dropdown>
          <DropdownTrigger>
            <Avatar
              src={user.imageUrl}
              name={user.fullName || user.username || "User"}
              className="cursor-pointer"
            />
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem key="username" isReadOnly className="text-center">
              <p className="font-semibold">
                {user.fullName || user.username || "User"}
              </p>
            </DropdownItem>
            <DropdownItem 
              key="signout" 
              onClick={handleSignOut}
              className="text-danger text-center"
              color="danger"
            >
              Sign Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    }

    return (
      <Button
        color="primary"
        variant="flat"
        startContent={<FaRegUser />}
        onClick={onOpen}
      >
        Sign In
      </Button>
    );
  }, [isSignedIn, user, onOpen, handleSignOut]);

  return (
    <>
      {AuthComponent}
      <Toaster position="bottom-right" reverseOrder={false} />

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="pb-5">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center">
                Sign In to Exines Lab
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <Input
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    required
                  />
                  <Input
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    required
                  />
                  <Button color="primary" type="submit" fullWidth>
                    Sign In
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}