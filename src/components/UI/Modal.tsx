import { forwardRef, useImperativeHandle, useMemo, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

export type ModalHandle = {
    open: () => void;
    close: () => void;
};

type ModalProps = {
    children: ReactNode;
    onClose: () => void;
};

const Modal = forwardRef<ModalHandle, ModalProps>(function Modal({ children, onClose }, ref) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => {
        return {
            open: () => {
                if (dialogRef.current) {
                    dialogRef.current.showModal();
                }
            },

            close: () => {
                if (dialogRef.current) {
                    dialogRef.current.close();
                }
            },
        };
    });

    const modalRoot = useMemo(() => document.getElementById('modal-root'), []);

    if (!modalRoot) {
        console.error('modal-root element not found!');
        return null;
    }

    return createPortal(
        <dialog onClose={onClose} className='modal' ref={dialogRef}>
            {children}
        </dialog>,
        modalRoot
    );
});

export default Modal;
