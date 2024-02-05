import { useState } from "react";
import UpdateBooksComponent from "../update-data-module";

export default function BookCard({ eachBook, bookData, handleEditBook }) {
  const [isEditModule, setIsEditModule] = useState(false);
  return (
    <>
      <li className="flex items-center justify-between border-b py-2">
        <div>
          <p>
            <span className="font-semibold">Book Name:</span>{" "}
            {eachBook.bookName}
          </p>
          <p>
            <span className="font-semibold">Author:</span> {eachBook.authorName}
          </p>
          <p>
            <span className="font-semibold">Publication:</span>{" "}
            {eachBook.publication}
          </p>
          <p>
            <span className="font-semibold">Category:</span> {eachBook.category}
          </p>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => onView(book)} className="text-blue-500">
            View
          </button>
          <button
            onClick={() => setIsEditModule(true)}
            className="text-yellow-500"
          >
            Edit
          </button>
        </div>
      </li>
      {isEditModule && (
        <UpdateBooksComponent
          isOpen={isEditModule}
          onClose={() => setIsEditModule(false)}
          onEditData={eachBook}
          handleEditBook={handleEditBook}
        />
      )}
    </>
  );
}
