import React, {createContext} from "react";
import { createRoot } from 'react-dom/client';
import App from "./components/App";

import "./css/flatly.min.css";
import "./css/style.css";
import "./css/fontawesome.all.min.css";

export const myContext = createContext();

const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
