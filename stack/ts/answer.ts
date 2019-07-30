
class Answer {
    private answerEditor = <HTMLInputElement>document.getElementById('answer_editor');
    private boldTags = ['<bold>', '</bold>', '<b>', '</b>'];
    private italicTags = ['<italic>', '</italic>', '<i>', '</i>'];
    private underLineTags = ['<underLine>', '</underLine>', '<u>', '</u>'];
    private linkTags = ['<a href = "">', '</a>'];
    private tabTag = '<tab>';
    private unorderListTags = ['<unorder-list>', '</unorder-list>'];
    private orderListTags = ['<order-list>', '</order-list>'];
    private listItemTags = ['<list-item>', '</list-item>'];
    private headingTags = ['<heading>', '</heading>'];


    public init() {
        this.setInputListenerInAnswerEditor();
        this.addBoldListener();
        this.addItalicListener();
        this.addUnderLineListener();
        this.addLinkListener();
        this.addTabListener();
        this.addOrderListListener();
        this.addUnOrderListListener();
        this.addHeadingListener();

    }


    private setInputListenerInAnswerEditor() {
        document.getElementById('answer_editor').oninput = () => {
            let text = this.answerEditor.value;
            this.showFormatedAnswer(text);
            window.scrollTo(0, document.body.scrollHeight);
        }
    }

    private replaceNewLineByBreakTag(text: string): string {
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

    private addLinkListener() {
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

    private addOrderListListener() {
        document.getElementById('orderListBtn').addEventListener('click', () => {
            let startIndex = this.answerEditor.selectionStart;
            this.insertTag("\n" + this.orderListTags[0] + "\n\t");
            this.insertTag(this.listItemTags[0] + "write here" + this.listItemTags[1]);
            this.insertTag('\n' + this.orderListTags[1] + "\n");
            let selectionStart = startIndex + this.orderListTags[0].length + 3 + this.listItemTags[0].length;

            this.selectText(selectionStart, selectionStart + "write here".length);
        });
    }

    private addUnOrderListListener() {
        document.getElementById('unorderListBtn').addEventListener('click', () => {
            let startIndex = this.answerEditor.selectionStart;
            this.insertTag("\n" + this.unorderListTags[0] + "\n\t");
            this.insertTag(this.listItemTags[0] + "write here" + this.listItemTags[1]);
            this.insertTag('\n' + this.unorderListTags[1] + "\n");
            let selectionStart = startIndex + this.unorderListTags[0].length + 3 + this.listItemTags[0].length;

            this.selectText(selectionStart, selectionStart + "write here".length);
        });
    }

    private addHeadingListener() {
        document.getElementById('headingBtn').addEventListener('click', () => {
            this.toogleTag(this.headingTags);
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

    }

    private replaceAnchors(parentNode: HTMLElement) {
        let oldTags = parentNode.getElementsByTagName('link');
        let urls = [];


        for (let i = 0; i < oldTags.length; i++) {
            urls.push(oldTags[i].getAttribute('url'));
            console.log(oldTags[i]);
        }

        while (oldTags.length != 0) {
            let oldTag = oldTags[0];
            let newTag = document.createElement('a');
            newTag.innerHTML = oldTag.innerHTML;
            newTag.href = urls.shift();
            console.log(newTag);
            oldTag.parentNode.replaceChild(newTag, oldTag);

        }

        return parentNode;
    }

    private replaceTags(parentNode: HTMLElement, oldTagName: string, newTagName: string) {
        let oldTags = parentNode.getElementsByTagName(oldTagName);

        while (oldTags.length != 0) {
            let oldTag = oldTags[0];
            let newTag = document.createElement(newTagName);
            newTag.innerHTML = oldTag.innerHTML;
            console.log(newTag);
            oldTag.parentNode.replaceChild(newTag, oldTag);

        }

        return parentNode;

    }

    // private repaireAnchor(html: HTMLElement) {
    //     let anchors = html.getElementsByTagName('a');
    //     for (let i = 0; i < anchors.length; i++) {
    //         console.log(anchors[i]);
    //         console.log(anchors[i].getAttribute('url'));
    //         anchors[i].setAttribute('href', anchors[i].getAttribute('url'));
    //         anchors[i].removeAttribute('url');
    //     }
    //     return html;
    // }

    private getHtml(text: string): string {
        let html: HTMLElement = document.createElement('div');
        html.innerHTML = text;
        html = this.replaceTags(html, 'bold', 'b');
        html = this.replaceTags(html, 'italic', 'i');
        html = this.replaceTags(html, 'underLine', 'u');
        //html = this.replaceTags(html, 'link', 'a');
        html = this.replaceTags(html, 'unorder-list', 'ul');
        html = this.replaceTags(html, 'order-list', 'ol');
        html = this.replaceTags(html, 'list-item', 'li');
        html = this.replaceTags(html, 'heading', 'h2');

        //html = this.replaceAnchors(html);

        return html.innerHTML;
    }

    private replaceAll(str: string, replacement: string, replaceBy: string): string {
        let re = new RegExp(replacement, "g");
        return str.replace(re, replaceBy);

    }

    private showFormatedAnswer(text: string) {
        let elem = document.getElementById('answer_display');
        text = this.replaceAll(text, "\n" + this.orderListTags[0] + "\n", this.orderListTags[0]);
        text = this.replaceAll(text, "\n" + this.orderListTags[0], this.orderListTags[0]);

        text = this.replaceAll(text, "\n" + this.unorderListTags[0] + "\n", this.unorderListTags[0]);
        text = this.replaceAll(text, '<tab/>', '&nbsp;&nbsp;&nbsp;&nbsp;');
        text = this.replaceAll(text, '\n', '<br>');
        elem.innerHTML = this.getHtml(text);
    }

    private selectText(startPos: number, endPos: number) {
        const input = <HTMLInputElement>document.getElementById('answer_editor');
        input.focus();
        input.setSelectionRange(startPos, endPos);
    }
}

new Answer().init();