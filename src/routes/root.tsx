import { Link } from "react-router-dom";
// import { Outlet } from "react-router-dom";

const Root = () => {
    return (
        <div id="sidebar">
            <nav className="root-nav">
                {/* <div className="nav-container "> */}
                <ul>
                    {/* <li>
                        <Link to="/bonds/info">Bond Info</Link>
                    </li> */}
                    <li>
                        <Link to="/bonds/prices">Bond Prices</Link>
                    </li>
                </ul>
                {/* </div> */}
            </nav>
            {/* <div id="detail">
                <Outlet/>
            </div> */}
        </div>
    )
}

export default Root;