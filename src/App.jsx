import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { AuthProvider } from "../src/components/Auth/AuthContext";
import Forgetpassword from "../src/components/Auth/Forgetpassword";
import Login from "../src/components/Auth/Login";
import ResetPassword from "../src/components/Auth/ResetPassword";
import Signup from "../src/components/Auth/Signup";
import BooksComponent from "./components/books";
import StudentsComponent from "./components/students";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route path="/dashboard">
            <BooksComponent />
          </Route>
          <Route path="/Forgetpassword">
            <Forgetpassword />
          </Route>
          <Route path="/Resetpassword">
            <ResetPassword />
          </Route>
          <Route path="/books">
            <BooksComponent />
          </Route>
          <Route path="/students">
            <StudentsComponent />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}
