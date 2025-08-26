export interface CreateUtmTagDto {
    readonly url: string;
    readonly utm_source: string;
    readonly utm_content: string;
    readonly utm_medium: string;
    readonly utm_term: string;
    readonly utm_campaign: string;
    readonly meta: object;
}