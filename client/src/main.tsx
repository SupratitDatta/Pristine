import React from "react";
import { createRoot } from 'react-dom/client'
import App from "./App.tsx";
import { AuthContextProvider } from "./context/AuthContext.js";

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </React.StrictMode>
);