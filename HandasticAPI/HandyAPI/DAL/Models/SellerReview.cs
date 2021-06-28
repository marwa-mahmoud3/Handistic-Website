using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class SellerReview
    {
        public int Id { get; set; }
        public string Content { get; set; }

        [Range(1, 6)]
        public int Rating { get; set; }

        [ForeignKey("User")]
        public string SellerId { get; set; }
        public string UserId { get; set; }
        public virtual AppUser User { get; set; }
    }
}
