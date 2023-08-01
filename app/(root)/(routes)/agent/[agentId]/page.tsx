import prismadb from "@/lib/prismadb";
import { AgentForm } from "./components/agent-form";
import { auth, redirectToSignIn } from "@clerk/nextjs";

interface AgentIdPageProps {
  params: {
    agentId: string;
  };
}

const AgentIdPage = async ({ params }: AgentIdPageProps) => {
  const { userId } = auth();
  //TODO: Check subscription

  //auth guard
  if (!userId) {
    return redirectToSignIn();
  }

  const agent = await prismadb.agent.findUnique({
    where: { id: params.agentId, userId },
  });

  const categories = await prismadb.category.findMany();

  return <AgentForm initialData={agent} categories={categories} />;
};
export default AgentIdPage;
