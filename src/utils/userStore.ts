import { IUser } from "../models/IUser";

export const setUser = (user:IUser) => { 
    const stUser = JSON.stringify(user)
    localStorage.setItem('user', stUser)
}


export const getUser = ()  => {
    const stUser =localStorage.getItem('user')
    if(stUser){
        const userObj= JSON.parse(stUser);
        const user = userObj as IUser;
        return user;
    }
    return null;
}