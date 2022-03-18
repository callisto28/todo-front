
export interface IRegister {

    username: string;
    password: string;
    lastname: string;
    firstname: string;
}

export type ILogin = IRegister;

export interface ISignin {
    username: string,
    password: string
}

export type RouteParams = {
    Register: {
        username: string,
        password: string,
        lastname: string,
        firstname: string
    };
    Login: {
        username: string,
        password: string
    }

}