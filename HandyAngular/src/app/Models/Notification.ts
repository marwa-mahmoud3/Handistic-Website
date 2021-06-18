export class Notification {
    constructor(
        public notificationBody :string,
        public billingId : number,
        public sellerId : string,
        public userId : string
    ){}
}