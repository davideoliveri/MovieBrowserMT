import * as pkg from 'react-router-dom';
const { Link } = pkg;
// import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <>
      <nav className="header">
        <ul className="header__menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>{/* <Link to="/movie:id">About</Link> */}</li>
          <li>
            <Link to="/wishlist">Wishlist</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
