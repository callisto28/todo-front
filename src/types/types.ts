
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