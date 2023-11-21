import { auth } from "@/firebase/firebase";
import { useEffect, useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import {toast} from "react-toastify";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await sendPasswordResetEmail(email);
    if (success)
      toast.success("Password reset email sent successfully", {
        position: "top-center",
        autoClose: 3000,
      });
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: "top-center", autoClose: 3000 });
    }
  }, [error]);

  return (
    <form
      className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8"
      onSubmit={handleReset}
    >
      <h3 className="text-2xl font-semibold text-center  text-white">
        Reset Password
      </h3>
      <p className="text-sm text-white ">
        Forgotten your password? Enter your e-mail address below, and we&apos;ll
        send you an e-mail allowing you to reset it.
      </p>
      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-gray-100"
        >
          Your email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-500 border-gray-600 placeholder-gray-700 text-white"
          placeholder="name@company.com"
        />
      </div>

      <button
        type="submit"
        className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                bg-orange-500 hover:bg-orange-600
                transition duration-300 ease-in-out`}
      >
        Reset Password
      </button>
    </form>
  );
}
