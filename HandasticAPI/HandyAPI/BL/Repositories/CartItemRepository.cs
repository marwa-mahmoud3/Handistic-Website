using BL.Bases;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BL.Repositories
{
    public class CartItemRepository : BaseRepository<CartItem>
    {
        private DbContext EC_DbContext;

        public CartItemRepository(DbContext EC_DbContext) : base(EC_DbContext)
        {
            this.EC_DbContext = EC_DbContext;
        }
        #region CRUB

        public List<CartItem> GetAllProductCart(int cartId)
        {
            return DbSet.Where(c => c.cartId == cartId).Include(c => c.Product).ToList();
        }

        public bool InsertCartItem(CartItem CartItem)
        {
            return Insert(CartItem);
        }

        public void DeleteCartItem(int id)
        {
            Delete(id);
        }
        public CartItem GetCartItemById(int id)
        {
            return GetFirstOrDefault(c => c.Id == id);
        }
        #endregion
    }
}