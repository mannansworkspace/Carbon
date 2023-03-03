export default interface User {
        email: string;
        password: string;
        countryCode: string;
        firstName: string;
        lastName: string;
        phone: string;
        uuid?: string;
        loginType?: string;
        loginId?: string;
        registeredAt?: Date;
        emailConfirmed?: boolean;
}