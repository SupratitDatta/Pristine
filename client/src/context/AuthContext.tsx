import { createContext, useEffect, useState, ReactNode } from "react";

interface User {
    email: string;
    username: string;
    password: string;
    avatar?: string;
    createdAt: Date;
    posts: string[];
    savedPosts: string[];
    chatIDs: string[];
}

interface AuthContextType {
    currentUser: User | null;
    updateUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(
        JSON.parse(localStorage.getItem("user") as string) || null
    );

    const updateUser = (user: User | null) => {
        setCurrentUser(user);
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};