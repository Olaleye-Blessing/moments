import { NavLink } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { IoMdNotifications } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useRef } from "react";

const Navbar = () => {
    let links = [
        {
            name: "search",
            active: "false",
            icon: <BsSearch className="nav__icon" />,
        },
        {
            name: "notification",
            active: "false",
            icon: <IoMdNotifications className="nav__icon" />,
        },
        {
            name: "moment",
            active: "false",
            icon: <AiOutlinePlus className="nav__icon" />,
        },
    ];
    const navRef = useRef(null);

    const getCurrentScrollHeight = () => {
        let currentWindowScrollHeigth = window.pageYOffset;
        currentWindowScrollHeigth > 20
            ? navRef.current.classList.add("bg-color")
            : navRef.current.classList.remove("bg-color");
        // if (currentWindowScrollHeigth > 20) {
        //     navRef.current.classList.add("bg-color");
        // } else {
        //     navRef.current.classList.remove("bg-color");
        // }
    };

    useEffect(() => {
        document.addEventListener("scroll", getCurrentScrollHeight);

        return () =>
            document.removeEventListener("scroll", getCurrentScrollHeight);
    }, []);
    return (
        <nav className="nav" ref={navRef}>
            <div className="width">
                <NavLink to="/" className="btn nav__home">
                    <figure>
                        <figcaption>MOMENTS</figcaption>
                    </figure>
                </NavLink>
                <ul className="nav__lists-main">
                    {links.map((link) => {
                        let { name, icon } = link;
                        return (
                            <li key={name}>
                                <NavLink
                                    to={`/${name}`}
                                    className={`btn nav__link`}
                                >
                                    {icon}
                                    <span className="nav__text">{name}</span>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
                <ul className="nav__lists-sub">
                    <li>
                        <NavLink
                            to="/login"
                            className="btn btn__link nav__link login"
                        >
                            login
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/signup" className="btn btn__link">
                            signup
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
