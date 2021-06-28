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
    public class WishlistAppService : AppServiceBase
    {
        public WishlistAppService(IUnitOfWork theUnitOfWork, IMapper mapper) : base(theUnitOfWork, mapper)
        {

        }
        #region CURD

        public List<Wishlist> GetAllWishlists()
        {
            return Mapper.Map<List<Wishlist>>(TheUnitOfWork.WishList.GetAllWishlists());
        }
        public Wishlist GetWishlist(int id)
        {
            return Mapper.Map<Wishlist>(TheUnitOfWork.WishList.GetById(id));
        }

        public bool CreateUserWishlist(string userId)
        {
            bool result = false;
            Wishlist userWishlist = new Wishlist() { UserId = userId };
            if (TheUnitOfWork.WishList.Insert(userWishlist))
            {
                result = TheUnitOfWork.Commit() > new int();
            }
            return result;
        }



        public bool UpdateWishlist(WishlistModel wishlistModel)
        {
            var wishList = Mapper.Map<Wishlist>(wishlistModel);
            TheUnitOfWork.WishList.Update(wishList);
            TheUnitOfWork.Commit();

            return true;
        }


        public bool DeleteWishlist(int id)
        {
            bool result = false;

            TheUnitOfWork.WishList.Delete(id);
            result = TheUnitOfWork.Commit() > new int();

            return result;
        }

        public bool CheckWishlistExists(WishlistModel wishlistModel)
        {
            Wishlist wishlist = Mapper.Map<Wishlist>(wishlistModel);
            return TheUnitOfWork.WishList.CheckWishlistExists(wishlist);
        }
        public IEnumerable<ProductModel> UserWishedProducts(string userId)
        {
            List<ProductModel> list = new List<ProductModel>();
            if (userId == null)
                return list;
            var wishList = TheUnitOfWork.WishList.GetFirstOrDefault(w => w.UserId == userId);
            if (wishList != null)
            {
                var WishListItems = TheUnitOfWork.ProductWishlist.GetWhere(w => w.WishlistID == wishList.Id);
                foreach (var w in WishListItems)
                {
                    list.Add(Mapper.Map<ProductModel>(TheUnitOfWork.Product.GetById(w.productId)));
                }
            }
            return list;
        }   
        #endregion
    }
}
