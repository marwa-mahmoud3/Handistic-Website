
export class RequestModel {
    constructor(
        public rquestId:string,
        public firstName:string,
        public lastName:string,
        public phone:string,
        public governorate:string,
        public idCardImage : string,
        public personWithCardImage : string,
        public link : string,
        public productWithCardImage : string 
    ){}
}