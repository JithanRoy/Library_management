import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { firestore } from "../../../firebase";

export default function UpdateStudentsComponent({
  isOpen,
  onClose,
  eachStudent,
  handleEditStudent,
}) {
  console.log(eachStudent);

  const [updateStudentData, setUpdateStudentData] = useState({
    name: "" || eachStudent.name,
    number: "" || eachStudent.number,
    grade: "" || eachStudent.grade,
    department: "" || eachStudent.department,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateStudentData((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleUpdateStudent = async () => {
    try {
      const studentRef = doc(firestore, "students", eachStudent.id);
      await updateDoc(studentRef, updateStudentData);
      console.log("Student updated successfully!");
      handleEditStudent();
    } catch (error) {
      console.error("Error updating Student", error.message);
    } finally {
      onClose();
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await deleteDoc(doc(firestore, "students", studentId));
      handleEditStudent();
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
                        Student name:
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={updateStudentData.name}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter student name"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Number:
                      </label>
                      <input
                        type="number"
                        name="number"
                        value={updateStudentData.number}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter student number"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Grade:
                      </label>
                      <input
                        type="text"
                        name="grade"
                        value={updateStudentData.grade}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter grade"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Department:
                      </label>
                      <input
                        type="text"
                        name="department"
                        value={updateStudentData.department}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter department"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={() => handleUpdateStudent()}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Update Student
            </button>
            <button
              onClick={onClose}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDeleteStudent(eachStudent.id)}
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
