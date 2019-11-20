const digitBn = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export const utilityService = {

    convertToBengaliText(value: number) {
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
        if (isNegative) sBn = "-" + sBn;
        return sBn;
    },
    getDurationMinute(time:number){
        let duration = new Date().getTime() - time;

        let minutes = Math.floor(duration/60000);
        
        return minutes;
    },
    tokenize(text:string){
        let regex = /\s+/ ;
        return text.trim().split(regex);
    },
    createHeader(token:string, contentType?:string){
        return new Headers({
            "Authorization": "Bearer " + token,
            'Content-Type': contentType? contentType: 'application/json',
            'Accept': 'application/json'
        });
    }
}