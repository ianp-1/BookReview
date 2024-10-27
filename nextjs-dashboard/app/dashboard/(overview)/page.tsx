// nextjs-dashboard/app/dashboard/(overview)/page.tsx
"use client";
import { useEffect, useState } from "react";
import BookCard from "@/app/ui/dashboard/BookCard";

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

export default function HomePage() {
  const [booksInfo, setBooksInfo] = useState<StoredBook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = () => {
      setLoading(true);
      setError(null);

      try {
        const books: StoredBook[] = [];

        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith("book_")) {
            const bookStr = localStorage.getItem(key);
            if (bookStr) {
              const book = JSON.parse(bookStr) as Book;
              books.push({ ...book, storageKey: key });
            }
          }
        }

        setBooksInfo(books);
      } catch (err) {
        setError("Failed to load books from localStorage.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleUploadSuccess = (newBooks: Book[]) => {
    const currentCounter = parseInt(
      localStorage.getItem("book_counter") || "0",
      10
    );
    const storedNewBooks: StoredBook[] = [];

    newBooks.forEach((book, index) => {
      const newCounter = currentCounter + index + 1;
      const storageKey = `book_${newCounter}`;
      localStorage.setItem(storageKey, JSON.stringify(book));
      storedNewBooks.push({ ...book, storageKey });
    });

    localStorage.setItem(
      "book_counter",
      (currentCounter + newBooks.length).toString()
    );
    setBooksInfo((prevBooks) => [...prevBooks, ...storedNewBooks]);
  };

  const handleDelete = (storageKey: string) => {
    // Remove from localStorage
    localStorage.removeItem(storageKey);
    // Update state
    setBooksInfo((prevBooks) =>
      prevBooks.filter((book) => book.storageKey !== storageKey)
    );
  };

  return (
    <div className="flex flex-col rounded-lg items-center justify-start min-h-screen p-4 bg-gray-100">
      <h2 className="text-2xl mb-4 text-center">Book Ratings</h2>

      {/* Books List */}
      <div className="w-full">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : booksInfo.length === 0 ? (
          <div className="text-center">
            <p>
              No books found. Please use the uploader above to add your first
              book.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {booksInfo.map((book) => (
              <BookCard
                key={book.storageKey}
                book={book}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
