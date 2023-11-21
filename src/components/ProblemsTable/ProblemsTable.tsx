import Link from "next/link";
import { BsCheckCircle } from "react-icons/bs";
import { Problem } from "../../mockProblems/problems";
import { auth, firestore } from "@/firebase/firebase";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { DBProblem } from "@/utils/Types/types";
import { useAuthState } from "react-firebase-hooks/auth";

interface ProblemsTableProps {
  setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProblemsTable({
  setLoadingProblems,
}: ProblemsTableProps) {
  const problems = useGetProblems(setLoadingProblems);
  const solvedProblems = useGetSolvedProblems();
  return (
    <>
      <tbody className="text-white">
        {problems.map((problem, idx) => {
          const difficulyColor =
            problem.difficulty === "Easy"
              ? "text-dark-green-s"
              : problem.difficulty === "Medium"
              ? "text-dark-yellow"
              : "text-dark-pink";
          return (
            <tr
              className={`${idx % 2 == 1 ? "bg-dark-layer-1" : ""}`}
              key={problem.id}
            >
              <th className="px-2 py-4 font-medium whitespace-nowrap text-dark-green-s">
                { solvedProblems.includes(problem.id) && <BsCheckCircle fontSize={"18"} width="18" />}
              </th>
              <td className="px-6 py-4">
                {problem.link ? (
                  <Link
                    className="hover:text-blue-600 cursor-pointer"
                    href={problem.link}
                    target="_blank"
                  >
                    {problem.title}
                  </Link>
                ) : (
                  <Link
                    className="hover:text-blue-600 cursor-pointer"
                    href={`/${problem.id}`}
                  >
                    {problem.title}
                  </Link>
                )}
              </td>
              <td className={`px-6 py-4 ${difficulyColor}`}>
                {problem.difficulty}
              </td>
              <td className={"px-6 py-4"}>{problem.category}</td>
            </tr>
          );
        })}
      </tbody>
    </>
  );
}

function useGetProblems(
  setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>
) {
  const [problems, setProblems] = useState<DBProblem[]>([]);

  useEffect(() => {
    const getProblems = async () => {
      setLoadingProblems(true);
      const q = query(
        collection(firestore, "problems"),
        orderBy("order", "asc")
      );
      const querySnapshot = await getDocs(q);
      const tmp: DBProblem[] = [];
      querySnapshot.forEach((doc) => {
        tmp.push({ ...doc.data(), id: doc.id } as DBProblem);
      });
      setProblems(tmp);
      setLoadingProblems(false);
    };
    getProblems();
  }, [setLoadingProblems]);
  
  return problems;
}

function useGetSolvedProblems() {
	const [solvedProblems, setSolvedProblems] = useState<string[]>([]);
	const [user] = useAuthState(auth);

	useEffect(() => {
		const getSolvedProblems = async () => {
			const userRef = doc(firestore, "users", user!.uid);
			const userDoc = await getDoc(userRef);

			if (userDoc.exists()) {
				setSolvedProblems(userDoc.data().solvedProblems);
			}
		};

		if (user) getSolvedProblems();
		if (!user) setSolvedProblems([]);
	}, [user]);

	return solvedProblems;
}
