export interface badge{
    background:string;
    icon:string;
}

export class Badge{
    public readonly platinumBadge = {
        background:'rgb(123, 160, 160)',
        icon:'plutinum-badge-icon'
    }

    public readonly goldBadge = {
        background:'rgb(231, 222, 171)',
        icon:'gold-badge-icon'
    }

    public readonly silverBadge = {
        background:'rgb(243, 243, 243)',
        icon:'silver-badge-icon'
    }

    public badges = new Map<string,badge >();

    constructor(){
        this.badges.set('platinum', this.platinumBadge);
        this.badges.set('silver', this.goldBadge);
        this.badges.set('gold', this.silverBadge);
    }

}