using BL.Bases;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BL.Repositories
{
    public class ProductWishlistRepository : BaseRepository<ProductWishlist>
    {
        private DbContext EC_DbContext;

        public ProductWishlistRepository(DbContext EC_DbContext) : base(EC_DbContext)
        {
            this.EC_DbContext = EC_DbContext;
        }
        #region CRUB

        public List<ProductWishlist> GetAllProductWishlists()
        {
            return GetAll().ToList();
        }

        public bool InsertProductWishlist(ProductWishlist productWishlist)
        {
            return Insert(productWishlist);
        }
        public void UpdateProductWishlist(ProductWishlist productWishlist)
        {
            Update(productWishlist);
        }
        public void DeleteWishlist(int id)
        {
            Delete(id);
        }

        public bool CheckProductWishlistExists(ProductWishlist productWishlist)
        {
            return GetAny(l => l.Id == productWishlist.Id);
        }
        public ProductWishlist GetProductWishlistById(int id)
        {
            return GetFirstOrDefault(l => l.Id == id);
        }
        #endregion
    }
}
