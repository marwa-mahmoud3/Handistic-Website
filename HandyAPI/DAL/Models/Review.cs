using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    [Table("Review")]
    public class Review
    {
        public int Id { get; set; }
        public string Content { get; set; }

        [Range(1, 6)]
        public int Rating { get; set; }

        [ForeignKey("Product")]
        public int ProductId { get; set; }
        public virtual Product Product { get; set; }

        [ForeignKey("UserId")]
        public string UserId { get; set; }
        public virtual AppUser User { get; set; }
    }
}