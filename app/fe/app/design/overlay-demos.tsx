"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Toaster, toast } from "@/components/ui/toast";

export function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>케이스 확대 열기</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Thready · 케이스 상세"
      >
        <div className="grid aspect-video place-items-center bg-surface-warm font-mono text-[10px] tracking-[0.08em] text-muted">
          MEDIA 16:9
        </div>
        <p className="m-0 text-sm text-fg-2">
          AI 콘텐츠 생성 backend 전면 재구축. service boundary 재설계와
          migration을 주도하고 이후 운영을 전담했습니다.
        </p>
        <span className="border-t border-border-soft pt-2.5 font-mono text-[10px] tracking-[0.06em] text-muted">
          ESC · backdrop 클릭 · × 로 닫힘 — 닫으면 focus 가 트리거로 복귀
        </span>
      </Modal>
    </>
  );
}

export function ToastDemo() {
  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() =>
            toast("이메일이 복사되었습니다 — marin.backend@gmail.com")
          }
        >
          success toast
        </Button>
        <Button
          onClick={() => toast("응답을 불러오지 못했습니다 — 다시 시도", "danger")}
        >
          danger toast
        </Button>
      </div>
      <Toaster />
    </>
  );
}
