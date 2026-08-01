export const isLoggedIn = () =>
    !!localStorage.getItem("token");

export const getRole = () =>
    localStorage.getItem("role");

export const isAdmin = () =>
    getRole() === "ADMIN";

export const logout = () => {
    localStorage.clear();
};