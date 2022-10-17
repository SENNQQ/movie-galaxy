
export type LoginForm = {
    email: string
    password:string
    nickname:string
}

export type UserType = {
    _id: string
    username: string
    email?: string
    fullName: string
    phone?: string
    birthDate: string
    group: {
        _id: string
        title: string
    };
    address?: string
    studyPlace?: string
    facebook?: string
    instagram?: string
    social?: string
    avatar?: string
    isTeacher: boolean
    isAdmin: boolean
    stepCoins: number
    crystals: number
    coins: number
    badges: number
    token: string
}

export type ErrorType = { code: number, message: string } | null