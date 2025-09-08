export interface CreateUtmLeadDto {
    readonly phone_number: string;
    readonly full_name: {
        first_name: string;
        last_name: string;
        middle_name?: string;
    };
    readonly utm_source: string;
    readonly extra: object;
    readonly time_period: Date;
    readonly meta: object;
}