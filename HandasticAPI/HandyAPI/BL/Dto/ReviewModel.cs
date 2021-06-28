using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Dto
{
    public class ReviewModel
    {
        public int Id { get; set; }
        public string Content { get; set; }
        [Range(1, 5)]
        public int Rating { get; set; }
        public int ProductId { get; set; }
        public string UserId { get; set; }

    }
}