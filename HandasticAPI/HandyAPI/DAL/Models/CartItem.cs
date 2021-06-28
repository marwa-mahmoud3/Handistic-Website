using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class CartItem
    {
        [Key]
        public int Id { get; set; }
        public int Quantity { get; set; }
        public double UnitPrice { get; set; }
        public double TotalPrice { get; set; }
        [ForeignKey("Product")]
        public int ProductId { get; set; }

        [ForeignKey("Cart")]
        public int cartId { get; set; }
        public virtual Product Product { get; set; }

        public virtual Cart Cart { get; set; }

    }
}