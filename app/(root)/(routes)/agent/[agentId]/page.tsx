import prismadb from "@/lib/prismadb";
import { AgentForm } from "./components/agent-form";

interface AgentIdPageProps {
  params: {
    agentId: string;
  };
}

const AgentIdPage = async ({ params }: AgentIdPageProps) => {
  //TODO: Check subscription

  const agent = await prismadb.agent.findUnique({
    where: { id: params.agentId },
  });

  const categories = await prismadb.category.findMany();

  return <AgentForm initialData={agent} categories={categories} />;
};
export default AgentIdPage;
