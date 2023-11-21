import Topbar from "@/components/Topbar/Topbar";
import Workspace from "@/components/Workspace/Workspace";
import { Problem } from "@/utils/Types/types";
import { problems } from "@/utils/problems";
import router from "next/router";

export default function Problem({params: {id}}: {params: {id: string}}) {
  const problem = problems[id];
  problem.handlerFunction = problem.handlerFunction.toString();
  return (
    <div>
      <Topbar problemPage />
      <Workspace problem={problem} />
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(problems).map((key) => ({
    params: { id: key },
  }));
}

// export async function getStaticProps({ params }: { params: { id: string } }) {
// 	const { id } = params;
// 	const problem = problems[id];

// 	if (!problem) {
// 		return {
// 			notFound: true,
// 		};
// 	}
// 	problem.handlerFunction = problem.handlerFunction.toString();
// 	return {
// 		props: {
// 			problem,
// 		},
// 	};
// }
