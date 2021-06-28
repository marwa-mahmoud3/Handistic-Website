using BL.Dto;
using BL.Interfaces;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BL.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ApplicationDbContext _context;
        public CategoryService(ApplicationDbContext context)
        {
            _context = context;
        }
        public string CategoryExistAsync(CategoryModel model)
        {
            foreach (var category in _context.Categories)
            {
                if (model.Name == category.Name)
                    return "This Category Exists";
            }
            return "";
        }

    }   
}
