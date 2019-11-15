
export class Editor {
 
    private editor:HTMLDivElement;
    private textArea:HTMLTextAreaElement;
    private answerdisplay:HTMLDivElement;
    private boldTags = ['<b>', '</b>', '<b>', '</b>'];
    private italicTags = ['<i>', '</i>', '<i>', '</i>'];
    private underLineTags = ['<u>', '</u>', '<u>', '</u>'];
    private linkTags = ['<a href = "">', '</a>'];
    private tabTag = '&nbsp;&nbsp;&nbsp;&nbsp;';
    private unorderListTags = ['\n<ul>\n\t<li>', '</li>\n</ul>'];
    private orderListTags = ['\n<ol>\n\t<li>', '</li>\n</ol>'];
    private listItemTags = ['\t<li>', '</li>'];
    private headingTags = ['<h3>', '</h3>'];
    private newLineTag = '<br>';


    constructor(editor:HTMLDivElement, innerHtml:string){

        this.editor = editor;
        this.textArea = editor.getElementsByClassName("inputArea")[0] as HTMLTextAreaElement;
        this.answerdisplay = editor.getElementsByClassName("outputArea")[0] as HTMLDivElement;
        this.textArea.value = innerHtml;
        this.init();
    }

    private init() {
        this.setInputListenerInAnswerEditor();
        this.addBoldListener();
        this.addItalicListener();
        this.addLinkListener();
        this.addTabListener();
        this.addOrderListListener();
        this.addUnOrderListListener();
        this.addHeadingListener();
        this.addImageListener();
        this.addNewLineListener();
    }

    private setInputListenerInAnswerEditor() {
        this.textArea.oninput = () => {
            this.displayChanges();
        }
    }

    private displayChanges() {
        this.answerdisplay.innerHTML = this.textArea.value;;
        window.scrollTo(0, document.body.scrollHeight);
    }

    private addNewLineListener() {
        this.editor.getElementsByClassName('newLineBtn')[0].addEventListener('click', () => {
            this.insertTag(this.newLineTag);
            this.displayChanges()
        });
    }
    private addBoldListener() {
        this.editor.getElementsByClassName('boldBtn')[0].addEventListener('click', () => {
            this.toogleTag(this.boldTags);
            this.displayChanges();
        });
    }

    private addItalicListener() {
        this.editor.getElementsByClassName('answer_editor_topbar_italic')[0].addEventListener('click', () => {
            this.toogleTag(this.italicTags);
            this.displayChanges();
        });
    }

    private addLinkListener() {
        this.editor.getElementsByClassName('answer_editor_topbar_hyperlink')[0].addEventListener('click', () => {
            this.toogleTag(this.linkTags);
            this.displayChanges();
        });
    }

    private addTabListener() {
        this.editor.getElementsByClassName('tabBtn')[0].addEventListener('click', () => {
            this.insertTag(this.tabTag);
            this.displayChanges();
        });
    }

    private addOrderListListener() {
        this.editor.getElementsByClassName('orderListBtn')[0].addEventListener('click', () => {
            this.toogleTag(this.orderListTags);
            this.displayChanges();
        });
    }

    private addUnOrderListListener() {
        this.editor.getElementsByClassName('unorderListBtn')[0].addEventListener('click', () => {
            this.toogleTag(this.unorderListTags);
            this.displayChanges();
        });
    }

    private addHeadingListener() {
        this.editor.getElementsByClassName('headingBtn')[0].addEventListener('click', () => {
            this.toogleTag(this.headingTags);
            this.displayChanges();
        })
    }

    private insertTag(tag: string) {
        let startIndex = this.textArea.selectionStart;
        let value = this.textArea.value;
        let first_part = value.substring(0, startIndex);
        let second_part = value.substring(startIndex, value.length);
        this.textArea.value = first_part + tag + second_part;
    }

    private toogleTag(tags: string[]) {
        let value = this.textArea.value;
        let startIndex = this.textArea.selectionStart;
        let endIndex = this.textArea.selectionEnd;
        if (this.isTagExist(startIndex, endIndex, tags)) {
            this.removeTag(startIndex, endIndex, tags);
            return;
        }
        this.addTag(startIndex, endIndex, tags);

    }

    private addTag(startIndex: number, endIndex: number, tags: string[]) {
        let value = this.textArea.value;
        let first_part = value.substring(0, startIndex);
        let second_part = value.substring(endIndex, value.length);
        let middle_part = value.substring(startIndex, endIndex);
        if (middle_part == "") {
            middle_part = "write here";
        }
        this.textArea.value = first_part + tags[0] + middle_part + tags[1] + second_part;

        this.selectText(startIndex + tags[0].length, startIndex + middle_part.length + tags[0].length);

    }

    private removeTag(startIndex: number, endIndex: number, tags: string[]) {
        let value = this.textArea.value;
        let first_part = value.substring(0, startIndex - tags[0].length);
        let second_part = value.substring(endIndex + tags[1].length, value.length);
        let middle_part = value.substring(startIndex, endIndex);
        if (middle_part == "write here") middle_part = "";
        this.textArea.value = first_part + middle_part + second_part;
        this.selectText(startIndex - tags[0].length, startIndex + middle_part.length - tags[0].length);

    }

    private isTagExist(startIndex: number, endIndex: number, tags: string[]): boolean {
        let value = this.textArea.value;
        let prefix = value.substring(startIndex - tags[0].length, startIndex);
        let suffix = value.substring(endIndex, endIndex + tags[1].length);
        if (prefix == tags[0] && suffix == tags[1]) return true;
        return false;
    }

    private addImageListener() {
        this.editor.getElementsByClassName('imageUpload')[0].addEventListener('click', () => {
            (this.editor.getElementsByClassName('imageUploader')[0] as HTMLInputElement).click();
        })

        this.editor.getElementsByClassName('imageUploader')[0].addEventListener('change', (event: Event) => {
            let file = (event.target as any).files[0];

            console.log(file);

            var reader = new FileReader();
            reader.onload = function () {
                var output = document.getElementById('output');
                // output.src = reader.result;
                console.log(reader.result);
            };
            reader.readAsDataURL(file);
        })

    }

    private selectText(startPos: number, endPos: number) {
        const input = <HTMLInputElement>document.getElementById('answer_editor');
        input.focus();
        input.setSelectionRange(startPos, endPos);
    }

    public updateEditor(value:string){
        this.textArea.value = value;
        this.displayChanges();
        this.scrollToView();
    }

    public getValue(){
        return this.textArea.value;
    }

    public scrollToView(){
        this.textArea.scrollIntoView();
    }

    public clear() {
        this.textArea.value = "";
    }
}
