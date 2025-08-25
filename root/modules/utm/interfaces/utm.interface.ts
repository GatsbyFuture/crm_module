export interface IUtm {
    id: number;
    url: string;
    utm_source: string;
    utm_content: string;
    utm_medium: string;
    utm_term: string;
    utm_campaign: string;
    meta: object;
    is_active: boolean;
    created_id: Date;
}