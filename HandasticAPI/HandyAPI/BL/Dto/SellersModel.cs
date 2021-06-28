using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BL.Dto
{
    public class SellersModel
    {
        public int Id { get; set; }
        public int ShopId { get; set; }
        public string SellerId { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Phone { get; set; }
        [Required]
        public string Governorate { get; set; }
        [Required]
        public string IdCardImage { get; set; }
        [Required]
        public string PersonWithCardImage { get; set; }
        public string Link { get; set; }
        public int BlocksNumber { get; set; }
        public string ProductWithCardImage { get; set; }
    }
}
