import './Navbar.css';
import NavbarLink from './NavbarLink/NavbarLink.tsx';

const routes = [
    {
        title: 'Все котики',
        path: '/',
    },
    {
        title: 'Любимые котики',
        path: '/favorite',
    },
];

export default function Navbar() {
    return (
        <div className={'navbar__container'}>
            {routes.map((item, index) => (
                <NavbarLink
                    key={index}
                    title={item.title}
                    path={item.path}
                />
            ))}
        </div>
    );
}
