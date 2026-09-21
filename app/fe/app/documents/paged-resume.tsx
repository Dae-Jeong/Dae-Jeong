"use client";

import { useEffect, useRef } from "react";
import styles from "./classic-resume.module.css";

/**
 * A4 pagination for the editorial resume (`?paged=1`). Ports the V2 prototype algorithm:
 * a company head stays with its first project, later projects flow onto new pages under a
 * `회사 · 계속` label, section titles never sit alone at a page bottom, and every page gets
 * a footer with the page number. The rendered article is cloned, never mutated, so the
 * on-screen continuous view and the copy/claim attributes are unchanged.
 */
export function PagedResume({ author, role }: { author: string; role: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const article = root?.parentElement?.querySelector<HTMLElement>("article[data-resume-copy]");
    if (!root || !article) return;
    let cancelled = false;
    const run = () => {
      if (cancelled) return;
      root.replaceChildren();
      const pages: HTMLElement[] = [];
      let flow: HTMLElement | null = null;
      let company = "";
      const clone = <T extends Node>(node: T, deep = true) => node.cloneNode(deep) as T;

      const newPage = (continued = false) => {
        const page = document.createElement("article");
        page.className = styles.page;
        flow = document.createElement("div");
        flow.className = styles.flow;
        page.append(flow);
        root.append(page);
        pages.push(page);
        if (continued && company) {
          const label = document.createElement("div");
          label.className = styles.continued;
          label.textContent = `${company} · 계속`;
          flow.append(label);
        }
      };
      const fits = () => {
        if (!flow) return true;
        const limit = flow.getBoundingClientRect().bottom + 1;
        return [...flow.children].every((child) => child.getBoundingClientRect().bottom <= limit);
      };
      const add = (node: HTMLElement, continued = false) => {
        flow!.append(node);
        if (!fits()) {
          node.remove();
          newPage(continued);
          flow!.append(node);
          if (!fits()) pages[pages.length - 1].classList.add(styles.overflow);
        }
      };
      // Wrap cloned fragments in the same ancestors the stylesheet expects.
      const wrapSection = (section: HTMLElement, entry: HTMLElement | null, children: Node[], continued = false) => {
        const sectionClone = clone(section, false);
        sectionClone.removeAttribute("id");
        if (entry) {
          const entryClone = clone(entry, false);
          if (continued) entryClone.setAttribute("data-continued", "true");
          const blocks = entry.querySelector<HTMLElement>(":scope > div");
          const blocksClone = blocks ? clone(blocks, false) : document.createElement("div");
          blocksClone.append(...children);
          entryClone.append(blocksClone);
          sectionClone.append(entryClone);
        } else {
          sectionClone.append(...children);
        }
        return sectionClone;
      };

      newPage();
      const header = article.querySelector<HTMLElement>(":scope > header");
      if (header) add(clone(header));

      for (const section of article.querySelectorAll<HTMLElement>(":scope > section")) {
        company = "";
        // Table-like sections (기술 · 프로젝트·외부 활동 · 학력…): keep the whole section on one page when it fits there or on a
        // fresh page, so a single table row is never stranded at the top of the next page (2026-09-13 minimal tidy). Content unchanged;
        // sections too tall for one page fall through to the per-block flow below.
        if (section.dataset.kind !== "career") {
          const unit = clone(section);
          unit.removeAttribute("id");
          flow!.append(unit);
          if (fits()) continue;
          unit.remove();
          const fresh = clone(section);
          fresh.removeAttribute("id");
          newPage();
          flow!.append(fresh);
          if (fits()) continue;
          fresh.remove();
          pages.pop()!.remove();
          flow = pages[pages.length - 1].querySelector<HTMLElement>(":scope > div");
        }
        const title = section.querySelector<HTMLElement>(":scope > h2");
        if (title) {
          const titleUnit = wrapSection(section, null, [clone(title)]);
          flow!.append(titleUnit);
          if (flow!.getBoundingClientRect().bottom - titleUnit.getBoundingClientRect().bottom < 100) {
            titleUnit.remove();
            newPage();
            flow!.append(titleUnit);
          }
        }
        const kind = section.dataset.kind;
        for (const entry of section.querySelectorAll<HTMLElement>(":scope > div")) {
          const blocks = entry.querySelector<HTMLElement>(":scope > div");
          const children = blocks ? [...blocks.children] as HTMLElement[] : [];
          if (kind !== "career") {
            for (const child of children) add(wrapSection(section, entry, [clone(child)]));
            continue;
          }
          const heading = entry.querySelector<HTMLElement>(":scope > h3");
          company = heading?.querySelector<HTMLElement>("[data-company]")?.textContent?.trim() ?? heading?.textContent?.trim() ?? "";
          const firstProject = children.findIndex((child) => child.tagName === "H4");
          const groups: HTMLElement[][] = [];
          if (firstProject < 0) groups.push(children);
          else {
            const head = children.slice(0, firstProject);
            let current: HTMLElement[] = [];
            for (const child of children.slice(firstProject)) {
              if (child.tagName === "H4" && current.length) { groups.push(current); current = []; }
              current.push(child);
            }
            if (current.length) groups.push(current);
            groups[0] = [...head, ...groups[0]];
          }
          // The first project can be taller than the remaining space on page 1. Fill that space block by block
          // instead of moving the whole company to page 2 and leaving only the section title behind. Project
          // headings stay with their first block; later fragments receive the existing "회사 · 계속" label.
          const firstGroupChunks: HTMLElement[][] = [];
          const firstProjectHeading = groups[0].findIndex((node) => node.tagName === "H4");
          const firstChunkEnd = firstProjectHeading >= 0 ? Math.min(groups[0].length, firstProjectHeading + 2) : Math.min(groups[0].length, 1);
          if (firstChunkEnd > 0) firstGroupChunks.push(groups[0].slice(0, firstChunkEnd));
          for (let index = firstChunkEnd; index < groups[0].length; index++) {
            const node = groups[0][index];
            if (node.tagName === "H4" && groups[0][index + 1]) firstGroupChunks.push([node, groups[0][++index]]);
            else firstGroupChunks.push([node]);
          }
          let headUnit = wrapSection(section, entry, []);
          if (heading) headUnit.querySelector(":scope > div")!.prepend(clone(heading));
          flow!.append(headUnit);
          let headBlocks = headUnit.querySelector<HTMLElement>(":scope > div > div")!;
          for (const chunk of firstGroupChunks) {
            const copies = chunk.map((node) => clone(node));
            headBlocks.append(...copies);
            if (fits()) continue;
            copies.forEach((node) => node.remove());
            const moveCompanyHeading = headBlocks.childElementCount === 0 && Boolean(heading);
            if (moveCompanyHeading) headUnit.remove();
            newPage(!moveCompanyHeading);
            headUnit = wrapSection(section, entry, chunk.map((node) => clone(node)), !moveCompanyHeading);
            if (moveCompanyHeading && heading) headUnit.querySelector(":scope > div")!.prepend(clone(heading));
            flow!.append(headUnit);
            headBlocks = headUnit.querySelector<HTMLElement>(":scope > div > div")!;
            if (!fits()) pages[pages.length - 1].classList.add(styles.overflow);
          }
          for (const group of groups.slice(1)) add(wrapSection(section, entry, group.map((node) => clone(node)), true), true);
        }
      }

      pages.forEach((page, index) => {
        const footer = document.createElement("footer");
        footer.className = styles.pageFooter;
        footer.innerHTML = `<span>${author} · ${role}</span><span>${String(index + 1).padStart(2, "0")} / ${String(pages.length).padStart(2, "0")}</span>`;
        page.append(footer);
      });
      article.hidden = true;
      root.setAttribute("data-paged-done", String(pages.length));
    };
    document.fonts.ready.then(run);
    return () => { cancelled = true; };
  }, [author, role]);

  return <div ref={rootRef} className={styles.pages} data-paged-root />;
}
