"use strict";
class Answer {
    constructor() {
        this.answerEditor = document.getElementById('answer_editor');
    }
    init() {
        this.setInputListenerInAnswerEditor();
        this.addBoldListener();
    }
    setInputListenerInAnswerEditor() {
        document.getElementById('answer_editor').oninput = () => {
            let text = this.answerEditor.value;
            this.showFormatedAnswer(text);
        };
    }
    addBoldListener() {
        document.getElementById('boldBtn').addEventListener('click', () => {
            let value = this.answerEditor.value;
            let startIndex = this.answerEditor.selectionStart;
            let endIndex = this.answerEditor.selectionEnd;
            if (this.isBold(startIndex, endIndex)) {
                this.removeBold(startIndex, endIndex);
                return;
            }
            this.addBold(startIndex, endIndex);
            //    let first_part = value.substring(0, startIndex);
            //    let second_part = value.substring(endIndex,value.length);
            //    this.answerEditor.value = first_part +"**write here**" + second_part;
            //    this.selectText(startIndex+2, startIndex+12);
        });
    }
    addBold(startIndex, endIndex) {
        let value = this.answerEditor.value;
        let first_part = value.substring(0, startIndex);
        let second_part = value.substring(endIndex, value.length);
        let middle_part = value.substring(startIndex, endIndex);
        if (middle_part == "")
            middle_part = "write here";
        this.answerEditor.value = first_part + "**" + middle_part + "**" + second_part;
        if (middle_part == "")
            this.selectText(startIndex + 2, startIndex + 12);
    }
    removeBold(startIndex, endIndex) {
        let value = this.answerEditor.value;
        let first_part = value.substring(0, startIndex - 2);
        let second_part = value.substring(endIndex + 2, value.length);
        let middle_part = value.substring(startIndex, endIndex);
        this.answerEditor.value = first_part + middle_part + second_part;
    }
    isBold(startIndex, endIndex) {
        let value = this.answerEditor.value;
        let prefix = value.substring(startIndex - 2, startIndex);
        let suffix = value.substring(endIndex, endIndex + 2);
        if (prefix == "**" && suffix == "**")
            return true;
        return false;
    }
    addItalicListener() {
    }
    addUnderLineListener() {
    }
    addLinkListener() {
    }
    addNewLineListener() {
    }
    addOrderListListener() {
    }
    addUnorderListListener() {
    }
    addImageListener() {
    }
    addHeadingener() {
    }
    showFormatedAnswer(text) {
        let elem = document.getElementById('answer_display');
        elem.innerHTML = this.getHtml(text);
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