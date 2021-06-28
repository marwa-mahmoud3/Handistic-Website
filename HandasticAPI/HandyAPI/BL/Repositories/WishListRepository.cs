using BL.Bases;
using BL.Dto;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BL.Repositories
{
    public class WishListRepository : BaseRepository<Wishlist>
    {
        private DbContext EC_DbContext;

        public WishListRepository(DbContext EC_DbContext) : base(EC_DbContext)
        {
            this.EC_DbContext = EC_DbContext;
        }
        #region CRUB
        public List<Wishlist> GetAllWishlists()
        {
            return GetAll().ToList();
        }

        public bool InsertWishlist(Wishlist wishlist)
        {
            return Insert(wishlist);
        }
        public void UpdateWishlist(Wishlist wishlist)
        {
            Update(wishlist);
        }
        public void DeleteWishlist(int id)
        {
            Delete(id);
        }

        public bool CheckWishlistExists(Wishlist wishlist)
        {
            return GetAny(l => l.Id == wishlist.Id);
        }
        public Wishlist GetWishlistById(int id)
        {
            return GetFirstOrDefault(l => l.Id == id);
        }
        #endregion

    }
}