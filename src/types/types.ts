
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

// export type Todo = {
//     id: number,
//     title: string,
//     description: string,
//     completed: boolean
// }

export type User = {

    username: string,
    lastname: string,
    firstname: string,
    password: string

}