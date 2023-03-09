import {Dayjs} from "dayjs";

export class Util {
    static DateFormat = 'YYYY-MM-DD';
    static date2String(date: Dayjs) {
        return date.format(Util.DateFormat);
    }

    static Log = true

    static log(log:any,tag?:string){
        console.log(tag, log);
    }

}

