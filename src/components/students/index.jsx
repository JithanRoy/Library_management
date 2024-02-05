import { Button } from "antd";
import CustomLayout from "../CustomLayout";

const StudentsComponent = () => {
  return (
    <CustomLayout className="w-full">
      <div>
        <div className="flex justify-between">
          <div>Books</div>
          <Button type="default">Add Student</Button>
        </div>
      </div>
      {/* <AddModal/> */}
    </CustomLayout>
  );
};

export default StudentsComponent;
