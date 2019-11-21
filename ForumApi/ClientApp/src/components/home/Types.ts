export interface IHomeProps{
    history: string[];
    match: {
        params: {
            search: string;
        }
    }
}

export interface IRightProps{
    search?:string;
}