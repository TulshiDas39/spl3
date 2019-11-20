import { ITag, IUser } from "../../utils/Models";
import { ITagInfo } from "../../utils/Structures";

export interface ITagListHeadProps{
    onNewTagCreated(tag:ITagInfo):void;
    onSearch(event:React.ChangeEvent<HTMLInputElement>):void;
}

export interface ITagContainer{
    tagsInfo:ITagInfo[];
    userInfo:IUser;
    onUpdate():void;
}