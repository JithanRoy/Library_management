import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { firestore } from "../../../firebase";

export default function UpdateBooksComponent({
  isOpen,
  onClose,
  onEditData,
  handleEditBook,
}) {
  console.log(onEditData);
  const [updateBookData, setUpdateBookData] = useState({
    bookName: "" || onEditData.bookName,
    authorName: "" || onEditData.authorName,
    publication: "" || onEditData.publication,
    category: "" || onEditData.category,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateBookData((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleUpdateBook = async () => {
    try {
      const bookRef = doc(firestore, "books", onEditData.id);
      await updateDoc(bookRef, updateBookData);
      console.log("Book updated successfully!");
      handleEditBook();
    } catch (error) {
      console.error("Error updating book", error.message);
    } finally {
      onClose();
    }
  };

  const handleDeleteBook = async (bookId) => {
    console.log(bookId);
    try {
      await deleteDoc(doc(firestore, "books", bookId));
      handleEditBook();
    } catch (error) {
      console.error("Error deleting book:", error.message);
    } finally {
      onClose();
    }
  };

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:max-w-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Add New Book
                </h3>
                <div className="mt-2">
                  <form>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Book Name:
                      </label>
                      <input
                        type="text"
                        name="bookName"
                        value={updateBookData.bookName}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter book name"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Author Name:
                      </label>
                      <input
                        type="text"
                        name="authorName"
                        value={updateBookData.authorName}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter author name"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Publication:
                      </label>
                      <input
                        type="text"
                        name="publication"
                        value={updateBookData.publication}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter publication"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Category:
                      </label>
                      <input
                        type="text"
                        name="category"
                        value={updateBookData.category}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter category"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={() => handleUpdateBook()}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Update Book
            </button>
            <button
              onClick={onClose}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDeleteBook(onEditData.id)}
              className="text-red-500 "
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
