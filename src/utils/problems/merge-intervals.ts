import assert from "assert";
import { Problem } from "../Types/types";

export const mergeIntervalsHandler = (fn: any) => {
  try {
    const tests = [
      [
        [1, 3],
        [2, 6],
        [8, 10],
        [15, 18],
      ],
      [
        [1, 4],
        [4, 5],
      ],
    ];
    const answers = [
      [
        [1, 6],
        [8, 10],
        [15, 18],
      ],
      [[1, 5]],
    ];
    for (let i = 0; i < tests.length; i++) {
      const result = fn(tests[i]);
      assert.equal(result, answers[i]);
    }
    return true;
  } catch (error: any) {
    console.log("Error from mergeIntervalsHandler: ", error);
    throw new Error(error);
  }
};

const starterCodeMergeIntervalsJS = `function mergeIntervals(intervals) {
  // Write your code here
};`;

export const mergeIntervals: Problem = {
  id: "merge-intervals",
  title: "7. Merge Intervals",
  problemStatement: `<p class='mt-3'>
  Given an array of <code>intervals</code> where <code>intervals[i] = [starti, endi] </code>, merge all overlapping intervals,
   and return an array of the non-overlapping intervals that cover all the intervals in the input.
  </p>
  `,

  examples: [
    {
      id: 0,
      inputText: `intervals = [[1,3],[2,6],[8,10],[15,18]]`,
      outputText: `[[1,6],[8,10],[15,18]]`,
      explanation:
        "Since intervals [1,3] and [2,6] overlap, merge them into [1,6].",
    },
    {
      id: 1,
      inputText: `intervals = [[1,4],[4,5]]`,
      outputText: `[[1,5]]`,
      explanation:
        "Intervals [1,4] and [4,5] are considered overlapping.",
    },
  ],
  constraints: `<li class='mt-2'><code>1 <= intervals.length <= 10^4</code></li>
    <li class='mt-2'><code>intervals[i].length == 2</code></li>
    <li class='mt-2'><code>0 <= starti <= endi <= 10^4</code></li>`,
  starterCode: starterCodeMergeIntervalsJS,
  handlerFunction: mergeIntervalsHandler,
  starterFunctionName: "function containerWithMostWater(",
  order: 7,
};
