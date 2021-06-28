using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class CityShop
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("Shop")]
        public int ShopId { get; set; }

        [ForeignKey("City")]
        public int CityId { get; set; }
        public virtual Shops Shop { get; set; }
        public virtual City City { get; set; }
    }
}
