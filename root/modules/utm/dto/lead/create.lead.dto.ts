export interface CreateLeadDto {
    readonly platform_id: number;
    readonly client_id: number;
    readonly status: string;
    readonly extra: object;
    readonly time_period: Date;
}