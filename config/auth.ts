import Cookies from 'js-cookie'
import Router from 'next/router';

export const setUserCookie = (data: any) => {
    if(typeof window === 'undefined'){
        return;
    }
    Cookies.set('id', data.user.id);
    Cookies.set('username', data.user.username);
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

export const getUserIdFromCookie = () => {
    return Cookies.get('id')
}
export const getUserNameFromCookie = () => {
    return Cookies.get('username')
}
export const getUserTokenFromCookie = () => {
    return Cookies.get('jwt')
}