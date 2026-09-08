"use client";

import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import styles from "./compare.module.css";

type Template = "existing" | "classic";

export function CompareView({ existing, classic, sections }: { existing: ReactNode; classic: ReactNode; sections: string[] }) {
  const [selected, setSelected] = useState<Template>("classic");
  const [sideBySide, setSideBySide] = useState(true);
  const stage = useRef<HTMLDivElement>(null);

  function jumpTo(section: string) {
    stage.current?.querySelectorAll<HTMLElement>("[data-reader]").forEach((reader) => {
      const target = reader.querySelector<HTMLElement>(`[data-section="${section}"]`);
      const heading = section === "0" ? target : target?.querySelector("h2") ?? target;
      if (heading) reader.scrollTop += heading.getBoundingClientRect().top - reader.getBoundingClientRect().top - 28;
    });
  }

  return (
    <main className={styles.workspace} data-selected={selected} data-side-by-side={sideBySide}>
      <header className={styles.toolbar}>
        <div className={styles.topline}>
          <div><p className={styles.eyebrow}>RESUME / TEMPLATE STUDY</p><h1>내용은 그대로, 양식만 비교.</h1></div>
          <Link href="/common" className={styles.originalLink}>공용 문서로 ↗</Link>
        </div>
        <p className={styles.description}>새 성과 개편안 · 동일한 문장과 순서 · 고전안을 공용 이력서에 우선 적용했습니다. 배포 전 검토 화면입니다.</p>
        <div className={styles.controls}>
          <div className={styles.switcher} role="group" aria-label="이력서 양식 선택">
            <button type="button" aria-pressed={selected === "existing"} onClick={() => { setSelected("existing"); setSideBySide(false); }}>기존안</button>
            <button type="button" aria-pressed={selected === "classic"} onClick={() => { setSelected("classic"); setSideBySide(false); }}>고전 템플릿</button>
          </div>
          <label className={styles.parallel}><input type="checkbox" checked={sideBySide} onChange={(event) => setSideBySide(event.target.checked)} />나란히 보기</label>
          <label className={styles.sectionPicker}>같은 항목 보기
            <select aria-label="비교할 항목" defaultValue="0" onChange={(event) => jumpTo(event.target.value)}>
              {sections.map((title, index) => <option key={title} value={index}>{title}</option>)}
            </select>
          </label>
        </div>
      </header>
      <div ref={stage} className={styles.stage}>
        {(["existing", "classic"] as const).map((template) => <section key={template} className={styles.pane} data-template={template} aria-label={template === "existing" ? "기존 UI 비교안" : "고전 템플릿 비교안"}>
          <div className={styles.paneLabel}>
            <strong>{template === "existing" ? "A / 기존안" : "B / 고전 템플릿"}</strong>
            <span>{template === "existing" ? "현재 UI · 여백과 계층" : "단일 컬럼 · 문서형 밀도"}</span>
          </div>
          <div className={styles.reader} data-reader tabIndex={0} role="region" aria-label={template === "existing" ? "기존안 본문 스크롤" : "고전 템플릿 본문 스크롤"}>
            {template === "existing" ? existing : classic}
          </div>
        </section>)}
      </div>
      <footer className={styles.footnote}>같은 항목을 선택하면 두 문서가 함께 이동합니다. 양식 선택 전에는 내용과 분량을 줄이지 않았습니다.</footer>
    </main>
  );
}
