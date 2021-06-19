import { Link } from "react-router-dom";

const NotFound = () => {
    // let location = useLocation();

    return (
        <main className="error-page-cont">
            <div id="error-page">
                <div className="content">
                    <h2 className="header" data-text="404">
                        404
                    </h2>
                    <h4 data-text="Opps! Page not found">
                        Opps! Page not found
                    </h4>
                    <p>
                        Sorry! The page you are looking for is not available
                        tonight!!
                    </p>
                    <div className="btns">
                        <Link to="/">Go back home</Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default NotFound;
