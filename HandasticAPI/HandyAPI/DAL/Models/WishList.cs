using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace DAL.Models
{
    [Table("Wishlist")]
    public class Wishlist
    { 

            [Key]
            public int Id { get; set; }

            [ForeignKey("User")]
            public string UserId { get; set; }

            public virtual AppUser User { get; set; }

            public virtual ICollection<ProductWishlist> ProductWishlists { get; set; }
        }
    }

