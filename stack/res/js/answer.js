"use strict";
class Answer {
    constructor() {
        this.answerEditor = document.getElementById('answer_editor');
        this.answerdisplay = document.getElementById('answer_display');
        this.boldTags = ['<b>', '</b>', '<b>', '</b>'];
        this.italicTags = ['<i>', '</i>', '<i>', '</i>'];
        this.underLineTags = ['<u>', '</u>', '<u>', '</u>'];
        this.linkTags = ['<a href = "">', '</a>'];
        this.tabTag = '&nbsp;&nbsp;&nbsp;&nbsp;';
        this.unorderListTags = ['\n<ul>\n\t<li>', '</li>\n</ul>'];
        this.orderListTags = ['\n<ol>\n\t<li>', '</li>\n</ol>'];
        this.listItemTags = ['\t<li>', '</li>'];
        this.headingTags = ['<h3>', '</h3>'];
        this.newLineTag = '<br>';
    }
    init() {
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
    setInputListenerInAnswerEditor() {
        document.getElementById('answer_editor').oninput = () => {
            this.displayChanges();
        };
    }
    displayChanges() {
        document.getElementById('answer_display').innerHTML = this.answerEditor.value;
        ;
        window.scrollTo(0, document.body.scrollHeight);
    }
    addNewLineListener() {
        document.getElementById('newLineBtn').addEventListener('click', () => {
            this.insertTag(this.newLineTag);
            this.displayChanges();
        });
    }
    addBoldListener() {
        document.getElementById('boldBtn').addEventListener('click', () => {
            this.toogleTag(this.boldTags);
            this.displayChanges();
        });
    }
    addItalicListener() {
        document.getElementById('italicBtn').addEventListener('click', () => {
            this.toogleTag(this.italicTags);
            this.displayChanges();
        });
    }
    addLinkListener() {
        document.getElementById('linkBtn').addEventListener('click', () => {
            this.toogleTag(this.linkTags);
            this.displayChanges();
        });
    }
    addTabListener() {
        document.getElementById('tabBtn').addEventListener('click', () => {
            this.insertTag(this.tabTag);
            this.displayChanges();
        });
    }
    addOrderListListener() {
        document.getElementById('orderListBtn').addEventListener('click', () => {
            this.toogleTag(this.orderListTags);
            this.displayChanges();
        });
    }
    addUnOrderListListener() {
        document.getElementById('unorderListBtn').addEventListener('click', () => {
            this.toogleTag(this.unorderListTags);
            this.displayChanges();
        });
    }
    addHeadingListener() {
        document.getElementById('headingBtn').addEventListener('click', () => {
            this.toogleTag(this.headingTags);
            this.displayChanges();
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
        document.getElementById('imageUpload').addEventListener('click', () => {
            document.getElementById('imageUploader').click();
        });
        document.getElementById('imageUploader').addEventListener('change', (event) => {
            let file = event.target.files[0];
            console.log(file);
            var reader = new FileReader();
            reader.onload = function () {
                var output = document.getElementById('output');
                // output.src = reader.result;
                console.log(reader.result);
            };
            reader.readAsDataURL(file);
        });
    }
    selectText(startPos, endPos) {
        const input = document.getElementById('answer_editor');
        input.focus();
        input.setSelectionRange(startPos, endPos);
    }
}
new Answer().init();
//# sourceMappingURL=answer.js.map