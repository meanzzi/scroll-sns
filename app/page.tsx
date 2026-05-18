import PostList from "@/components/PostList";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 font-sans">
      <div className="max-w-2xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">SNS Feed</h1>
        <p className="text-gray-500">무한 스크롤로 새로운 소식을 확인하세요.</p>
      </div>
      <PostList />
    </main>
  );
}
