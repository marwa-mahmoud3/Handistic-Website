using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Dto
{
    public class OrderModel
    {
        public int Id { get; set; }
        public DateTime? date { get; set; }
        public double TotalPrice { get; set; }
        public string userId { get; set; }
    }
}
