export interface registerUserResponse {
    id: string;
    email: string;
    name: string;
    role: string;
    createdAt: string;
}

export interface registerUserData {
    email: string;
    password: string;
    name: string;
    role: string;
}

export interface loginUserData {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
        partnerId: string | null;
        partnerCustomerId: string | null;
        createdAt: string;
    }
}