const digitBn = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export const utilityService = {

    convertToBengaliText(value: number) {
        console.log(value);
        let isNegative = false;
        if (!value) return digitBn[0];
        if (value < 0) {
            value *= -1;
            isNegative = true;
        }

        let sEn = String(value);
        let sBn = "";
        for (let i = 0; i < sEn.length; i++) {
            sBn = sBn + digitBn[parseInt(sEn[i])];
        }
        console.log('done');
        if (isNegative) sBn = "-" + sBn;
        return sBn;
    }
}