import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
export const tokenDecode = () => {
    const token = Cookies.get('token');
    let userId = '';

    if (token) {
        const decoded = jwtDecode(token);
        userId = decoded.jti as string;
    }

    return userId;
};