// Example component to handle the custom reset link
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const ResetPassword = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userId");
  const resetToken = searchParams.get("resetToken");
  const history = useHistory();
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {}, [userId, resetToken]);

  const handleResetPassword = async () => {
    console.log(newPassword);
    console.log(userId, resetToken);
    history.push("/login");
  };

  return (
    <div>
      <label>
        New Password:
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </label>
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default ResetPassword;
