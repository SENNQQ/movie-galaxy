export type LoginForm = {
    email: string
    password: string
}

export type registerForm = {
    email: string
    nickname: string
    password: string
}

export type UserType = {
    clients_id: string
    nickname: string
    email: string
    birthdate?: string
    sex?: string
    name?: string
    patronymic?: string
    surname?: string
    phone_number?: string
    admin: string
    token: string
}

export type ErrorType = {
    code: number,
    message: string
}