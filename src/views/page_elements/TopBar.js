import {Link} from "react-router-dom";

function TopBar() {
    return (
        <>
            <div className="row border-bottom">
                <nav className="navbar navbar-static-top" role="navigation" style={{marginBottom: "0px"}}>
                    <div className="navbar-header">
                        <a className="navbar-minimalize minimalize-styl-2 btn btn-primary" href="#">
                            <i className="fa fa-bars"/> </a>
                        <form role="search" className="navbar-form-custom">
                            <div className="form-group">
                                {/*<input type="text" placeholder="Search for something..." className="form-control"*/}
                                {/*       name="top-search" id="top-search">*/}
                            </div>
                        </form>
                    </div>
                    <ul className="nav navbar-top-links navbar-right">
                        <li>
                        </li>
                        <li>
                            <Link to={'/logout'}>
                                <i className="fa fa-sign-out"/> Log out
                            </Link>
                        </li>
                    </ul>

                </nav>
            </div>
        </>
    );
}
export default TopBar;