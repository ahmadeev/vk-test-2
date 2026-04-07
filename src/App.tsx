import './App.css';
import Navbar from './components/Navbar/Navbar.tsx';
import { Outlet } from 'react-router-dom';

export default function App() {
    return (
        <>
            <Navbar />
            <div
                style={{
                    padding: '4rem 4rem',
                }}
            >
                <Outlet/>
            </div>

        </>
    );
}
