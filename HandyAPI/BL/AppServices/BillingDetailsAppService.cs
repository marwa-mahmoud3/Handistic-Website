using AutoMapper;
using BL.Bases;
using BL.Dto;
using BL.Interfaces;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.AppServices
{
    public class BillingDetailsAppService : AppServiceBase
    {
         
        public BillingDetailsAppService(IUnitOfWork theUnitOfWork, IMapper mapper) : base(theUnitOfWork, mapper)
        {

        }
        #region CURD

        public List<BillingDetailsModel> GetAllBillingDetails()
        {

            return Mapper.Map<List<BillingDetailsModel>>(TheUnitOfWork.BillingDetails.GetAllBillingDetails());
        }
        public BillingDetailsModel GetBillingDetails(int id)
        {
            if (id < 0)
                throw new ArgumentNullException();
            return Mapper.Map<BillingDetailsModel>(TheUnitOfWork.BillingDetails.GetById(id));
        }

        public BillingDetailsModel CreateBillingDetails(BillingDetailsModel billingDetailsModel)
        {
            if (billingDetailsModel == null)
                throw new ArgumentNullException();

            bool result = false;
            var order = TheUnitOfWork.Order.GetAll().OrderByDescending(i => i.Id).FirstOrDefault();
            billingDetailsModel.orderId = order.Id;
            var BillingDetails = Mapper.Map<BillingDetails>(billingDetailsModel);
            if (TheUnitOfWork.BillingDetails.Insert(BillingDetails))
            {
                result = TheUnitOfWork.Commit() > new int();
            }
            return Mapper.Map<BillingDetailsModel>(BillingDetails);
        }
        public int GetBillingDetailsIdByUser(string userId)
        {
            return (TheUnitOfWork.BillingDetails.GetAllBillingDetails().Find(c => c.userId == userId)).ID;
        }


        public bool Delete(int id)
        {
            if (id < 0)
                throw new ArgumentNullException();

            bool result = false;

            TheUnitOfWork.BillingDetails.Delete(id);
            result = TheUnitOfWork.Commit() > new int();

            return result;
        }

        #endregion
    }
}
