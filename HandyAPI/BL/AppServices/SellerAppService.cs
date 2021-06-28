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
    public class SellerAppService :AppServiceBase
    {
                private readonly ProductAppService _product;

        public SellerAppService(IUnitOfWork theUnitOfWork, IMapper mapper) : base(theUnitOfWork, mapper)
        {

        }
        #region CURD
        public List<SellersModel> GetAllSellers()
        {
            return Mapper.Map<List<SellersModel>>(TheUnitOfWork.Seller.GetAllSellers());
        }
        public SellersModel GetSeller(int id)
        {
            return Mapper.Map<SellersModel>(TheUnitOfWork.Seller.GetById(id));
        }
        public bool SaveNewSeller(SellersModel sellersModel)
        {
            if (sellersModel == null)

                throw new ArgumentNullException();

            bool result = false;
            var seller = Mapper.Map<Sellers>(sellersModel);
            if (TheUnitOfWork.Seller.Insert(seller))
            {
                result = TheUnitOfWork.Commit() > new int();
            }
            return result;
        }


        public bool UpdateSeller(SellersModel sellersModel)
        {
            var seller = Mapper.Map<Sellers>(sellersModel);
            TheUnitOfWork.Seller.Update(seller);
            TheUnitOfWork.Commit();

            return true;
        }


        public bool DeleteSeller(int id)
        {
            bool result = false;

            TheUnitOfWork.Seller.Delete(id);
            result = TheUnitOfWork.Commit() > new int();
            
            return result;
        }

        public bool CheckSellerExists(SellersModel sellerModel)
        {
            Sellers seller = Mapper.Map<Sellers>(sellerModel);
            return TheUnitOfWork.Seller.CheckSellerExists(seller);
        }

        public void RemoveSellerProducts(string sellerName)
        {
            IEnumerable<Product> products = TheUnitOfWork.Product.GetWhere(p => p.UserName == sellerName);
            foreach (var p in products)
            {
                TheUnitOfWork.Product.Delete(p.Id);
            }
        }
       
        #endregion
    }
}
