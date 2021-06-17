import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Moment from "./Moment/Moment";

const Moments = ({ moments }) => {
    // let location = useLocation();
    // console.log(location);
    const [periods, setPeriods] = useState([
        { text: "latest", active: true },
        { text: "week", active: false },
        { text: "month", active: false },
        { text: "year", active: false },
    ]);

    return (
        <>
            <header className="moments__header">
                <h3>Moments</h3>
                <ul className="moments__tags">
                    {periods.map((period) => {
                        let { text, active } = period;
                        return (
                            <li key={text}>
                                {/* <Link to={`/text`} className={`btn nav__link`}>
                                    {text}
                                </Link> */}
                                <NavLink
                                    to={`/`}
                                    className={`btn nav__link`}
                                    activeClassName={active && "white-link"}
                                >
                                    {text}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </header>
            <section className="moments">
                {moments.map((moment) => (
                    <Moment key={moment._id} moment={moment} />
                ))}
            </section>
        </>
        // <section className="moments width">
        //     {moments.map((moment) => (
        //         <Moment key={moment._id} moment={moment} />
        //     ))}
        // </section>
    );
};

export default Moments;
