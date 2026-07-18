/* 글 목록 데이터 — MDX 콘텐츠 파이프라인 도입 시 lib/content 어댑터로 교체.
   비어 있으면 페이지가 구조 placeholder + COMING SOON 을 렌더한다 */

export type Post = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
};

export const POSTS: Post[] = [];
