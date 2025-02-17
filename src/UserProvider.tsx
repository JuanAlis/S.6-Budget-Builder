import React, { useState, useContext, createContext } from "react";


type User = {
    name: string;
    email: string;
    telefono: number;
}


type UserContextType = User | null;

const userContext = createContext<UserContextType | null>(null);

type UserToggleContextType = (name: string, emial: string, telefono: number) => void;

const userToggleContext = createContext<UserToggleContextType | undefined>(undefined);


export function useUserContext(){
    return useContext(userContext);
}


export function useUserToogleContext (){
    return useContext(userToggleContext);
}




type UserProviderProps = {
    children : React.ReactNode
}
export function UserProvider({children}: UserProviderProps) {

    const [user, setUser] = useState<User | null>(null);

    const cambiaLogin = (name: string, email: string, telefono:number) => {
        if (user) {
            setUser(null);
        } else {
            setUser({
                name,
                email,
                telefono
            });
        }
    }




    return (
        <userContext.Provider value={user}>
            <userToggleContext.Provider value={cambiaLogin}>
                {children}
            </userToggleContext.Provider>
        </userContext.Provider>

    );

}