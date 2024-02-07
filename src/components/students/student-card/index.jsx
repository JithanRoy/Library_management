import { useState } from "react";
import UpdateStudentsComponent from "../update-data-module";

export default function StudentCard({ eachStudent, handleEditStudent }) {
  const [isEditModule, setIsEditModule] = useState(false);
  return (
    <>
      <li className="flex items-center justify-between border-b py-2">
        <div>
          <p>
            <span className="font-semibold">Name:</span> {eachStudent.name}
          </p>
          <p>
            <span className="font-semibold">Number:</span> {eachStudent.number}
          </p>
          <p>
            <span className="font-semibold">Grade:</span> {eachStudent.grade}
          </p>
          <p>
            <span className="font-semibold">Department:</span>{" "}
            {eachStudent.department}
          </p>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => onView(student)} className="text-blue-500">
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
        <UpdateStudentsComponent
          isOpen={isEditModule}
          onClose={() => setIsEditModule(false)}
          eachStudent={eachStudent}
          handleEditStudent={handleEditStudent}
        />
      )}
    </>
  );
}
