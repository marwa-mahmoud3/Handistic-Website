using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    public class AppUser : IdentityUser
    {
        public AppUser()
        {
            DateEntered = DateTime.UtcNow;
        }  
        public string City { get; set; }
        public DateTime? DateEntered { get; set; }
        public string Password { get; set; }

        [Compare("Password")]
        public string confirmPassword { get; set; }

    }
}