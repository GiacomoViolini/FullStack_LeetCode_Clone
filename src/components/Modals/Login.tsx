import { authModalAtom } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/firebase";
import { useSetRecoilState } from "recoil";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Login() {
  const setAuthModal = useSetRecoilState(authModalAtom);
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [signInWithEmailAndPassword, user, loading, error] =useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleClick = (type: "login" | "register" | "forgotPassword") => {
    setAuthModal((prev) => ({ ...prev, type }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newUser = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser) return;
      router.push("/");
    } catch (e: any) {
      toast.error(e.message,{position:"top-center",autoClose:3000})
    }
  };

  useEffect(() => {
    if (error) toast.error(error.message,{position:"top-center",autoClose:3000})
  }, [error]);

  return (
    <form className="space-y-6 px-6 pb-4" onSubmit={handleLogin}>
      <h3 className="text-2xl font-semibold text-white text-center">Sign in</h3>
      <div>
        <label
          htmlFor="email"
          className="block text-md font-medium text-gray-100 mb-2"
        >
          Email address
        </label>
        <input
          onChange={handleInputChange}
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="
                    border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    bg-gray-500 border-gray-600 placeholder-gray-100 text-white"
          placeholder="brucewayne@batcave.com"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-md font-medium text-gray-100 mb-2"
        >
          Password
        </label>
        <input
          onChange={handleInputChange}
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="
                    border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    bg-gray-500 border-gray-600 placeholder-gray-100 text-white"
          placeholder="*******"
        />
      </div>
      <button
        type="submit"
        className="w-full text-white font-medium rounded-lg
            text-sm px-5 py-2.5 text-center bg-orange-500 hover:bg-orange-600
            transition duration-300 ease-in-out"
      >
        {loading ? "Loading..." : "Log in"}
      </button>
      <button
        className="flex w-full justify-end"
        onClick={() => handleClick("forgotPassword")}
      >
        <a
          href="#"
          className="text-sm text-gray-100 hover:underline w-full text-right"
        >
          Forgot password?
        </a>
      </button>
      <div className="text-sm font-medium text-gray-100">
        Not Registered?
        <a
          href="#"
          className="text-blue-700 ml-2 hover:underline"
          onClick={() => handleClick("register")}
        >
          Create account
        </a>
      </div>
    </form>
  );
}
