import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

type BaseButtonProps = {
    children: ReactNode;
    textOnly?: boolean;
};

type ButtonAsButton = BaseButtonProps &
    ComponentPropsWithoutRef<'button'> & {
        to?: never;
    };

type ButtonAsLink = LinkProps &
    BaseButtonProps & {
        to: string;
    };

type ButtonProps = ButtonAsButton | ButtonAsLink;

// type predicate
const isLink = (props: ButtonProps): props is ButtonAsLink => {
    return 'to' in props;
};

export default function Button(props: ButtonProps) {
    if (isLink(props)) {
        const { textOnly, children, to, ...otherProps } = props;
        return (
            <Link {...otherProps} to={to} className={`button ${textOnly ? 'button--text-only' : ''}`}>
                {children}
            </Link>
        );
    }
    const { textOnly, children, ...otherProps } = props;
    return (
        <button {...otherProps} className={`button ${textOnly ? 'button--text-only' : ''}`}>
            {children}
        </button>
    );
}
