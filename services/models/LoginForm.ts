export interface LoginInterface {
    email: string,
    password: string
}

export interface AdminLoginInterface {
    login: string,
    password: string
}

export interface ChangePassword {
    oldPassword: string,
    newPassword: string
}