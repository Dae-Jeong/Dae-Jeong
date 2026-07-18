import type { Metadata } from "next";
import { TopBar } from "@/components/site/topbar";
import { ChatView } from "./chat-view";

export const metadata: Metadata = {
  title: "Chat — 김대정 프로필과 대화",
  description:
    "검증된 claim registry의 public 표현만 사용해 답하는 프로필 에이전트 (Phase 2 프리뷰)",
};

export default function ChatPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar variant="subpage" crumb="Chat · 프로필과 대화" tag="PHASE 2 PREVIEW" />
      <ChatView />
    </div>
  );
}
