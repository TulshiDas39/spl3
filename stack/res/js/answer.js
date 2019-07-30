"use strict";
class Answer {
    constructor() {
        this.answerEditor = document.getElementById('answer_editor');
        this.boldTags = ['<bold>', '</bold>', '<b>', '</b>'];
        this.italicTags = ['<italic>', '</italic>', '<i>', '</i>'];
        this.underLineTags = ['<underLine>', '</underLine>', '<u>', '</u>'];
        this.linkTags = ['<a href = "">', '</a>'];
        this.tabTag = '<tab>';
        this.unorderListTags = ['<unorder-list>', '</unorder-list>'];
        this.orderListTags = ['<order-list>', '</order-list>'];
        this.listItemTags = ['<list-item>', '</list-item>'];
        this.headingTags = ['<heading>', '</heading>'];
    }
    init() {
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
    setInputListenerInAnswerEditor() {
        document.getElementById('answer_editor').oninput = () => {
            let text = this.answerEditor.value;
            this.showFormatedAnswer(text);
            window.scrollTo(0, document.body.scrollHeight);
        };
    }
    replaceNewLineByBreakTag(text) {
        let res = text.replace(/\n/g, "<br>");
        return res;
    }
    addBoldListener() {
        document.getElementById('boldBtn').addEventListener('click', () => {
            this.toogleTag(this.boldTags);
        });
    }
    addItalicListener() {
        document.getElementById('italicBtn').addEventListener('click', () => {
            this.toogleTag(this.italicTags);
        });
    }
    addLinkListener() {
        document.getElementById('linkBtn').addEventListener('click', () => {
            this.toogleTag(this.linkTags);
        });
    }
    addUnderLineListener() {
        document.getElementById('underLineBtn').addEventListener('click', () => {
            this.toogleTag(this.underLineTags);
        });
    }
    addTabListener() {
        document.getElementById('tabBtn').addEventListener('click', () => {
            this.insertTag(this.tabTag);
        });
    }
    addOrderListListener() {
        document.getElementById('orderListBtn').addEventListener('click', () => {
            let startIndex = this.answerEditor.selectionStart;
            this.insertTag("\n" + this.orderListTags[0] + "\n\t");
            this.insertTag(this.listItemTags[0] + "write here" + this.listItemTags[1]);
            this.insertTag('\n' + this.orderListTags[1] + "\n");
            let selectionStart = startIndex + this.orderListTags[0].length + 3 + this.listItemTags[0].length;
            this.selectText(selectionStart, selectionStart + "write here".length);
        });
    }
    addUnOrderListListener() {
        document.getElementById('unorderListBtn').addEventListener('click', () => {
            let startIndex = this.answerEditor.selectionStart;
            this.insertTag("\n" + this.unorderListTags[0] + "\n\t");
            this.insertTag(this.listItemTags[0] + "write here" + this.listItemTags[1]);
            this.insertTag('\n' + this.unorderListTags[1] + "\n");
            let selectionStart = startIndex + this.unorderListTags[0].length + 3 + this.listItemTags[0].length;
            this.selectText(selectionStart, selectionStart + "write here".length);
        });
    }
    addHeadingListener() {
        document.getElementById('headingBtn').addEventListener('click', () => {
            this.toogleTag(this.headingTags);
        });
    }
    insertTag(tag) {
        let startIndex = this.answerEditor.selectionStart;
        let value = this.answerEditor.value;
        let first_part = value.substring(0, startIndex);
        let second_part = value.substring(startIndex, value.length);
        this.answerEditor.value = first_part + tag + second_part;
    }
    toogleTag(tags) {
        let value = this.answerEditor.value;
        let startIndex = this.answerEditor.selectionStart;
        let endIndex = this.answerEditor.selectionEnd;
        if (this.isTagExist(startIndex, endIndex, tags)) {
            this.removeTag(startIndex, endIndex, tags);
            return;
        }
        this.addTag(startIndex, endIndex, tags);
    }
    addTag(startIndex, endIndex, tags) {
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
    removeTag(startIndex, endIndex, tags) {
        let value = this.answerEditor.value;
        let first_part = value.substring(0, startIndex - tags[0].length);
        let second_part = value.substring(endIndex + tags[1].length, value.length);
        let middle_part = value.substring(startIndex, endIndex);
        if (middle_part == "write here")
            middle_part = "";
        this.answerEditor.value = first_part + middle_part + second_part;
        this.selectText(startIndex - tags[0].length, startIndex + middle_part.length - tags[0].length);
    }
    isTagExist(startIndex, endIndex, tags) {
        let value = this.answerEditor.value;
        let prefix = value.substring(startIndex - tags[0].length, startIndex);
        let suffix = value.substring(endIndex, endIndex + tags[1].length);
        if (prefix == tags[0] && suffix == tags[1])
            return true;
        return false;
    }
    addImageListener() {
    }
    replaceAnchors(parentNode) {
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
    replaceTags(parentNode, oldTagName, newTagName) {
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
    getHtml(text) {
        let html = document.createElement('div');
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
    replaceAll(str, replacement, replaceBy) {
        let re = new RegExp(replacement, "g");
        return str.replace(re, replaceBy);
    }
    showFormatedAnswer(text) {
        let elem = document.getElementById('answer_display');
        text = this.replaceAll(text, "\n" + this.orderListTags[0] + "\n", this.orderListTags[0]);
        text = this.replaceAll(text, "\n" + this.orderListTags[0], this.orderListTags[0]);
        text = this.replaceAll(text, "\n" + this.unorderListTags[0] + "\n", this.unorderListTags[0]);
        text = this.replaceAll(text, '<tab/>', '&nbsp;&nbsp;&nbsp;&nbsp;');
        text = this.replaceAll(text, '\n', '<br>');
        elem.innerHTML = this.getHtml(text);
    }
    selectText(startPos, endPos) {
        const input = document.getElementById('answer_editor');
        input.focus();
        input.setSelectionRange(startPos, endPos);
    }
}
new Answer().init();
//# sourceMappingURL=answer.js.map