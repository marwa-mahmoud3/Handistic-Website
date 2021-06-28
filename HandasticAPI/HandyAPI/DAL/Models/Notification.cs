using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace DAL.Models
{
    public class Notification
    {
        //notification and user (many to many relationship)
        public Notification()
        {
            Date = DateTime.UtcNow;
            IsRead = false;
        }
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public bool IsRead { get; set; }
        public string NotificationBody { get; set; }
        [ForeignKey("BillingDetails")]
        public int BillingId { get; set; }
        public virtual BillingDetails BillingDetails { get; set; }
        public string SellerId { get; set; }
        [ForeignKey("User")]
        public string UserId { get; set; }
        public virtual AppUser User { get; set; }
    }
}