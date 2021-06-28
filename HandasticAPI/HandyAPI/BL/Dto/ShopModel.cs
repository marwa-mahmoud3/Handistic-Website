using DAL.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BL.Dto
{
    public class ShopModel
    {
        public int Id { get; set; }
        [Required]
        public string RquestId { get; set; }
        public string ShopName { get; set; }
        public virtual ICollection<City> cities { get; set; }

    }
}
