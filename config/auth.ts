import axios from 'axios';
import Cookies from 'js-cookie'
import Router from 'next/router';
import { API_URL } from './config';

export const setUserCookie = (data: any) => {
    if(typeof window === 'undefined'){
        return;
    }
    // Cookies.set('id', data.user.id);
    // Cookies.set('username', data.user.username);
    Cookies.set('jwt', data.jwt);

    if(Cookies.get('username')){
        Router.push('/');
    }
}

export const unsetUserCookie = () => {
    if(typeof window === 'undefined'){
        return;
    }
    Cookies.remove('id');
    Cookies.remove('username');
    Cookies.remove('jwt');

    Router.push('/');
}

export const getUserNameFromCookie = () => {
    return Cookies.get('username');
}
export const getUserIdFromCookie = () => {
    return Cookies.get('id')
}
export const getUserTokenFromCookie = () => {
    return Cookies.get('jwt')
}

export const getTokenFromServerCookie = (req: any) => {
    if(!req.headers.cookie || ''){
        return undefined;
    }
    const serverCookieJwt = req.headers.cookie;
    const jwt = serverCookieJwt.split(";")[0].split("=")[1];
    return jwt;
}

export const verifyUser = async() => {
    const jwt = getUserTokenFromCookie();
    if(jwt){
        try {
            const verified = await axios.get(`${API_URL}/api/users/me`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            Cookies.set('username', verified.data.username);
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
    else{
        return false
    }
}