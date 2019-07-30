
class Answer {
    private answerEditor = <HTMLInputElement>document.getElementById('answer_editor');
    private answerInHtml: string;
    private boldTags = ['<bold>', '</bold>'];
    private italicTags = ['<italic>', '</italic>'];
    private underLineTags = ['<underLine>', '</underLine>'];
    private linkTags = ['<link url = "">','</link>'];
    private tabTag = '<tab>';
    private unorderListTags = ['<unorder-list>','</unorder-list>'];
    private orderListTags = ['<order-list>','</order-list>'];
    private listItemTags = ['<list-item>','</list-item>'];


    public init() {
        this.setInputListenerInAnswerEditor();
        this.addBoldListener();
        this.addItalicListener();
        this.addUnderLineListener();
        this.addLinkListener();
        this.addTabListener();
        this.addOrderListListener();
        this.addUnOrderListListener();

    }


    private setInputListenerInAnswerEditor() {
        document.getElementById('answer_editor').oninput = () => {
            let text = this.answerEditor.value;
            let html = this.replaceNewLineByBreakTag(text);
            this.showFormatedAnswer(html);
        }
    }

    // private replaceUnnecessaryLineBreak(text:string):string{
    //     let res = text.replace(this.orderListTags[0]+"\n\t"+"/g", this.orderListTags[0]);
    //     //'\n'+this.orderListTags[1]
    //     res = res.replace('\n'+this.orderListTags[1]+"/g", this.orderListTags[0]);
    //     return res;
    // }

    private replaceNewLineByBreakTag(text: string):string {
        let res = text.replace(/\n/g, "<br>");
        return res;
    }


    private addBoldListener() {
        document.getElementById('boldBtn').addEventListener('click', () => {
            this.toogleTag(this.boldTags);
        });
    }

    private addItalicListener() {
        document.getElementById('italicBtn').addEventListener('click', () => {
            this.toogleTag(this.italicTags);
        });
    }

    private addLinkListener(){
        document.getElementById('linkBtn').addEventListener('click', () => {
            this.toogleTag(this.linkTags);
        });
    }

    private addUnderLineListener() {
        document.getElementById('underLineBtn').addEventListener('click', () => {
            this.toogleTag(this.underLineTags);
        });
    }

    private addTabListener() {
        document.getElementById('tabBtn').addEventListener('click', () => {
            this.insertTag(this.tabTag);
        });
    }

    private addOrderListListener(){
        document.getElementById('orderListBtn').addEventListener('click', () => {
            let startIndex = this.answerEditor.selectionStart;
            this.insertTag(this.orderListTags[0]+"\n\t");
            this.insertTag(this.listItemTags[0]+"write here"+this.listItemTags[1]);
            this.insertTag('\n'+this.orderListTags[1]);
            let selectionStart = startIndex+this.orderListTags[0].length+2+this.listItemTags[0].length;

            this.selectText(selectionStart, selectionStart+ "write here".length);
        });
    }

    private addUnOrderListListener(){
        document.getElementById('unorderListBtn').addEventListener('click', () => {
            let startIndex = this.answerEditor.selectionStart;
            this.insertTag(this.unorderListTags[0]+"\n\t");
            this.insertTag(this.listItemTags[0]+"write here"+this.listItemTags[1]);
            this.insertTag('\n'+this.unorderListTags[1]);
            let selectionStart = startIndex+this.unorderListTags[0].length+2+this.listItemTags[0].length;

            this.selectText(selectionStart, selectionStart+ "write here".length);
        });
    }

    private insertTag(tag:string){
        let startIndex = this.answerEditor.selectionStart;
        let value = this.answerEditor.value;
        let first_part = value.substring(0, startIndex);
        let second_part = value.substring(startIndex, value.length);
        this.answerEditor.value = first_part + tag + second_part;
    }

    private toogleTag(tags: string[]) {
        let value = this.answerEditor.value;
        let startIndex = this.answerEditor.selectionStart;
        let endIndex = this.answerEditor.selectionEnd;
        if (this.isTagExist(startIndex, endIndex, tags)) {
            this.removeTag(startIndex, endIndex, tags);
            return;
        }
        this.addTag(startIndex, endIndex, tags);

    }

    private addTag(startIndex: number, endIndex: number, tags: string[]) {
        let value = this.answerEditor.value;
        let first_part = value.substring(0, startIndex);
        let second_part = value.substring(endIndex, value.length);
        let middle_part = value.substring(startIndex, endIndex);
        if (middle_part == "") {
            middle_part = "write here";
        }
        this.answerEditor.value = first_part + tags[0] + middle_part + tags[1] + second_part;

        this.selectText(startIndex + tags[0].length, startIndex + middle_part.length + tags[0].length);

    }

    private removeTag(startIndex: number, endIndex: number, tags: string[]) {
        let value = this.answerEditor.value;
        let first_part = value.substring(0, startIndex - tags[0].length);
        let second_part = value.substring(endIndex + tags[1].length, value.length);
        let middle_part = value.substring(startIndex, endIndex);
        if (middle_part == "write here") middle_part = "";
        this.answerEditor.value = first_part + middle_part + second_part;
        this.selectText(startIndex - tags[0].length, startIndex + middle_part.length - tags[0].length);

    }

    private isTagExist(startIndex: number, endIndex: number, tags: string[]): boolean {
        let value = this.answerEditor.value;
        let prefix = value.substring(startIndex - tags[0].length, startIndex);
        let suffix = value.substring(endIndex, endIndex + tags[1].length);
        if (prefix == tags[0] && suffix == tags[1]) return true;
        return false;
    }

    private addNewLineListener() {

    }

    private addUnorderListListener() {

    }

    private addImageListener() {

    }

    private addHeadingener() {

    }

    private showFormatedAnswer(text: string) {
        let elem = document.getElementById('answer_display');
        //elem.innerHTML = this.getHtml(text);
        elem.innerHTML = text;
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