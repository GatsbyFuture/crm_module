export interface IClient {
    id: number;
    full_name: {
        first_name: string;
        last_name: string;
        middle_name?: string;
    },
    phone_number: string;
    gender: string;
    birthdate: Date;
    lang: string;
    address?: string;
    made_by: number;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}