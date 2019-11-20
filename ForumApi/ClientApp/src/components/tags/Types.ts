import { ITag } from "../../utils/Models";

export interface ITagListHeadProps{
    onNewTagCreated(tag:ITag):void;
}

export interface ITagContainer{
    newTag?:ITag;
}