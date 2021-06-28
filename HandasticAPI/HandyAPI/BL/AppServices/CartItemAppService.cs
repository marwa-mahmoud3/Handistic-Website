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
    public class CartItemAppService : AppServiceBase
    {
        public CartItemAppService(IUnitOfWork theUnitOfWork, IMapper mapper) : base(theUnitOfWork, mapper)
        {

        }
        public List<CartItemModel> GetAllCartItem(int cartId)
        {

            return Mapper.Map<List<CartItemModel>>(TheUnitOfWork.CartItem.GetAllProductCart(cartId));
        }
        public CartItemModel GetCartItem(int cartId, int productId)
        {
            return Mapper.Map<CartItemModel>(TheUnitOfWork.CartItem.GetFirstOrDefault(c => c.cartId == cartId && c.ProductId == productId));
        }
        public bool SaveNewCartItem(CartItem cartItem)
        {
            if (cartItem == null)
                throw new ArgumentNullException();
            bool result = false;
            if (TheUnitOfWork.CartItem.Insert(cartItem))
            {
                result = TheUnitOfWork.Commit() > new int();
            }
            return result;
        }
        public bool DeleteCartItem(int id)
        {
            if (id <= 0)
                throw new InvalidOperationException();
            bool result = false;

            TheUnitOfWork.CartItem.Delete(id);
            result = TheUnitOfWork.Commit() > new int();

            return result;
        }

        public bool CheckIfItemExistsInCart(int cartID, int productID)
        {
            var isExistItemInCart = TheUnitOfWork.CartItem
                .GetFirstOrDefault(c => c.cartId == cartID && c.ProductId == productID);
            return isExistItemInCart != null;
        }

        public int GetCartItemID(int cartID, int productID)
        {
            return TheUnitOfWork.CartItem
                .GetFirstOrDefault(c => c.cartId == cartID && c.ProductId == productID).Id;
        }
        public bool DecreaseQuantity(int cartItemId)
        {
            var cartItem = TheUnitOfWork.CartItem.GetById(cartItemId);
            cartItem.Quantity--;
            cartItem.TotalPrice -= cartItem.UnitPrice;
            TheUnitOfWork.CartItem.Update(cartItem);
            TheUnitOfWork.Commit();
            return true;
        }
        public bool IncreaseQuantity(int cartItemId)
        {
            var cartItem = TheUnitOfWork.CartItem.GetFirstOrDefault(c => c.Id == cartItemId);
            cartItem.Quantity++;
            cartItem.TotalPrice += cartItem.UnitPrice;
            TheUnitOfWork.CartItem.Update(cartItem);
            TheUnitOfWork.Commit();
            return true;
        }
        public double PriceAfterDiscount(double price, double discount)
        {
            double netPrice = price;
            netPrice -= Math.Ceiling(price * discount / 100.0);
            return netPrice;
        }
    }
}