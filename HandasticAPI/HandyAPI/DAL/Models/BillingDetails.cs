using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class BillingDetails
    {
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public int Postcode { get; set; }
        public string phone { get; set; }
        public string Email { get; set; }

        [ForeignKey("User")]
        public string userId { get; set; }
        public virtual AppUser User { get; set; }
       
        [ForeignKey("order")]
        public int orderId { get; set; }
        public virtual Order order { get; set; }
    }
}
