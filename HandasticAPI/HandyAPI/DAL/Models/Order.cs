using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class Order
    {
        public Order()
        {
            date = DateTime.UtcNow;
        }
        [Key]
        public int Id { get; set; }
        public DateTime? date { get; set; }
        public double TotalPrice { get; set; }

        [ForeignKey("User")]
        public string userId { get; set; }
        public virtual AppUser User { get; set; }
        public virtual ICollection<OrderItem> orderItems { get; set; } 
    }
}
