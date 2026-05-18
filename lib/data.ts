import { Post } from "@/types";

// 100개의 가짜 게시물 생성
export const posts: Post[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  title: `${i + 1}번째 게시물 제목`,
  content: `이것은 ${i + 1}번째 게시물의 상세 내용입니다. 무한 스크롤을 테스트하기 위해 생성되었습니다.`,
  author: `작성자${(i % 5) + 1}`,
  createdAt: new Date(Date.now() - i * 3600000).toISOString(),
}));

