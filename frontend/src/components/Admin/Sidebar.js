
import React from 'react';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Card from 'react-bootstrap/Card';
import { Dropdown } from 'react-bootstrap';


const Sidebar = () => {
    return (
        <div className="sidebar" style={{ marginTop: '60px' }}>
          <nav id="sidebar">
            <ul className="list-unstyled components">

    
              <Dropdown as="li">
                <Dropdown.Toggle as={Link} to="#" className="dropdown-item sidebar-link">
                  Product
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/admin/product/new" className="sidebar-link">
                    Create
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/admin/product" className="sidebar-link">
                    Product
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
    
              <li>
                <Link to="/admin/orders" className="sidebar-link">
                  Orders
                </Link>
              </li>
    
              <li>
                <Link to="/admin/users" className="sidebar-link">
                  Users
                </Link>
              </li>
    
              <Dropdown as="li">
                <Dropdown.Toggle as={Link} to="#" className="dropdown-item sidebar-link">
                  Category
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/admin/category" className="sidebar-link">
                    Category
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/admin/category/new" className="sidebar-link">
                    Create
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ul>
          </nav>
        </div>
      );
      
}

export default Sidebar;