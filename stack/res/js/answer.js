"use strict";
class Answer {
    init() {
        this.setInputListenerInAnswerEditor();
    }
    setInputListenerInAnswerEditor() {
        document.getElementById('answer_editor').oninput = () => {
            let text = document.getElementById('answer_editor').value;
            this.showFormatedAnswer(text);
        };
    }
    showFormatedAnswer(text) {
        let elem = document.getElementById('answer_display');
        elem.innerHTML = text;
    }
}
new Answer().init();
//# sourceMappingURL=answer.js.map