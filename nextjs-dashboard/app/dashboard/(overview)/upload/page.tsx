// nextjs-dashboard/app/dashboard/upload/page.tsx
"use client";
import FileUploader from "@/app/ui/dashboard/FileUploader";
import { useRouter } from "next/navigation";

type Book = {
  title: string;
  contributions: { author: { name: string } }[];
  description: string;
  image: { url: string };
  pages: number;
  rating: number;
  ratings_count: number;
};

const UploadPage = () => {
  const router = useRouter();

  const handleUploadSuccess = (newBooks: Book[]) => {
    if (newBooks.length > 0) {
      // No need to store in sessionStorage since FileUploader already saves to localStorage
      router.push("/dashboard/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4">
      <div className="bg-gray-200 rounded-lg shadow-md p-4 w-full max-w-lg">
        <h1 className="text-lg mb-2 text-center">Image Uploader</h1>
        <FileUploader onUploadSuccess={handleUploadSuccess} />
      </div>
    </div>
  );
};

export default UploadPage;
