using AutoMapper;
using BL.Bases;
using BL.Dto;
using BL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Models;
namespace BL.AppServices
{
    public class CityShopAppService:AppServiceBase
    {
        public CityShopAppService(IUnitOfWork theUnitOfWork, IMapper mapper) : base(theUnitOfWork, mapper)
        {

        }
        #region CURD

        public List<CityShopModel> GetAllCityShops()
        {

            return Mapper.Map<List<CityShopModel>>(TheUnitOfWork.CityShop.GetAllCityShops());
        }
        public CityShopModel GetCityShop(int id)
        {
            return Mapper.Map<CityShopModel>(TheUnitOfWork.CityShop.GetById(id));
        }

        public bool SaveNewCityShop(CityShopModel cityShopModel)
        {
            if (cityShopModel == null)

                throw new ArgumentNullException();

            bool result = false;
            var cityShop = Mapper.Map<CityShop>(cityShopModel);
            if (TheUnitOfWork.CityShop.Insert(cityShop))
            {
                result = TheUnitOfWork.Commit() > new int();
            }
            return result;
        }


        public bool UpdateCityShop(CityShopModel cityShopModel)
        {
            var cityShop = Mapper.Map<CityShop>(cityShopModel);
            TheUnitOfWork.CityShop.Update(cityShop);
            TheUnitOfWork.Commit();

            return true;
        }

        
        public bool DeleteCityShop(int id)
        {
            bool result = false;

            TheUnitOfWork.CityShop.Delete(id);
            result = TheUnitOfWork.Commit() > new int();

            return result;
        }

        public bool CheckCityShopExists(CityShopModel cityShopModel)
        {
            CityShop cityShop = Mapper.Map<CityShop>(cityShopModel);

            return TheUnitOfWork.CityShop.CheckCityShopExists(cityShop);
        }
        #endregion

    }
}
