import { NavLink } from "react-router-dom";

const HomeLogo = () => {
    return (
        <NavLink to="/" className="btn nav__home">
            {/* <figure>
                <figcaption>MOMENTS</figcaption>
            </figure> */}
            <div>
                <div>
                    <span>M</span>
                    <span>O</span>
                    <span>M</span>
                    <span>E</span>
                    <span>N</span>
                    <span>T</span>
                    <span>S</span>
                </div>
            </div>
        </NavLink>
    );
};

export default HomeLogo;
