using BL.Bases;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BL.Repositories
{
    public class SellersRepository : BaseRepository<Sellers>
    {
        private DbContext EC_DbContext;

        public SellersRepository(DbContext EC_DbContext) : base(EC_DbContext)
        {
            this.EC_DbContext = EC_DbContext;
        }
        #region CRUB

        public List<Sellers> GetAllSellers()
        {
            return GetAll().ToList();
        }

        public bool InsertSellers(Sellers seller)
        {
            return Insert(seller);
        }
        public void UpdateSeller(Sellers seller)
        {
            Update(seller);
        }
        public void DeleteSeller(int id)
        {
            Delete(id);
        }

        public bool CheckSellerExists(Sellers seller)
        {
            return GetAny(l => l.SellerId == seller.SellerId);
        }
        public Sellers GetSellerById(int id)
        {
            return GetFirstOrDefault(l => l.Id == id);
        }
        #endregion
    }
}
