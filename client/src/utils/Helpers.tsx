import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AuthData {
    token: string;
    user: any;
}

export const authenticate = (data: AuthData, next: () => void): void => {
    if (typeof window !== "undefined") {
        sessionStorage.setItem("token", JSON.stringify(data.token));
        sessionStorage.setItem("user", JSON.stringify(data.user));
    }
    next();
};

export const getToken = (): string | false => {
    if (typeof window !== "undefined") {
        const token = sessionStorage.getItem("token");
        return token ? JSON.parse(token) : false;
    }
    return false;
};


export const getUser = (): any | false => {
    if (typeof window !== "undefined") {
        const user = sessionStorage.getItem("user");
        return user ? JSON.parse(user) : false;
    }
    return false;
};


export const logout = (next: () => void): void => {
    if (typeof window !== "undefined") {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
    }
    next();
};

// --- Toast helpers ---
export const errMsg = (message = "") =>
    toast.error(message, {
        position: "bottom-center",
    });

export const successMsg = (message = "") =>
    toast.success(message, {
        position: "bottom-center",
    });

