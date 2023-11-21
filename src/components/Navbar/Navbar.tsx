import { authModalAtom } from "@/atoms/authModalAtom";
import Link from "next/link";
import { useSetRecoilState } from "recoil";

export default function Navbar() {
    const setAuthModal = useSetRecoilState(authModalAtom)
    const handleClick = () =>{
        setAuthModal(prev => ({...prev, isOpen:true}))
        console.log(authModalAtom)
    }
    return(
        <div className="flex justify-between sm:px-12 px-2 md:px-24 bg-dark-layer-2 border-gray-950 border-b-2">
            <Link href="/" className="flex items-end justify-center h-20">
                <img src="/leetcode.png" alt="LeetCode" className="h-20"/>
            </Link>
            <div className="flex items-center">
                <button className=" bg-brand-orange text-white px-3 py-2 sm:px-5 rounded-md text-md font-semibold border-2 border-transparent
                                    hover:text-brand-orange hover:bg-white hover:border-2 hover:border-brand-orange
                                    transition duration-300 ease-in-out"
                onClick={handleClick}>
                    Sign in
                </button>
            </div>
        </div>
    )
}