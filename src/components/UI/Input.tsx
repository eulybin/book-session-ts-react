import { type ComponentPropsWithoutRef } from 'react';

type InputProps = {
    id: string;
    label: string;
} & ComponentPropsWithoutRef<'input'>;

export default function Input({ id, label, ...props }: InputProps) {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input id={id} name={id} {...props} />
        </div>
    );
}
