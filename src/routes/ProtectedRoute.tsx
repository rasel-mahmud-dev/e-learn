import React from "react";
import {useAuthState} from "../store/authState.ts";


const ProtectedRoute = ({ children }) => {
    const { auth, authLoaded } = useAuthState();
    if (!authLoaded) return <h1>Loading...</h1>;

    if (authLoaded && auth) {
        return children;
    }

    return (
        <div>
            login
        </div>
    );
};




export default ProtectedRoute;