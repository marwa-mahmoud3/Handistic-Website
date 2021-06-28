using BL.Dto;
using BL.Interfaces;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BL.Services
{
    public class CityService : ICityService
    {
        private readonly ApplicationDbContext _context ;
        public CityService(ApplicationDbContext context)
        {
            _context = context;
        }
        public string CityExistAsync(CityModel model)
        {
            foreach(var city in _context.City)
            {
                if (model.Name == city.Name)
                    return "This City is Exist";
            }
            return "";
        }

    }   
}
