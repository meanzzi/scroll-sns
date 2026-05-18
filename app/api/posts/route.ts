import { NextResponse } from "next/server";
import { posts } from "@/lib/data";

export async function GET(request: Request) {
  // 1. URL에서 쿼리 파라미터(page, limit) 추출
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  // 2. 데이터 자르기 (Pagination 로직)
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedPosts = posts.slice(start, end);

  // 3. 다음 페이지가 있는지 확인
  const hasMore = end < posts.length;

  // 4. 네트워크 로딩을 체감하기 위해 의도적인 지연 시간 추가 (800ms)
  await new Promise((resolve) => setTimeout(resolve, 800));

  // 5. JSON 응답 반환
  return NextResponse.json({
    items: paginatedPosts,
    nextPage: hasMore ? page + 1 : null,
  });
}