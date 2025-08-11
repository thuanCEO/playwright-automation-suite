export interface IUser {
    userId: string;
    userName: string;
    userAddress: string;
    userPhone: string;
    userEmail: string;
    userSubject: Record<string, any>;
    isActive: boolean;
    userBir: number;
}