import { getAuth, signOut } from "firebase/auth";
import { useHistory } from "react-router-dom";

export default function Logout() {
  const history = useHistory();
  const handleLogout = () => {
    const auth = getAuth();

    try {
      signOut(auth);
      history.push("/");
    } catch (error) {
      console.error(console.error("Logout Failed", error.message));
    }
  };
  return (
    <>
      <button
        className="bg-indigo-500 hover:bg-indigo-800 text-white font-bold px-4 mr-4 rounded focus:outline-none focus:shadow-outline-red active:bg-indigo-500"
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  );
}
