using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BL.Dto
{
    public class ProductWishlistModel
    {
            public int Id { get; set; }
            public int productId { get; set; }
            public int WishlistID { get; set; }
        
    }
}
