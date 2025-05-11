export class UrlService
{

    public static getHome(): string
    {
        return '/';
    }

    public static getPoker(): string
    {
        return '/poker';
    }

    public static getPokerCreate(): string
    {
        return '/poker/create';
    }

    public static getPokerMyPokers(): string
    {
        return "/poker/my-pokers";
    }

    public static getPokerDisplay(pokerId: string): string
    {
        return "/poker/display/" + pokerId;
    }

    public static getAccountCreate(): string
    {
        return '/account';
    }

    public static getAccountLogout(): string
    {
        return '/account/logout';
    }

    public static getPagesRoadmap(): string
    {
        return "/pages/roadmap";
    }

    public static getPagesContact(): string
    {
        return "/pages/contact";
    }

    public static getPagesFaq(): string
    {
        return "/pages/faq";
    }

    public static getPagesPoker(): string
    {
        return "/pages/poker";
    }

    public static getPagesPokerLogicFragment(): string
    {
        return "logic";
    }

    public static getPagesPokerWhyFragment(): string
    {
        return "why";
    }

    public static getPagesFaqHowFragment(): string
    {
        return "how";
    }

    public static getPagesFaqWhyFragment(): string
    {
        return "why";
    }

    public static getPagesFaqWhoFragment(): string
    {
        return "who";
    }

    public static getPagesFaqWhenFragment(): string
    {
        return "when";
    }

    public static getPagesFuture(): string
    {
        return "/pages/future";
    }

    public static getPagesFutureAiPokerFragment(): string
    {
        return "ai-poker";
    }

    public static getPagesFutureJiraIntegrationFragment(): string
    {
        return "jira-integration";
    }

    public static getFacebook(): string
    {
        return "";
    }

    public static getInstagram(): string
    {
        return "";
    }

    public static getTwitter(): string
    {
        return "";
    }

    public static getPagesFaqNewScoringFragment():String
    {
        return "new-scoring";
    }
}
