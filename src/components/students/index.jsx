import { Button } from "antd";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../../firebase";
import CustomLayout from "../CustomLayout";
import AddStudentModal from "./add-data-module";
import StudentCard from "./student-card";

export default function StudentsComponent() {
  const [students, setStudents] = useState([]);
  const [isModuleOpen, setIsModuleOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5);

  const fetchStudents = async () => {
    const studentsCollection = collection(firestore, "students");
    const studentsSnapshot = await getDocs(studentsCollection);
    const studentsData = studentsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setStudents(studentsData);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddStudent = async (student) => {
    try {
      const studentsCollection = collection(firestore, "students");
      const newStudentRef = await addDoc(studentsCollection, student);
      setStudents([...students, { id: newStudentRef.id, ...student }]);
    } catch (error) {
      console.error("Error adding Student:", error.message);
    }
  };

  const handleEditStudent = async () => {
    fetchStudents();
  };

  // search Students
  let Timer;
  const onHandleChange = (e) => {
    const query = e.target.value;
    clearTimeout(Timer);

    Timer = setTimeout(() => {
      const filteredStudents = students.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setStudents(filteredStudents);
    }, 300);

    setSearchQuery(query);
    if (!query.trim()) {
      fetchStudents();
    }
  };

  //pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <CustomLayout className="w-full">
      <div>
        <div className="flex justify-between">
          <h2 className="text-lg">Student</h2>
          <div className="flex items-center space-x-2">
            <label className="text-gray-600">Search:</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by student name"
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
            Add Student
          </Button>
        </div>
        {currentStudents.map((eachStudent) => (
          <StudentCard
            key={eachStudent.id}
            eachStudent={eachStudent}
            handleEditStudent={handleEditStudent}
          />
        ))}
        <div className="mt-4 flex justify-center space-x-2">
          {Array.from({
            length: Math.ceil(students.length / studentsPerPage),
          }).map((_, index) => (
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
          ))}
        </div>
      </div>
      {isModuleOpen && (
        <AddStudentModal
          isOpen={isModuleOpen}
          onClose={() => setIsModuleOpen(false)}
          onAddStudent={handleAddStudent}
        />
      )}
    </CustomLayout>
  );
}
