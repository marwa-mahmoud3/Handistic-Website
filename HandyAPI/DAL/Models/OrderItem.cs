using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class OrderItem
    {
        public int ID { get; set; }
        public double TotalPrice { get; set; }
        public double unitPrice { get; set; }
        public int Quantity { get; set; }

        [ForeignKey("Product")]
        public int ProductID { get; set; }
        public virtual Product Product { get; set; }

        [ForeignKey("Order")]
        public int orderID { get; set; }
        public virtual Order Order { get; set; }
    }
}
