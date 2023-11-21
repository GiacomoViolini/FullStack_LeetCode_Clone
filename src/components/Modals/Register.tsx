import { authModalAtom } from "@/atoms/authModalAtom";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { auth, firestore } from "@/firebase/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";

export default function Signup() {
  const setAuthModal = useSetRecoilState(authModalAtom);
  const [inputs, setInputs] = useState({ name: "", email: "", password: "" });
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  const handleClick = () => {
    setAuthModal((prev) => ({ ...prev, type: "login" }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      toast.loading("Creating Account...", {
        position: "top-center",
        toastId: "loadingToast",
      });
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!newUser) return;
      const userData = {
        uid: newUser.user.uid,
        email: newUser.user.email,
        displayName: inputs.name,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        likedProblems: [],
        dislikedProblems: [],
        solvedProblems: [],
        starredProblems: [],
      };
      await setDoc(doc(firestore, "users", newUser.user.uid), userData);
      router.push("/");
    } catch (e: any) {
      toast.error(e.message, { position: "top-center", autoClose: 3000 });
    } finally {
      toast.dismiss("loadingToast");
    }
  };

  useEffect(() => {
    if (error)
      toast.error(error.message, { position: "top-center", autoClose: 3000 });
  }, [error]);

  return (
    <form className="space-y-6 px-6 pb-4" onSubmit={handleRegister}>
      <h3 className="text-2xl font-semibold text-white text-center">
        Register
      </h3>
      <div>
        <label
          htmlFor="name"
          className="block text-md font-medium text-gray-100 mb-2"
        >
          Full Name
        </label>
        <input
          onChange={handleChange}
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className="
                      border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                      bg-gray-500 border-gray-600 placeholder-gray-700 text-white"
          placeholder="Bruce Wayne"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-md font-medium text-gray-100 mb-2"
        >
          Email address
        </label>
        <input
          onChange={handleChange}
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="
                      border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                      bg-gray-500 border-gray-600 placeholder-gray-700 text-white"
          placeholder="name@company.com"
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
          onChange={handleChange}
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="
                      border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                      bg-gray-500 border-gray-600 placeholder-gray-700 text-white"
          placeholder="*******"
        />
      </div>
      <button
        type="submit"
        className="w-full text-white font-medium rounded-lg
              text-sm px-5 py-2.5 text-center bg-orange-500 hover:bg-orange-600
              transition duration-300 ease-in-out"
      >
        {loading ? "Registering..." : "Register"}
      </button>
      <div className="text-sm font-medium text-gray-100">
        Already have an account?
        <a
          href="#"
          className="text-blue-700 ml-2 hover:underline"
          onClick={handleClick}
        >
          Log In
        </a>
      </div>
    </form>
  );
}
