// nextjs-dashboard/app/ui/dashboard/FileUploader.tsx
"use client";
import { useState } from "react";

interface Book {
  title: string;
  contributions: { author: { name: string } }[];
  description: string;
  image: { url: string };
  pages: number;
  rating: number;
  ratings_count: number;
}

interface FileUploaderProps {
  onUploadSuccess: (data: Book[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setUploadStatus("Uploading...");
      const response = await fetch("http://127.0.0.1:5000/process-image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadStatus("Upload successful!");

        if (data.books_info && data.books_info.length > 0) {
          const validBookInfos = data.books_info.filter(
            (info: any) => info.hardcover_books.length > 0
          );
          const newBooks = validBookInfos.flatMap(
            (info: any) => info.hardcover_books
          );

          // Save each book separately to local storage
          newBooks.forEach((book: Book, index: number) => {
            localStorage.setItem(
              `book_${Date.now()}_${index}`,
              JSON.stringify(book)
            );
          });

          onUploadSuccess(newBooks);
        }
      } else {
        setUploadStatus("Upload failed.");
      }
    } catch (error) {
      setUploadStatus("Error uploading file.");
      console.error("Upload error:", error);
    }
  };

  return (
    <div>
      <h2 className="text-md font-semibold mb-2">Image Uploader</h2>
      <h2 className="text-sm font-semibold mb-2">
        Try uploading an image of your shelf!
      </h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Upload Image
      </button>
      <p className="mt-2">{uploadStatus}</p>
    </div>
  );
};

export default FileUploader;
