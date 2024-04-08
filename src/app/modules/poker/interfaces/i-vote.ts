export interface IVote
{
    id: number;
    ticketId: string;
    uncertainty: number;
    complexity: number;
    effort: number;
    calculatedPoint: number;
    createdBy: string;
}
