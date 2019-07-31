
class Answer {
    private answerEditor = <HTMLInputElement>document.getElementById('answer_editor');
    private answerdisplay = <HTMLInputElement>document.getElementById('answer_display');
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


    public init() {
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
        document.getElementById('answer_editor').oninput = () => {
            this.displayChanges();
        }
    }

    private displayChanges() {
        document.getElementById('answer_display').innerHTML = this.answerEditor.value;;
        window.scrollTo(0, document.body.scrollHeight);
    }

    private addNewLineListener() {
        document.getElementById('newLineBtn').addEventListener('click', () => {
            this.insertTag(this.newLineTag);
            this.displayChanges()
        });
    }
    private addBoldListener() {
        document.getElementById('boldBtn').addEventListener('click', () => {
            this.toogleTag(this.boldTags);
            this.displayChanges();
        });
    }

    private addItalicListener() {
        document.getElementById('italicBtn').addEventListener('click', () => {
            this.toogleTag(this.italicTags);
            this.displayChanges();
        });
    }

    private addLinkListener() {
        document.getElementById('linkBtn').addEventListener('click', () => {
            this.toogleTag(this.linkTags);
            this.displayChanges();
        });
    }

    private addTabListener() {
        document.getElementById('tabBtn').addEventListener('click', () => {
            this.insertTag(this.tabTag);
            this.displayChanges();
        });
    }

    private addOrderListListener() {
        document.getElementById('orderListBtn').addEventListener('click', () => {
            this.toogleTag(this.orderListTags);
            this.displayChanges();
        });
    }

    private addUnOrderListListener() {
        document.getElementById('unorderListBtn').addEventListener('click', () => {
            this.toogleTag(this.unorderListTags);
            this.displayChanges();
        });
    }

    private addHeadingListener() {
        document.getElementById('headingBtn').addEventListener('click', () => {
            this.toogleTag(this.headingTags);
            this.displayChanges();
        })
    }

    private insertTag(tag: string) {
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

    private addImageListener() {
        document.getElementById('imageUpload').addEventListener('click', () => {
            document.getElementById('imageUploader').click();
        })

        document.getElementById('imageUploader').addEventListener('change', (event: Event) => {
            let file = (<HTMLInputElement>event.target).files[0];

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
}

new Answer().init();