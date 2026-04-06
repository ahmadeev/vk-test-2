import { Link } from 'react-router-dom';

export default function Fallback() {
    return (
        <div
            style={{
                textAlign: 'center',
            }}
        >
            <h1>Что-то пошло не так...</h1>
            <p>Возникла непредвиденная ошибка.</p>
            <p>Пожалуйста, сообщите администратору системы о произошедшем.</p>
            <Link to={'/'}>На домашнюю</Link>
        </div>
    );
}