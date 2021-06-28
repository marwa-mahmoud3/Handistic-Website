using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class UserRquestTobeSeller
    {
        UserRquestTobeSeller()
        {
            IsAccepted = false;
        }
        public int Id { get; set; }

        [ForeignKey("User")]
        public string UserId { get; set; }
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
        public bool IsAccepted { get; set; }
        public string Link { get; set; }
        public string ProductWithCardImage { get; set; }
        public virtual AppUser User { get; set; }
    }
}
