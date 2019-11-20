export interface ConfirmationDialogProps{
    onClose():void;
    onConfirm():void;
    children: JSX.Element;
    title:string;
}

export interface InputDialogProps{
    onInput(value:string):void;
    children:JSX.Element;
    title:string;
}