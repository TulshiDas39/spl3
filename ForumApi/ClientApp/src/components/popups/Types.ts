export interface ConfirmationDialogProps{
    onClose():void;
    onConfirm():void;
    children: JSX.Element;
    title:string;
}