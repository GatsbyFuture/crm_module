export interface CreateTaskDto {
    board_id: number;
    column_id: number;
    title: string;
    due_date: Date;
    has_lead: boolean;
    lead_id: number;
    meta: object;
}