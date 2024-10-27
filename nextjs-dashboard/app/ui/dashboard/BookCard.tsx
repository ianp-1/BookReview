// nextjs-dashboard/components/ui/BookCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Book {
  title: string;
  contributions: { author: { name: string } }[];
  description: string;
  image: { url: string };
  pages: number;
  rating: number;
  ratings_count: number;
}

interface StoredBook extends Book {
  storageKey: string;
}

interface BookCardProps {
  book: StoredBook;
  onDelete: (storageKey: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onDelete }) => {
  const handleDelete = () => {
    onDelete(book.storageKey);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col h-80 cursor-pointer hover:shadow-lg transition">
          {book.image ? (
            <div className="relative w-full h-32 mb-2">
              <Image
                src={book.image.url}
                alt={book.title}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
                priority={false}
                sizes="(max-width: 768px) 100vw,
                       (max-width: 1200px) 50vw,
                       33vw"
              />
            </div>
          ) : (
            <div className="w-full h-32 mb-2 bg-gray-200 rounded-md flex items-center justify-center">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
          <h3 className="text-lg font-bold mb-1 truncate line-clamp-2">
            {book.title}
          </h3>
          <p className="text-sm mb-1 truncate">
            <strong>Author:</strong>{" "}
            {book.contributions.map((c) => c.author.name).join(", ")}
          </p>
          <p className="text-sm mb-1 truncate">
            <strong>Pages:</strong> {book.pages} 📖
          </p>
          <p className="text-sm mb-1 truncate">
            <strong>Rating:</strong> {book.rating.toFixed(2)} ⭐
          </p>
          <p className="text-sm mb-2 truncate">
            <strong>Rating Count:</strong> {book.ratings_count} 📚
          </p>
          <p className="text-sm overflow-hidden text-ellipsis line-clamp-3">
            {book.description}
          </p>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto pt-8 pr-8">
        <DialogHeader>
          <DialogTitle>{book.title}</DialogTitle>
          <DialogDescription>
            Detailed information about the book.
          </DialogDescription>
        </DialogHeader>

        {/* Image positioned at the top-right corner */}
        {book.image && (
          <div className="absolute top-4 right-4 w-24 h-36">
            <Image
              src={book.image.url}
              alt={book.title}
              layout="fill"
              objectFit="cover"
              className="rounded-md shadow-md"
              priority={false}
              sizes="(max-width: 768px) 100vw,
                     (max-width: 1200px) 50vw,
                     33vw"
            />
          </div>
        )}

        {/* Main Content */}
        <div className="mt-8 space-y-2">
          <p>
            <strong>Author:</strong>{" "}
            {book.contributions.map((c) => c.author.name).join(", ")}
          </p>
          <p>
            <strong>Pages:</strong> {book.pages} 📖
          </p>
          <p>
            <strong>Rating:</strong> {book.rating.toFixed(2)} ⭐
          </p>
          <p>
            <strong>Rating Count:</strong> {book.ratings_count} 📚
          </p>
          <p>
            <strong>Description:</strong> {book.description}
          </p>
        </div>

        <DialogFooter className="flex justify-between space-x-4">
          {/* Delete Button (Does not close the dialog) */}
          <Button
            onClick={handleDelete}
            variant="destructive"
            className="px-6 py-3 text-lg"
          >
            Delete
          </Button>

          {/* Close Button (Closes the dialog) */}
          <DialogClose asChild>
            <Button variant="secondary" className="px-6 py-3 text-lg">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookCard;
