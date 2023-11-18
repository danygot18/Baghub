import React from 'react'
import { Link } from 'react-router-dom'
import NavDropdown from 'react-bootstrap/NavDropdown';


const Sidebar = () => {
    return (
        <div className="sidebar-wrapper block">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/dashboard"><i className="fa fa-tachometer"></i> Dashboard</Link>
                    </li>

                    <li>
                        <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                            <i className="fa fa-product-hunt"></i> Products</a>
                        <ul className="collapse list-unstyled" id="productSubmenu">
                            <li>
                                <Link to="/admin/products"><i className="fa fa-clipboard"></i> All</Link>
                            </li>

                            <li>
                                <Link to="/admin/product"><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>



                    <li>
                        <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i> Orders</Link>
                    </li>

                    <li>
                        <Link to="/admin/users"><i className="fa fa-users"></i> Users</Link>
                    </li>


                

                    <NavDropdown title={"Category"} className="btn dropdown-toggle text-blue mr-4" style={{ height: "55px" }} type="button" id="dropDownMenuButton">

                        <Link to="/admin/category" className='text-dark dropdown-item' style={{ textDecoration: "none" }}>Category</Link>
                        <Link to="/admin/category/new" className='text-dark dropdown-item' style={{ textDecoration: "none" }}>Create</Link>

                    </NavDropdown>

                    <li>
                        <Link to="/admin/reviews"><i className="fa fa-star"></i> Reviews</Link>
                    </li>


                </ul>
            </nav>
        </div>
    )
}

export default Sidebar