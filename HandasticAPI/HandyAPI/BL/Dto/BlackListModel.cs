using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Dto
{
   public class BlackListModel
    {
        public int Id { get; set; }
        public string SellerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Governorate { get; set; }
        public string IdCardImage { get; set; }
        
        public string PersonWithCardImage { get; set; }
        public string Link { get; set; }
        public int BlocksNumber { get; set; }
        public string ProductWithCardImage { get; set; }
    }
}
