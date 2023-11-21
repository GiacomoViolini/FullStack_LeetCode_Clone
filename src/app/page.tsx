"use client";

import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";
import Topbar from "@/components/Topbar/Topbar";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const [inputs, setInputs] = useState({
    id: "",
    title: "",
    difficulty: "",
    category: "",
    link: "",
    order: 0,
    likes: 0,
    dislikes: 0,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await setDoc(doc(firestore, "problems", inputs.id), inputs);
    alert("done");
  };
  return (
    <main className="bg-dark-layer-2 min-h-screen">
      <Topbar />
      <div className="relative overflow-x-auto mx-auto px-6 py-5">
        {loading && (
          <div className="animate-pulse mx-auto max-w-[1200px] sm:w-7/12 w-full">
            {[...Array(10)].map((_, idx) => (
              <LoadingSkeleton key={idx} />
            ))}
          </div>
        )}
        <table className="text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto">
          {!loading && (
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b ">
            <tr>
              <th scope="col" className="px-1 py-3 w-0 font-medium">
                Status
              </th>
              <th scope="col" className="px-6 py-3 w-0 font-medium">
                Title
              </th>
              <th scope="col" className="px-6 py-3 w-0 font-medium">
                Difficulty
              </th>
              <th scope="col" className="px-6 py-3 w-0 font-medium">
                Category
              </th>
            </tr>
          </thead>
          )}
          <ProblemsTable setLoadingProblems={setLoading}/>
        </table>
      </div>
      {/* <form className="flex flex-col gap-3 p-6" onSubmit={handleSubmit}>
        <input onChange={handleInputChange} type="text" placeholder="id" name="id"/>
        <input onChange={handleInputChange} type="text" placeholder="title" name="title"/>
        <input onChange={handleInputChange} type="text" placeholder="difficulty" name="difficulty"/>
        <input onChange={handleInputChange} type="text" placeholder="category" name="category"/>
        <input onChange={handleInputChange} type="text" placeholder="link?" name="link"/>
        <input onChange={handleInputChange} type="number" placeholder="order" name="order"/>
        <button type="submit" className="bg-white">Submit</button>
      </form> */}
    </main>
  );
}

const LoadingSkeleton = () => {
  return (
    <div className="flex items-center space-x-12 mt-4 px-6">
      <div className="w-6 h-6 shrink-0 rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52  w-32  rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52  w-32 rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
