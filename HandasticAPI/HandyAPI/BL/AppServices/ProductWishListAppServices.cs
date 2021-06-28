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
    public class ProductWishListAppServices : AppServiceBase
    {
        public ProductWishListAppServices(IUnitOfWork theUnitOfWork, IMapper mapper) : base(theUnitOfWork, mapper)
        {

        }
        #region CURD

        public List<ProductWishlist> GetAllProductWishlists()
        {
            return Mapper.Map<List<ProductWishlist>>(TheUnitOfWork.ProductWishlist.GetAllProductWishlists());
        }
        public ProductWishlist GetProductWishlistt(int id)
        {
            return Mapper.Map<ProductWishlist>(TheUnitOfWork.ProductWishlist.GetById(id));
        }
        public bool SaveNewProductWishlist(ProductWishlistModel productwishlistModel)
        {
            if (productwishlistModel == null)

                throw new ArgumentNullException();

            bool result = false;
            var wish = Mapper.Map<ProductWishlist>(productwishlistModel);
            if (TheUnitOfWork.ProductWishlist.Insert(wish))
            {
                result = TheUnitOfWork.Commit() > new int();
            }
            return result;
        }


        public bool UpdateProductWishlist(ProductWishlistModel productwishlistModel)
        {
            var productwishList = Mapper.Map<ProductWishlist>(productwishlistModel);
            TheUnitOfWork.ProductWishlist.Update(productwishList);
            TheUnitOfWork.Commit();

            return true;
        }


        public bool DeleteProductWishlist(int id)
        {
            bool result = false;

            TheUnitOfWork.ProductWishlist.Delete(id);
            result = TheUnitOfWork.Commit() > new int();

            return result;
        }

        public bool CheckProductWishlistExists(ProductWishlistModel productwishlistModel)
        {
            ProductWishlist productwishlist = Mapper.Map<ProductWishlist>(productwishlistModel);
            return TheUnitOfWork.ProductWishlist.CheckProductWishlistExists(productwishlist);
        }
        #endregion
    }
}

