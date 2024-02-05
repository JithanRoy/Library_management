import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../../firebase.js";
import AddBookModal from "../ModuleComponents/AddBookModal";
import BookDetails from "../View/BookDetails.jsx";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [editBooks, setEditBooks] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      const booksCollection = collection(firestore, "books");
      const booksSnapshot = await getDocs(booksCollection);
      const booksData = booksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(booksData);
    };
    fetchBooks();
  }, []);

  const handleAddBook = async (book) => {
    try {
      const booksCollection = collection(firestore, "books");
      const newBookRef = await addDoc(booksCollection, book);
      setBooks([...books, { id: newBookRef.id, ...book }]);
    } catch (error) {
      console.error("Error adding book:", error.message);
    }
  };

  const handleViewBook = (book) => {
    // console.log("View Book:", book);
  };

  const handleEditBook = async (book) => {
    setIsModalOpen(true);
    setEditBooks(book);
    try {
      await updateDoc(doc(firestore, "books"), bookId);
      setBooks(books.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error("Error deleting book:", error.message);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await deleteDoc(doc(firestore, "books", bookId));
      setBooks(books.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error("Error deleting book:", error.message);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">Books</h2>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Add Book
        </button>

        <AddBookModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddBook={handleAddBook}
          onEdit={handleEditBook}
          books={editBooks}
        />
      </div>
      <div>
        <ul>
          {books.map((book) => (
            <BookDetails
              key={book.id}
              book={book}
              onView={handleViewBook}
              onEdit={handleEditBook}
              onDelete={handleDeleteBook}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
