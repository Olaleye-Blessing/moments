import { Route, Switch } from "react-router";
import AddMoment from "./components/AddMoment";
// import Moments from "./components/Moments/Moments";
import Navbar from "./components/Navbar";
import Homepage from "./Homepage";
import Particles from "react-particles-js";
import { particleConfig } from "./data/particlesjs-config";

function App() {
    return (
        <>
            <Particles id="particles-js" params={particleConfig}></Particles>
            <Navbar />
            <Switch>
                <Route path="/" exact>
                    <Homepage />
                </Route>
                <Route path="/moment">
                    <AddMoment />
                </Route>
            </Switch>
        </>
    );
}

export default App;
