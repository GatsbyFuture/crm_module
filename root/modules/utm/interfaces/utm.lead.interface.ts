export interface ILead {
    id: number;
    flow_id: number;

    client_id: number;

    call_id: number;
    booked: boolean;

    lead_services?: object[] | undefined;
    expected_income: number;
    real_income: number;
    extra_income: number;

    note: string;
    status: string;
    flow_source: string;
    linked_id: string;
    made_by: number;
    extra: object;
    time_period: Date;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}