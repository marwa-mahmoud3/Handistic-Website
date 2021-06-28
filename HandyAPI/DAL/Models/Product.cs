using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class Product
    {
        public Product()
        {
            Discount = 0;
            SalesCount = 0;
        }
        public int Id { get; set; }
        [ForeignKey("shop")]
        public int ShopId { get; set; }
        public string UserName { get; set; }
        [Required]
        public string ProductName { get; set; }
        public string Details { get; set; }
        public double UnitPrice { get; set; }
        public int? Quantity { get; set; }
        public int SalesCount { get; set; }
        [NotMapped]
        public IFormFile ProductImage { get; set; }
        public string ProductImagePath { get; set; }
        public double Discount { get; set; }
        public string Size { get; set; }
        [ForeignKey("Category")]
        public int CategoryId { get; set; }
        public virtual Category Category { get; set; }
        public virtual Shops shop { get; set; }
    }
}