using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Dto
{
    public class ClientNotifyModel
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public bool IsRead { get; set; }
        public string NotificationBody { get; set; }
        public int BillingId { get; set; }
        public string SellerId { get; set; }
        public string UserId { get; set; }
    }
}
