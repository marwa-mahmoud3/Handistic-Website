using AutoMapper;
using BL.Bases;
using BL.Dto;
using BL.Interfaces;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BL.AppServices
{
    public class ShopAppService : AppServiceBase
    {
        public ShopAppService(IUnitOfWork theUnitOfWork, IMapper mapper) : base(theUnitOfWork, mapper)
        {

        }
        #region CURD

        public List<ShopModel> GetAllShops()
        {
            return Mapper.Map<List<ShopModel>>(TheUnitOfWork.Shop.GetAllShops());
        }
        public ShopModel GetShop(int id)
        {
            return Mapper.Map<ShopModel>(TheUnitOfWork.Shop.GetById(id));
        }
        public bool SaveNewShop(ShopModel shopModel)
        {
            if (shopModel == null)

                throw new ArgumentNullException();

            bool result = false;
            var shop = Mapper.Map<Shops>(shopModel);
            if (TheUnitOfWork.Shop.Insert(shop))
            {
                result = TheUnitOfWork.Commit() > new int();
            }
            return result;
        }


        public bool UpdateShop(ShopModel shopModel)
        {
            var shop = Mapper.Map<Shops>(shopModel);
            TheUnitOfWork.Shop.Update(shop);
            TheUnitOfWork.Commit();

            return true;
        }


        public bool DeleteShop(int id)
        {
            bool result = false;

            TheUnitOfWork.Shop.Delete(id);
            result = TheUnitOfWork.Commit() > new int();

            return result;
        }

        public bool CheckShopExists(ShopModel shopModel)
        {
            Shops shop = Mapper.Map<Shops>(shopModel);
            return TheUnitOfWork.Shop.CheckShopExists(shop);
        }
        public void DeleteSellerShop(string sellerId)
        {
            Shops shop = TheUnitOfWork.Shop.GetFirstOrDefault(s => s.RquestId == sellerId);
            TheUnitOfWork.Shop.Delete(shop.Id);
        }

        public bool IsSellerHasShop(string sellerId)
        {
            Shops shop = TheUnitOfWork.Shop.GetFirstOrDefault(s => s.RquestId == sellerId);
            return shop != null;
        }
        #endregion
    }
}
