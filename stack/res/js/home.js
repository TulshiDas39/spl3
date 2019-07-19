
// media query event handler
console.log('loaded home.js');
if (matchMedia) {
    const mq = window.matchMedia("(max-width:980px)");
    const mq2 = window.matchMedia("(max-width:790px)");
    const mq3 = window.matchMedia("(max-width:640px)");

    mq.addListener(ScreenWidthChange);
    mq2.addListener(ScreenWidthChange2);
    mq3.addListener(ScreenWidthChange3);
    ScreenWidthChange(mq);
    ScreenWidthChange2(mq2);
    ScreenWidthChange3(mq3);
}

// media query change
function ScreenWidthChange(mq) {
    if (mq.matches) {
        // window width is at least 500px
        console.log('change1');
    } else {
        // window width is less than 500px
    }

}

function ScreenWidthChange2(mq) {
    if (mq.matches) {
        // window width is at least 500px
        console.log('change2');
    } else {
        // window width is less than 500px
    }

}

function ScreenWidthChange3(mq) {
    if (mq.matches) {
        // window width is at least 500px
        console.log('change3');
    } else {
        // window width is less than 500px
    }

}