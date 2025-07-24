import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <>
      <nav className="header">
        <ul className="header__menu">
          <li>
            <Link className="header__item" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="header__item" to="/wishlist">
              Wishlist
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
