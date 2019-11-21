import { IUser } from "../../utils/Models";

export interface IUserContainerProps{
    users:IUser[];
}

export interface IUserProps{
    data:IUser;
}

export interface IUserHead{
    handleSearchUser(event: React.ChangeEvent<HTMLInputElement>):void;
}