import { Redirect, Route } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Dashboard from "./Dashboard";

export default function PrivateRoute() {
  const { user } = useAuth();
  console.log("User in PrivateRoute:", user);

  return (
    <Route
      render={() => (user !== null ? <Dashboard /> : <Redirect to="/login" />)}
    />
  );
}
