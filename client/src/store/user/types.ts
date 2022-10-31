export type LoginForm = {
    email: string
    password: string
}

export type registerForm = {
    email: string
    nickname: string
    password: string
}

export type updateForm = {
    id: string
    surname: string;
    name: string;
    patronymic: string;
    nickname: string;
    phone: string;
    email: string;
    birthDate: string;
    sex: boolean;
}

export type UserType = {
    clients_id: string
    nickname: string
    email: string
    birthdate: string
    avatar:string
    sex: boolean
    name: string
    patronymic: string
    surname: string
    phone_number: string
    admin: boolean
    token: string
    joined: string
}

export type ErrorType = {
    code: number,
    message: string
}