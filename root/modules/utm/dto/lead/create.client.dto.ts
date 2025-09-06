export interface CreateClientDto {
    readonly phone_number: string;
    readonly full_name: {
        first_name: string;
        last_name: string;
        middle_name?: string;
    };
}