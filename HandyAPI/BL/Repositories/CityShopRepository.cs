using BL.Bases;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BL.Repositories
{
    public class CityShopRepository : BaseRepository<CityShop>
    {
        private DbContext EC_DbContext;

        public CityShopRepository(DbContext EC_DbContext) : base(EC_DbContext)
        {
            this.EC_DbContext = EC_DbContext;
        }

        public List<CityShop> GetAllCityShops()
        {
            return GetAll().ToList();
        }

        public bool InsertCityShop(CityShop cityShop)
        {
            return Insert(cityShop);
        }
        public void UpdateShop(CityShop cityShop)
        {
            Update(cityShop);
        }
        public void DeleteCityShop(int id)
        {
            Delete(id);
        }

        public bool CheckCityShopExists(CityShop cityShop)
        {
            return GetAny(l => l.Id == cityShop.Id);

        }
        public CityShop GetCityShopById(int id)
        {
            return GetFirstOrDefault(l => l.Id == id);
        }
    }
}
