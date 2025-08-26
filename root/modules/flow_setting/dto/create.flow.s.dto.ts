export interface CreateFlowSDto {
    readonly platform_id: number;
    readonly platform_code: string;

    readonly name: string;

    readonly board_id: number;
    readonly column_id: number;

    readonly title: string;
    readonly desc: string;
    readonly priority_id: number;

    readonly meta: object;
}