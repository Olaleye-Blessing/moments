import { Route, Switch, useLocation } from "react-router";
import AddMoment from "./components/AddMoment";
// import Moments from "./components/Moments/Moments";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./Homepage";
// import Particles from "react-particles-js";
import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/Signup";

function App() {
    let { pathname } = useLocation();

    return (
        <>
            {/* <Particles id="particles-js" params={particleConfig}></Particles> */}
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
                <Route path="/auth/login">
                    <Login />
                </Route>
                <Route path="/auth/signup">
                    <Signup />
                </Route>
            </Switch>
        </>
    );
}

export default App;
