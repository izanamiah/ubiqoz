import prismadb from "@/lib/prismadb";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { agentId: string } }
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instruction, seed, categoryId } = body;

    if (!params.agentId) {
      return new NextResponse("Agent Id is required", { status: 400 });
    }

    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!src || !name || !description || !instruction || !seed || !categoryId) {
      return new NextResponse("Missing Required Fields", { status: 400 });
    }

    //TODO: check for subscription

    const agent = await prismadb.agent.update({
      where: {
        id: params.agentId,
        userId: user.id,
      },
      data: {
        categoryId,
        userId: user.id,
        userName: user.firstName,
        src,
        name,
        description,
        instruction,
        seed,
      },
    });

    return NextResponse.json(agent);
  } catch (error) {
    console.log("[AGENT_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { agentId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const agent = await prismadb.agent.delete({
      where: {
        userId,
        id: params.agentId,
      },
    });
    return NextResponse.json(agent);
  } catch (error) {
    console.log("[AGENT_DELTE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
