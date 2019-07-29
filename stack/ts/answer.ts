
class Answer {
    private answerEditor = <HTMLInputElement>document.getElementById('answer_editor');

    public init() {
        this.setInputListenerInAnswerEditor();
        this.addBoldListener();

    }


    private setInputListenerInAnswerEditor() {
        document.getElementById('answer_editor').oninput = () => {
            let text = this.answerEditor.value;
            this.showFormatedAnswer(text);
        }
    }

    private addBoldListener() {
        document.getElementById('boldBtn').addEventListener('click', ()=>{
           let value = this.answerEditor.value;
           let startIndex = this.answerEditor.selectionStart;
           let endIndex = this.answerEditor.selectionEnd;
           if(this.isBold(startIndex,endIndex)){
                this.removeBold(startIndex,endIndex);
                return;
           }
           this.addBold(startIndex,endIndex);
        });
    }

    private addBold(startIndex:number, endIndex:number){
        let value = this.answerEditor.value;
        let first_part = value.substring(0,startIndex);
        let second_part = value.substring(endIndex,value.length);
        let middle_part = value.substring(startIndex,endIndex);
        if(middle_part == "") middle_part = "write here";
        this.answerEditor.value = first_part +"**"+ middle_part+"**" + second_part;
        
        if(middle_part == "")this.selectText(startIndex+2, startIndex+12);
    }

    private removeBold(startIndex:number,endIndex:number){
        let value = this.answerEditor.value;
        let first_part = value.substring(0,startIndex-2);
        let second_part = value.substring(endIndex+2,value.length);
        let middle_part = value.substring(startIndex,endIndex);
        this.answerEditor.value = first_part + middle_part + second_part;
    }

    private isBold(startIndex:number,endIndex:number):boolean{
        let value = this.answerEditor.value;
        let prefix = value.substring(startIndex-2,startIndex);
        let suffix = value.substring(endIndex,endIndex+2);
        if(prefix == "**" && suffix == "**") return true;
        return false;
    }

    private addItalicListener() {

    }

    private addUnderLineListener() {

    }

    private addLinkListener() {

    }

    private addNewLineListener() {

    }

    private addOrderListListener() {

    }
    private addUnorderListListener() {

    }

    private addImageListener() {

    }

    private addHeadingener() {

    }

    private showFormatedAnswer(text: string) {
        let elem = document.getElementById('answer_display');
        elem.innerHTML = this.getHtml(text);
    }

    private getHtml(text: string): string {
        return "";
    }
    private selectText(startPos: number, endPos: number) {
        const input = <HTMLInputElement>document.getElementById('answer_editor');
        input.focus();
        input.setSelectionRange(startPos, endPos);
    }
}

new Answer().init();