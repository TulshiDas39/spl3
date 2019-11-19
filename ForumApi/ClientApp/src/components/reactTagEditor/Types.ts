interface tag {
    id: string,
    text: string
}
export interface ITagInput{
    tags:tag[];
    suggestions:any;
}
export interface ITagInputProps {
    additionHandler(tag: string): any;
    deleteHandler(i: number): any;
}