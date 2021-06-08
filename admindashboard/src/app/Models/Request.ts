export class Request{
    constructor(
        public  id:number,
        public RquestId:string,
        public FirstName:string,
        public LastName:string,
        public Phone:string,
        public  Governorate:string,
        public  IdCardImage:string,
        public  PersonWithCardImage:string,
        public  IsAccepted :boolean,
        public  Link:string,
        public  ProductWithCardImage:string
    ){}
}