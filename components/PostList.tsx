"use client";

import { useEffect, useRef, useState } from "react";
import { Post, PostResponse } from "@/types";
import PostCard from "./PostCard";

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // 스크롤 감지를 위한 Ref
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      if (loading || !hasMore) return;

      setLoading(true);
      try {
        const response = await fetch(`/api/posts?page=${page}&limit=10`);
        const data: PostResponse = await response.json();

        if (data.items.length === 0) {
          setHasMore(false);
        } else {
          setPosts((prev) => [...prev, ...data.items]);
          setPage((prev) => (data.nextPage ? data.nextPage : prev));
          if (!data.nextPage) setHasMore(false);
        }
      } catch (error) {
        console.error("게시물을 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        // 대상(target)이 화면에 보이고, 로딩 중이 아닐 때 데이터 요청
        if (entries[0].isIntersecting && !loading && hasMore) {
          fetchPosts();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [loading, hasMore, page]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {/* 무한 스크롤 감지 및 로딩 표시 부분 */}
      <div ref={observerTarget} className="py-10 text-center">
        {loading && (
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        )}
        {!hasMore && (
          <p className="text-gray-500 font-medium">모든 게시물을 다 읽었습니다! 🎉</p>
        )}
      </div>
    </div>
  );
}