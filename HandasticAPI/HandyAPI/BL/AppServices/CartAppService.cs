using AutoMapper;
using BL.Bases;
using BL.Dto;
using BL.Interfaces;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BL.AppServices
{
    public class CartAppService : AppServiceBase
    {
        public CartAppService(IUnitOfWork theUnitOfWork, IMapper mapper) : base(theUnitOfWork, mapper)
        {

        }
        #region CURD

        public List<CartModel> GetAllCarts()
        {

            return Mapper.Map<List<CartModel>>(TheUnitOfWork.Cart.GetAllCart());
        }
        public CartModel GetCart(int id)
        {
            if (id < 0)
                throw new ArgumentNullException();
            return Mapper.Map<CartModel>(TheUnitOfWork.Cart.GetById(id));
        }

        public bool CreateUserCart(string userId)
        {
            bool result = false;
            //int lastId = TheUnitOfWork.Cart.GetAllCart()
            //             .OrderByDescending(c => c.Id).FirstOrDefault().Id; // test ..
            Cart userCart = new Cart() { userId = userId };
            if (TheUnitOfWork.Cart.Insert(userCart))
            {
                result = TheUnitOfWork.Commit() > new int();
            }
            return result;
        }

        public int GetCartIdByUser(string userId)
        {
            return (TheUnitOfWork.Cart.GetAllCart().Find(c => c.userId == userId)).Id;
        }


        public bool DeleteCart(int id)
        {
            if (id < 0)
                throw new ArgumentNullException();

            bool result = false;

            TheUnitOfWork.Cart.Delete(id);
            result = TheUnitOfWork.Commit() > new int();

            return result;
        }
        public IEnumerable<ProductModel> UserCartProducts(string userId)
        {
            List<ProductModel> list = new List<ProductModel>();
            if (userId == null)
                return list;
            var cart = TheUnitOfWork.Cart.GetFirstOrDefault(c => c.userId == userId);
            if (cart != null)
            {
                var cartItems = TheUnitOfWork.CartItem.GetWhere(c => c.cartId == cart.Id);
                foreach (var c in cartItems)
                {
                    list.Add(Mapper.Map<ProductModel>(TheUnitOfWork.Product.GetById(c.ProductId)));
                }
            }
            return list;
        }
        #endregion
    }
}