export interface CreateLogDto {
    client_id: number;
    lead_id: number;
    task_id: number;

    board_id: number;
    column_id: number;

    meta: object;
}