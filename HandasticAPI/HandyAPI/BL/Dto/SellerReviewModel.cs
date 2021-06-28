using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Dto
{
    public class SellerReviewModel
    {
        public int Id { get; set; }
        public string Content { get; set; }

        public int Rating { get; set; }

        public string SellerId { get; set; }

        public string UserId { get; set; }
    }
}
