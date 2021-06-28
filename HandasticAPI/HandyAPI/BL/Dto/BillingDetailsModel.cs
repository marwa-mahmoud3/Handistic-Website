using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Dto
{
    public class BillingDetailsModel
    {
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public int Postcode { get; set; }
        public string phone { get; set; }
        public string Email { get; set; }
        public string userId { get; set; }
        public int orderId { get; set; }
    }
}
