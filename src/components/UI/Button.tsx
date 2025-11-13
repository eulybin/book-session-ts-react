import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type ButtonProps = {
    children: ReactNode;
    to?: string;
    textOnly?: boolean;
};

export default function Button({ children, to, textOnly }: ButtonProps) {
    if (to) {
        return (
            <Link className={`button ${textOnly ? 'button--text-only' : ''}`} to={to}>
                {children}
            </Link>
        );
    }
    return <button className={`button ${textOnly ? 'button--text-only' : ''}`}>{children}</button>;
}
