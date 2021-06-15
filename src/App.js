import { Route, Switch, useLocation } from "react-router";

import AddMoment from "./components/Moments/AddMoment";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/Homepage";
import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/Signup";
import Moment from "./pages/Moment";
import Profile from "./pages/Profile";

function App() {
    let { pathname } = useLocation();

    return (
        <>
            {pathname !== "/auth/signup" && pathname !== "/auth/login" && (
                <Navbar />
            )}
            <Switch>
                <Route path="/" exact>
                    <Homepage />
                </Route>
                <Route path="/moment">
                    <AddMoment />
                </Route>
                <Route path="/moments/:id">
                    <Moment />
                </Route>
                <Route path="/auth/login">
                    <Login />
                </Route>
                <Route path="/auth/signup">
                    <Signup />
                </Route>
                <Route path="/profile/:id">
                    <Profile />
                </Route>
            </Switch>
        </>
    );
}

export default App;
