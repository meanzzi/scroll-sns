import { Post } from "@/types";

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="p-6 border border-gray-200 rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>
        <span className="text-xs text-gray-400">
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>
      <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
      <div className="flex justify-end">
        <span className="text-sm font-medium text-blue-600">@{post.author}</span>
      </div>
    </div>
  );
}