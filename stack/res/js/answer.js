"use strict";
class Answer {
    constructor() {
        this.answerEditor = document.getElementById('answer_editor');
        this.boldTags = ['<bold>', '</bold>'];
        this.italicTags = ['<italic>', '</italic>'];
        this.underLineTags = ['<underLine>', '</underLine>'];
        this.linkTags = ['<link url = "">', '</link>'];
        this.tabTag = '<tab>';
        this.unorderListTags = ['<unorder-list>', '</unorder-list>'];
        this.orderListTags = ['<order-list>', '</order-list>'];
        this.listItemTags = ['<list-item>', '</list-item>'];
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
    }
    setInputListenerInAnswerEditor() {
        document.getElementById('answer_editor').oninput = () => {
            let text = this.answerEditor.value;
            let html = this.replaceNewLineByBreakTag(text);
            this.showFormatedAnswer(html);
        };
    }
    // private replaceUnnecessaryLineBreak(text:string):string{
    //     let res = text.replace(this.orderListTags[0]+"\n\t"+"/g", this.orderListTags[0]);
    //     //'\n'+this.orderListTags[1]
    //     res = res.replace('\n'+this.orderListTags[1]+"/g", this.orderListTags[0]);
    //     return res;
    // }
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
            this.insertTag(this.orderListTags[0] + "\n\t");
            this.insertTag(this.listItemTags[0] + "write here" + this.listItemTags[1]);
            this.insertTag('\n' + this.orderListTags[1]);
            let selectionStart = startIndex + this.orderListTags[0].length + 2 + this.listItemTags[0].length;
            this.selectText(selectionStart, selectionStart + "write here".length);
        });
    }
    addUnOrderListListener() {
        document.getElementById('unorderListBtn').addEventListener('click', () => {
            let startIndex = this.answerEditor.selectionStart;
            this.insertTag(this.unorderListTags[0] + "\n\t");
            this.insertTag(this.listItemTags[0] + "write here" + this.listItemTags[1]);
            this.insertTag('\n' + this.unorderListTags[1]);
            let selectionStart = startIndex + this.unorderListTags[0].length + 2 + this.listItemTags[0].length;
            this.selectText(selectionStart, selectionStart + "write here".length);
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
    addNewLineListener() {
    }
    addUnorderListListener() {
    }
    addImageListener() {
    }
    addHeadingener() {
    }
    showFormatedAnswer(text) {
        let elem = document.getElementById('answer_display');
        //elem.innerHTML = this.getHtml(text);
        elem.innerHTML = text;
    }
    getHtml(text) {
        return "";
    }
    selectText(startPos, endPos) {
        const input = document.getElementById('answer_editor');
        input.focus();
        input.setSelectionRange(startPos, endPos);
    }
}
new Answer().init();
//# sourceMappingURL=answer.js.map