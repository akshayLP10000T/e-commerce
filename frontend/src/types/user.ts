export interface User{
    _id: string;
    fullName: string;
    email: string;
    contactNumber: number;
    address: string;
    storeOwner: boolean;
    appliedForStore: boolean;
    store: string;
    admin: boolean;
}