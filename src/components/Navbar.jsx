import React, { useState } from 'react';
import { Link, Outlet, useMatch, useResolvedPath } from "react-router-dom"
import '../styles/Navbar.scss';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    return ( 
        <>
            <nav>
                <Link to="/" className="site-title">Home</Link>
                <div className="menu" onClick={() => {
                    setMenuOpen(!menuOpen)
                }}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className={menuOpen ? "open" : ""}>
                    <CustomLink to="/shop">
                        <img src="https://assets.dougkarda.com/images/icons/icon-shopping-cart.png" 
                            alt="Beverages icon" />
                        <span>The Store</span>
                    </CustomLink>
                    <CustomLink to="/beverages">
                        <img src="https://assets.dougkarda.com/images/icons/icon-beverage-trans.png" 
                            alt="Beverages icon" />
                        <span>Beverages</span>
                    </CustomLink>
                    <CustomLink to="/beveragesFuture">
                        <img src="https://assets.dougkarda.com/images/icons/icon-beverage-trans.png"
                            alt="FutureBeverages icon" className="upside-down" />
                        <span>Future Beverages</span>
                    </CustomLink>
                    <CustomLink to="/wine">
                        <img src="https://assets.dougkarda.com/images/icons/icon-wine-trans.png" 
                            alt="Wine icon" />
                        <span>Wine</span>
                    </CustomLink>
                    <CustomLink to="/whiskey">
                        <img src="https://assets.dougkarda.com/images/icons/icon-whiskey-trans.png"
                            alt="Whiskey icon" />
                        <span>Whiskey</span>
                    </CustomLink>
                    <CustomLink to="/liquor">
                        <img src="https://assets.dougkarda.com/images/icons/icon-liquor-trans.png" 
                            alt="Liquor icon" />
                        <span>Liquor</span>
                    </CustomLink>
                </ul>
            </nav>
            <div className="container">
                <Outlet />
            </div>
        </>
    )
}

function CustomLink({to, children, ...props}) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    )
}
  
export default Navbar;