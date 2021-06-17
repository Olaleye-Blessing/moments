import { Route, Switch, useLocation } from "react-router";

import AddMoment from "./components/Moments/AddMoment";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/Homepage";
import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/Signup";
import ForgetPassword from "./pages/Authentication/ForgetPassword";
import Moment from "./pages/Moment";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function App() {
    let { pathname } = useLocation();

    return (
        <>
            {pathname !== "/auth/signup" &&
                pathname !== "/auth/login" &&
                pathname !== "/auth/forgotPassword" &&
                pathname !== "/auth/resetPassword" && <Navbar />}
            <Switch>
                <Route path="/" exact>
                    <Homepage />
                </Route>
                <Route path="/moment">
                    <AddMoment />
                </Route>
                <Route path="/moments/:id" exact>
                    <Moment />
                </Route>
                <Route path="/auth/login">
                    <Login />
                </Route>
                <Route path="/auth/signup">
                    <Signup />
                </Route>
                <Route path="/auth/forgotPassword">
                    <ForgetPassword />
                </Route>
                <Route path="/profile/:id">
                    <Profile />
                </Route>
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </>
    );
}

export default App;
