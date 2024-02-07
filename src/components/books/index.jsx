import { Button } from "antd";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../../firebase";
import CustomLayout from "../CustomLayout";
import AddBookModal from "./add-data-module/index";
import BookCard from "./book-card";

const BooksComponent = () => {
  const [books, setBooks] = useState([]);
  const [isModuleOpen, setIsModuleOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);

  const fetchBooks = async () => {
    const booksCollection = collection(firestore, "books");
    const booksSnapshot = await getDocs(booksCollection);
    const booksData = booksSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setBooks(booksData);
  };

  useEffect(() => {
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

  const handleEditBook = async () => {
    fetchBooks();
  };

  // search books
  let debounceTimer;
  const onHandleChange = (e) => {
    const query = e.target.value;
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      const filteredBooks = books.filter((item) =>
        item.bookName.toLowerCase().includes(query.toLowerCase())
      );
      setBooks(filteredBooks);
    }, 300);

    setSearchQuery(query);
    if (!query.trim()) {
      fetchBooks();
    }
  };

  //pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <CustomLayout className="w-full">
      <div>
        <div className="flex justify-between">
          <h2 className="text-lg">Books</h2>
          <div className="flex items-center space-x-2">
            <label className="text-gray-600">Search:</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by book name"
                className="border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
                value={searchQuery}
                onChange={onHandleChange}
              />
            </div>
          </div>
          <Button
            className="bg-indigo-500 text-white hover:text-white"
            type="default"
            onClick={() => setIsModuleOpen(true)}
          >
            Add Book
          </Button>
        </div>
        {currentBooks.map((eachBook) => (
          <BookCard
            key={eachBook.id}
            eachBook={eachBook}
            handleEditBook={handleEditBook}
          />
        ))}
        <div className="mt-4 flex justify-center space-x-2">
          {Array.from({ length: Math.ceil(books.length / booksPerPage) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 bg-indigo-500 text-white rounded-md transition-colors ${
                  currentPage === index + 1
                    ? "bg-indigo-700"
                    : "hover:bg-indigo-700"
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
      {isModuleOpen && (
        <AddBookModal
          isOpen={isModuleOpen}
          onClose={() => setIsModuleOpen(false)}
          onAddBook={handleAddBook}
        />
      )}
    </CustomLayout>
  );
};

export default BooksComponent;
