using DAL.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{

    [Table("Cart")]
    public class Cart
    {

        public int Id { get; set; }
        public List<CartItem> cartItems { get; set; }

        [ForeignKey("User")]
        public string userId { get; set; }
        public AppUser User { get; set; }
    }
}