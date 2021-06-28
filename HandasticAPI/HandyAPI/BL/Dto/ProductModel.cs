using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BL.Dto
{
    public class ProductModel
    {
        public int Id { get; set; }
        public int ShopId { get; set; }
        public string UserName { get; set; }
        public string ProductName { get; set; }
        public string Details { get; set; }
        public double UnitPrice { get; set; }
        public int? Quantity { get; set; }
        public int SalesCount { get; set; }
        public string ProductImagePath { get; set; }
        public int CategoryId { get; set; }
        public string Size { get; set; }
        public double Discount { get; set; }
    }
}