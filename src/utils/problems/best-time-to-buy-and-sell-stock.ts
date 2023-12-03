import assert from "assert";
import { Problem } from "../Types/types";

export const bestTimeToBuyAndSellStockHandler = (fn: any) => {
  try {
    const tests = [
      [7, 6, 4, 3, 1],
      [7, 1, 5, 3, 6, 4],
      [1, 2, 3],
    ];
    const answers = [0, 5, 2];
    for (let i = 0; i < tests.length; i++) {
      const result = fn(tests[i]);
      assert.equal(result, answers[i]);
    }
    return true;
  } catch (error: any) {
    console.log("Error from bestTimeToBuyAndSellStockHandler: ", error);
    throw new Error(error);
  }
};

const starterCodeBestTimeToBuyAndSellStock = `function bestTimeToBuyAndSellStock(nums) {
  // Write your code here
};`;

export const bestTimeToBuyAndSellStock: Problem = {
  id: "best-time-to-buy-and-sell-stock",
  title: "9. Best Time to Buy and Sell Stock",
  problemStatement: `<p class='mt-3'>
    You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>ith</code> day.
  </p>
    <p class='mt-3'>
    You want to maximize your profit by choosing a <strong>single day</strong> to buy one stock and choosing a <strong>different day in the future</strong> to sell that stock.
    </p>
    <p class='mt-3'>
    Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return <code>0</code>.
    </p>
  `,

  examples: [
    {
      id: 0,
      inputText: `prices = [7,1,5,3,6,4]`,
      outputText: `5`,
      explanation:
        "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5. Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.",
    },
    {
      id: 1,
      inputText: `prices = [7,6,4,3,1]`,
      outputText: `0`,
      explanation:
        "In this case, no transactions are done and the max profit = 0.",
    },
  ],
  constraints: `<li class='mt-2'><code>1 <= prices.length <= 10^5</code></li>
    <li class='mt-2'><code>0 <= prices[i] <= 10^4</code></li>`,
  starterCode: starterCodeBestTimeToBuyAndSellStock,
  handlerFunction: bestTimeToBuyAndSellStockHandler,
  starterFunctionName: "function bestTimeToBuyAndSellStock(",
  order: 9,
};
