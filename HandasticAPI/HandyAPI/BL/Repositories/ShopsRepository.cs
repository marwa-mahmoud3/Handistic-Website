using BL.Bases;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BL.Repositories
{
    public class ShopsRepository : BaseRepository<Shops>
    {
        private DbContext EC_DbContext;

        public ShopsRepository(DbContext EC_DbContext) : base(EC_DbContext)
        {
            this.EC_DbContext = EC_DbContext;
        }
        #region CRUB

        public List<Shops> GetAllShops()
        {
            return GetAll().ToList();
        }

        public bool InsertShops(Shops shop)
        {
            return Insert(shop);
        }
        public void UpdateShop(Shops shop)
        {
            Update(shop);
        }
        public void DeleteShop(int id)
        {
            Delete(id);
        }

        public bool CheckShopExists(Shops shop)
        {
            return GetAny(l => l.Id == shop.Id);
        }
        public Shops GetShopById(int id)
        {
            return GetFirstOrDefault(l => l.Id == id);
        }
        #endregion
    }
}
