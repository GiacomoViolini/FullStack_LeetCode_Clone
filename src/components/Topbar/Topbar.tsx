"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import Logout from "../Buttons/Logout";
import { useSetRecoilState } from "recoil";
import { authModalAtom } from "@/atoms/authModalAtom";
import { BsList } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Timer from "../Timer/Timer";
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/Types/types";
import { usePathname, useRouter } from "next/navigation";

export default function Topbar({ problemPage }: { problemPage?: boolean }) {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalAtom);
  const router = useRouter();
  const path = usePathname();
  
  const handleProblemChange = (isForward: boolean) => {
    const { order } = problems[path.slice(1) as string] as Problem;
    const direction = isForward ? 1 : -1;
    const nextProblemOrder = order + direction;
    const nextProblemKey = Object.keys(problems).find(
      (key) => problems[key].order === nextProblemOrder
    );

    if (isForward && !nextProblemKey) {
      const firstProblemKey = Object.keys(problems).find(
        (key) => problems[key].order === 1
      );
      router.push(`/${firstProblemKey}`);
    } else if (!isForward && !nextProblemKey) {
      const lastProblemKey = Object.keys(problems).find(
        (key) => problems[key].order === Object.keys(problems).length
      );
      router.push(`/${lastProblemKey}`);
    } else {
      router.push(`/${nextProblemKey}`);
    }
  };

  return (
    <nav className="relative flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7">
      <div className="flex w-full items-center justify-between">
        <Link href="/" className="h-[22px] flex items-center">
          <Image
            src="/leetcode.png"
            alt="Logo"
            height={160}
            width={160}
            quality={100}
          />
        </Link>
        {problemPage && (
          <div className="flex items-center gap-4 flex-1" style={{"marginLeft": "30rem"}}>
            <div
              className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer"
              onClick={() => handleProblemChange(false)}
            >
              <FaChevronLeft />
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 font-medium max-w-[170px] text-dark-gray-8 cursor-pointer"
            >
              <div>
                <BsList />
              </div>
              <p>Problem List</p>
            </Link>
            <div
              className=" flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 h-8 w-8 cursor-pointer"
              onClick={() => handleProblemChange(true)}
            >
              <FaChevronRight />
            </div>
          </div>
        )}
        {!user && (
          <div className="flex items-center space-x-4 flex-1 justify-end">
            <Link
              href="/auth"
              onClick={() =>
                setAuthModalState((prev) => ({
                  ...prev,
                  isOpen: true,
                  type: "login",
                }))
              }
            >
              <button className="bg-dark-fill-3 py-1 px-2 cursor-pointer rounded ">
                Sign In
              </button>
            </Link>
          </div>
        )}
        {problemPage && user && <Timer />}
        {user && (
          <div className="group cursor-pointer relative ml-auto mr-4">
            <Image src={"/avatar.png"} width={39} height={39} alt={"Avatar"} />
            <div
              className="absolute top-12 left-2/4 -translate-x-2/4  mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg 
								z-40 group-hover:scale-100 scale-0 
								transition-all duration-300 ease-in-out"
            >
              <p className="text-sm">{user.email}</p>
            </div>
          </div>
        )}
        {user && <Logout />}
      </div>
    </nav>
  );
}
