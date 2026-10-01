import type { Metadata } from "next";
import { CareerDocument } from "../_components/documents/career/career-document";

export const metadata: Metadata = {
  title: "경력기술서 — 김대정",
  description: "제품 판단을 운영 가능한 Backend와 AI 기능으로 연결해 온 김대정의 경력기술서",

};

export default function CareerPage() {
  return <CareerDocument />;
}
