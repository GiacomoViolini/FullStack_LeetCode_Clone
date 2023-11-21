"use client"

import Navbar from "../../components/Navbar/Navbar";
import { useRecoilValue } from "recoil";
import { authModalAtom } from "@/atoms/authModalAtom";
import AuthModal from "@/components/Modals/AuthModal";
import { auth } from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function AuthPage() {
  const authModal = useRecoilValue(authModalAtom);
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) router.push("/");
    if(!loading && !user) setIsLoading(false);
  }, [user, loading, router]);

  if(isLoading) return null;

  return (
    <div className=" bg-dark-layer-1 h-screen relative overflow-hidden">
      <Navbar />
      <div className="flex-col">
        <div className="text-center w-4/12 mx-auto mt-36">
          <h2 className="text-5xl font-bold mb-8 text-gray-200">
            A New Way to learn
          </h2>
          <h3 className="text-lg font-medium text-gray-400">
            LeetCode is the best platform to help you enhance your skills,
            expand your knowledge and prepare for technical interviews.
          </h3>
        </div>
        <Image
          src="wave.svg"
          alt="wave"
          className=" pointer-events-none select-none"
          width={1920}
          height={300}
          priority
        />
        {authModal.isOpen && <AuthModal/>}
      </div>
    </div>
  );
}
