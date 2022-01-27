import {NavLink} from 'react-router-dom';
import {RiBookReadLine} from 'react-icons/ri'
import {BiBookAdd} from 'react-icons/bi'
import ksiazka3 from '../images/ksiazka3.jpeg'

function Header() {
    return (
        <header>
            <div className="header-text">
                <div className="header-photo">
                    <NavLink to="/" className="link">
                        <img src={ksiazka3}  alt="brak zdjecia"/>
                    </NavLink>
                </div>
                <h1>System zarządzania książkami</h1>
            </div>
            <div className="links">

                <NavLink to="/" className="link">
                    <RiBookReadLine />
                    <span className="book-icon-text">Lista książek</span>
                </NavLink>
                <NavLink to="/add" className="link">
                    <BiBookAdd />
                    <span className="book-icon-text">Dodaj książkę</span>
                </NavLink>

            </div>
        </header>
    )

}

export default Header;