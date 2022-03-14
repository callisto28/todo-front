

export default function AuthService() {
    const user: any = JSON.parse(localStorage.getItem('user') as string);
    if (user && user.access_token) {
        return { Authorization: 'Bearer ' + user.access_token };
    } else {
        return {}
    }
}