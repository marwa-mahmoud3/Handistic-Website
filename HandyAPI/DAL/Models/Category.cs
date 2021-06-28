using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;


namespace DAL.Models
{
    public class Category
    {

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        [NotMapped]
        public IFormFile CaregoryImage { get; set; }
        public string CategoryImagePath { get; set; }
        public virtual ICollection<Product> Products { get; set; }
    }
}

