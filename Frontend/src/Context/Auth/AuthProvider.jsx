// import { AuthContext } from "./AuthContext";
// import { useState } from "react";

// import React from 'react'

// const AuthProvider = ({ children }) => {


//     const user = JSON.stringify(localStorage.getItem("user")) || {};
//     const [FirstName, setFirstName] = useState(null);
//     const [LastName, setLastName] = useState(null);
//     const [Email, setEmail] = useState();
//     const [Password, setPassword] = useState();
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
    
//     setEmail(localStorage.getItem(user.Email));
//     setPassword(localStorage.getItem(user.Password));

//     const findNames = async () => {
//         const response = await fetch(`http://localhost:3000/users/email/${Email}`);
    
//         const data = await response.json();
//         if (data.success) {
//             setFirstName(data.data.FirstName);
//             setLastName(data.data.LastName);
//             setIsAuthenticated(true);
//         } else {
//             console.error("Failed to fetch user data:", data.message);
//         }

//     };

//     findNames();

//     // const logout = () => {
//     //     localStorage.removeItem(user);
//     //     setPassword(null);
//     //     setEmail(null);
//     // };

//     return (
//         <AuthContext.Provider
//             value={{ FirstName, LastName, Email, Password, isAuthenticated }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// }

// export default AuthProvider



// import { set } from "mongoose";
import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";
import React from 'react';

const AuthProvider = ({ children }) => {
    const [FirstName, setFirstName] = useState(null);
    const [LastName, setLastName] = useState(null);
    const [Email, setEmail] = useState(null);
    const [Password, setPassword] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize user data from localStorage on component mount
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const storedUser = localStorage.getItem("user");
                
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    
                    // Check if parsed user has the required fields
                    if (parsedUser.Email && parsedUser.Password) {
                        setEmail(parsedUser.Email);
                        setPassword(parsedUser.Password);
                        
                        // Fetch user details from backend
                        await findUserData(parsedUser.Email);
                    } else {
                        // Invalid stored data, clear it
                        localStorage.removeItem("user");
                    }
                }
            } catch (error) {
                console.error("Error parsing stored user data:", error);
                localStorage.removeItem("user");
            }
            
            setIsLoading(false);
        };

        initializeAuth();
    }, []); // Empty dependency array - runs only once on mount

    const findUserData = async (email) => {
        try {
            const response = await fetch(`http://localhost:3000/users/email/${email}`);
            const data = await response.json();
            
            if (response.ok && data.success) {
                setFirstName(data.data.FirstName);
                setLastName(data.data.LastName);
                setIsAuthenticated(true);
            } else {
                console.error("Failed to fetch user data:", data.message);
                // If user not found or other error, clear stored data
                localStorage.removeItem("user");
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error("Network error while fetching user data:", error);
            setIsAuthenticated(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await fetch(`http://localhost:3000/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ Email: email, Password: password }),
            });

            const data = await response.json();
            
            if (response.ok && data.success) {
                // Update state
                setFirstName(data.data.FirstName);
                setLastName(data.data.LastName);
                setEmail(data.data.Email);
                setPassword(data.data.Password);
                setIsAuthenticated(true);
                
                // Store in localStorage
                localStorage.setItem("user", JSON.stringify({
                    Email: data.data.Email,
                    Password: data.data.Password
                }));
                
                return { success: true, message: "Login successful" };
            } else {
                return { success: false, message: data.message || "Login failed" };
            }
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, message: `Network error: ${error.message}` };
        }
    };

    const register = async (firstName, lastName, email, password) => {
        try {
            const response = await fetch(`http://localhost:3000/users/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    FirstName: firstName,
                    LastName: lastName,
                    Email: email,
                    Password: password,
                }),
            });
            setFirstName(firstName);
            setLastName(lastName);
            setEmail(email);
            setPassword(password);
            const data = await response.json();
            
            if (response.ok && data.success) {
                return { success: true, message: "Registration successful" };
            } else {
                return { success: false, message: data.message || "Registration failed" };
            }
        } catch (error) {
            console.error("Registration error:", error);
            return { success: false, message: `Network error: ${error.message}` };
        }
    };

    const logout = () => {
        // Clear all state
        setFirstName(null);
        setLastName(null);
        setEmail(null);
        setPassword(null);
        setIsAuthenticated(false);
        
        // Clear localStorage
        localStorage.removeItem("user");
    };

    // Helper functions
    const getFullName = () => {
        if (FirstName && LastName) {
            return `${FirstName} ${LastName}`;
        }
        return FirstName || LastName || '';
    };

    const getUserInitials = () => {
        const first = FirstName ? FirstName.charAt(0).toUpperCase() : '';
        const last = LastName ? LastName.charAt(0).toUpperCase() : '';
        return first + last;
    };

    const contextValue = {
        // User data
        FirstName,
        LastName,
        Email,
        Password,
        isAuthenticated,
        isLoading,
        
        // Helper methods
        getFullName,
        getUserInitials,
        
        // Auth methods
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;