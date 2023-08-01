"use client";

import { Agent } from "@prisma/client";
import { ChatMessage, ChatMessageProps } from "./chat-message";
import { ElementRef, useEffect, useRef, useState } from "react";

interface ChatMessagesProps {
  messages: ChatMessageProps[];
  isLoading: boolean;
  agent: Agent;
}

export const ChatMessages = ({
  messages = [],
  isLoading,
  agent,
}: ChatMessagesProps) => {
  const scrollRef = useRef<ElementRef<"div">>(null);

  //UX optimization
  const [fakeLoading, setFakeLoading] = useState(
    messages.length === 0 ? true : false
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  //auto scroll to the latest message
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        isLoading={fakeLoading}
        src={agent.src}
        role="system"
        content={`Hello, I am ${agent.name}, ${agent.description}`}
      />
      {messages.map((message) => (
        <ChatMessage
          key={message.content}
          role={message.role}
          content={message.content}
          src={agent.src}
        />
      ))}
      {isLoading && <ChatMessage role="system" src={agent.src} isLoading />}
      <div ref={scrollRef} />
    </div>
  );
};
