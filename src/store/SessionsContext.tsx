/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, type ReactNode } from 'react';

type Session = {
    id: string;
    title: string;
    summary: string;
    description: string;
    duration: number;
    date: string;
    image: string;
};

type SessionState = {
    sessions: Session[];
};

type SessionContextValue = SessionState & {
    bookSession: (session: Session) => void;
    cancelSession: (id: string) => void;
};

type BookSessionAction = {
    type: 'BOOK_SESSION';
    payload: Session;
};

type CancelSessionAction = {
    type: 'CANCEL_SESSION';
    payload: string;
};

type SessionAction = BookSessionAction | CancelSessionAction;

type SessionsContextProviderProps = {
    children: ReactNode;
};

// create the context
const SessionsContext = createContext<SessionContextValue | null>(null);

// custom hook
export const useSessionContext = () => {
    const ctx = useContext(SessionsContext);
    if (!ctx) {
        throw new Error('You are using the Sessions Context outside of its scope.');
    }

    return ctx;
};

const initialState: SessionState = {
    sessions: [],
};

const reducer = (state: SessionState, action: SessionAction): SessionState => {
    switch (action.type) {
        case 'BOOK_SESSION':
            if (state.sessions.some((s) => s.id === action.payload.id)) {
                return state;
            } else {
                return {
                    sessions: [...state.sessions, action.payload],
                };
            }

        case 'CANCEL_SESSION':
            return {
                sessions: [...state.sessions.filter((s) => s.id !== action.payload)],
            };

        default:
            return state;
    }
};

export const SessionsContextProvider = ({ children }: SessionsContextProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleBookSession = (session: Session) => {
        dispatch({ type: 'BOOK_SESSION', payload: session });
    };

    const handleCancelSession = (sessionId: string) => {
        dispatch({ type: 'CANCEL_SESSION', payload: sessionId });
    };

    const value = {
        sessions: state.sessions,
        bookSession: handleBookSession,
        cancelSession: handleCancelSession,
    };
    return <SessionsContext.Provider value={value}>{children}</SessionsContext.Provider>;
};
