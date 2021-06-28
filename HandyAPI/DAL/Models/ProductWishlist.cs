using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class ProductWishlist
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("product")]
        public int productId { get; set; }
        public virtual Product product { get; set; }


        [ForeignKey("Wishlist")]
        public int WishlistID { get; set; }
        public virtual Wishlist Wishlist { get; set; }
    }

}
