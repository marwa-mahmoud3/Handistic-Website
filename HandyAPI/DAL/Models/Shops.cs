using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class Shops
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [ForeignKey("User")]
        public string RquestId { get; set; }
        [Required]
        public string ShopName { get; set; }
        public virtual AppUser User { get; set; }
        public virtual ICollection<Product> Products  { get; set; }
      
    }
}
