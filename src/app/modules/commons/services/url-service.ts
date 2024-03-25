import {environment} from '../../../../environments/environment';

export class UrlService
{

    public static getHome(): string
    {
        return '/';
    }

    public static getCompaniesList(): string
    {
        return '/company';
    }

    public static getCompanyCreate(): string
    {
        return '/company/create';
    }

    public static getPoker(): string
    {
        return '/poker';
    }


    public static getPokerCreate(): string
    {
        return '/poker/create';
    }
}
