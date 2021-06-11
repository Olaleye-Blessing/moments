import { NavLink } from "react-router-dom";

const HomeLogo = () => {
    return (
        <NavLink to="/" className="btn nav__home">
            <figure>
                <figcaption>MOMENTS</figcaption>
            </figure>
        </NavLink>
    );
};

export default HomeLogo;
