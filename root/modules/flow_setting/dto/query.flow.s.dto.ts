export interface QueryFlowSDto {
    readonly id: number;
    readonly platform_id: number;
    readonly platform_code: string;

    readonly name: string;

    readonly board_id: number;
    readonly column_id: number;

    readonly priority_id: number;

    readonly is_active: boolean;
}