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

                    <NavDropdown title={"Product"} className="btn dropdown-toggle text-blue mr-4" style={{ height: "55px" }} type="button" id="dropDownMenuButton">

                        <Link to="/admin/product/new" className='text-dark dropdown-item' style={{ textDecoration: "none" }}>Create</Link>
                        <Link to="/admin/product" className='text-dark dropdown-item' style={{ textDecoration: "none" }}>Product</Link>

                    </NavDropdown>



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