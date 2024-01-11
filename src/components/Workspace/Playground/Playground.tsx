"use client";

import { useEffect, useState } from "react";
import Split from "react-split";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "./EditorFooter/EditorFooter";
import { Problem } from "@/utils/Types/types";
import { auth, firestore } from "@/firebase/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { usePathname } from "next/navigation";
import { problems } from "@/utils/problems";
import useLocalStorage from "@/hooks/useLocalStorage";

interface PlaygroundProps {
  problem: Problem;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setSolved: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ISettings {
  fontSize: string;
  settingsModalIsOpen: boolean;
  dropdownIsOpen: boolean;
}

export default function Playground({
  problem,
  setSuccess,
  setSolved,
}: PlaygroundProps) {
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
  const [userCode, setUserCode] = useState<string>(problem.starterCode);
  const [user] = useAuthState(auth);
  let path = usePathname();
  path = path.slice(1);
  console.log(path);

  const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");

  const [settings, setSettings] = useState<ISettings>({
    fontSize: fontSize,
    settingsModalIsOpen: false,
    dropdownIsOpen: false,
  });

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please login to submit your code", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
    try {
      setUserCode(
        userCode.slice(userCode.indexOf(problem.starterFunctionName))
      );
      const cb = new Function(`return ${userCode}`)();
      const handler = problems[path as string].handlerFunction;

      if (typeof handler == "function") {
        const success = handler(cb);
        console.log(success);
        if (success) {
          console.log("success");
          toast.success("Congrats! All tests passed!", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
          });
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 4000);

          const userRef = doc(firestore, "users", user.uid);
          await updateDoc(userRef, {
            solvedProblems: arrayUnion(path),
          });
          setSolved(true);
        }
      }
    } catch (error: any) {
      console.log(error.message);
      if (
        error.message.startsWith(
          "AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:"
        )
      ) {
        toast.error("Oops! One or more test cases failed", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      } else {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      }
    }
  };

  useEffect(() => {
    const code = localStorage.getItem(`code-${path}`);
    if (user) {
      setUserCode(code ? JSON.parse(code) : problem.starterCode);
    } else {
      setUserCode(problem.starterCode);
    }
  }, [path, user, problem.starterCode]);

  const handleChange = (value: string) => {
    setUserCode(value);
    localStorage.setItem(`code-${path}`, JSON.stringify(value));
  };
  return (
    <div className="flex flex-col bg-dark-layer-1 relative overflow-x-hidden">
      <PreferenceNav settings={settings} setSettings={setSettings} />
      <Split
        className="h-[calc(100vh-94px)]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
      >
        <div className="w-full overflow-auto">
          <CodeMirror
            value={userCode}
            theme={vscodeDark}
            extensions={[javascript()]}
            style={{ fontSize: settings.fontSize }}
            onChange={handleChange}
          />
        </div>
        <div className="w-full px-5 overflow-auto">
          <div className="flex h-10 items-center space-x-6">
            <div className="relative flex h-full flex-col justify-center cursor-pointer">
              <div className="text-sm font-medium leading-5 text-white">
                Testcases
              </div>
              <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white"></hr>
            </div>
          </div>
          <div className="flex">
            {problem.examples.map((example, index) => (
              <div
                className="mr-2 items-start mt-2 "
                key={example.id}
                onClick={() => setActiveTestCaseId(index)}
              >
                <div className="flex flex-wrap items-center gap-y-4">
                  <div
                    className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
										${activeTestCaseId === index ? "text-white" : "text-gray-500"}
									`}
                  >
                    Case {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="font-semibold my-4">
            <p className="text-sm font-medium mt-4 text-white">Input:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
              {problem.examples[activeTestCaseId].inputText}
            </div>
            <p className="text-sm font-medium mt-4 text-white">Output:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
              {problem.examples[activeTestCaseId].outputText}
            </div>
          </div>
          <EditorFooter handleSubmit={handleSubmit} />
        </div>
      </Split>
    </div>
  );
}
