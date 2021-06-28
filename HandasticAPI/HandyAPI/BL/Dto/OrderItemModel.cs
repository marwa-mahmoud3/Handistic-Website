using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BL.Dto
{
    public class OrderItemModel
    {
        public int ID { get; set; }
        public double TotalPrice { get; set; }
        public double unitPrice { get; set; }
        public int Quantity { get; set; }
        public int ProductID { get; set; }
        public int orderID { get; set; }
    }
}
