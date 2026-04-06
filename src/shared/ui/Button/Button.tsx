import styles from './Button.module.css';
import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    variant?: 'primary' | 'secondary' | 'link';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, variant = 'primary', disabled = false, className = '', ...props }, ref) => {
        return (
            <>
                <button
                    ref={ref}
                    className={`
                        ${styles.button} 
                        ${styles[variant]} 
                        ${disabled ? styles.disabled : ''}
                        ${className}
                    `}
                    disabled={disabled}
                    {...props}
                >
                    {children}
                </button>
            </>
        );
    },
);
