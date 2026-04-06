import { Link } from 'react-router-dom';
import './NavbarLink.css';

interface Props {
    title: string;
    path: string;
}

export default function NavbarLink({ title, path }: Props) {
    return (
        <Link
            className={'navbar-link__container'}
            to={path}
        >
            {title}
        </Link>
    );
}
