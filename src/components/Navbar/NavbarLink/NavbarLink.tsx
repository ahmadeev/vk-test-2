import { NavLink } from 'react-router-dom';
import './NavbarLink.css';

interface Props {
    title: string;
    path: string;
}

export default function NavbarLink({ title, path }: Props) {
    return (
        <NavLink
            className={({ isActive }) => `navbar-link__container ${isActive ? 'active' : ''}`}
            to={path}
        >
            {title}
        </NavLink>
    );
}
