"use client";

import { ChatHeader } from "@/components/chat-header";
import { Agent, Message } from "@prisma/client";

interface ChatClientProps {
  agent: Agent & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

export const ChatClient = ({ agent }: ChatClientProps) => {
  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <ChatHeader agent={agent} />
    </div>
  );
};
