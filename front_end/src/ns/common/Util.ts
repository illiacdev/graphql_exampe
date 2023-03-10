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

    static updateProp2<TObj, K extends keyof TObj>(obj: TObj, key: string, value: TObj[K]) {
        obj[key as K] = value;
    }

    static getProp2<TObj>(obj: TObj, key: string) {
        type T_Key = keyof typeof obj;
        return obj[key as T_Key] ;
    }

    static seo = (data:any = {}) =>{
        data.title = data.title || 'Default title';
        data.metaDescription = data.metaDescription || 'Default description';

        document.title = data.title;
        document.querySelector?.('meta[name="description"]')?.setAttribute('content', data.metaDescription);
    }


}

