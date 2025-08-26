export interface IFlowS {
    id: number;

    platform_id: number;
    platform_code: string;

    name: string;

    board_id: number;
    column_id: number;

    title: string;
    desc: string;
    priority_id: number;

    meta: object;

    is_active: boolean;
    updated_at: Date;
    created_at: Date;
}