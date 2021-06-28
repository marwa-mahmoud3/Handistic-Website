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
    public class UserRequsetAppService : AppServiceBase
    {
        public UserRequsetAppService(IUnitOfWork theUnitOfWork, IMapper mapper) : base(theUnitOfWork, mapper)
        {

        }
        #region CURD

        public List<UserRequestsModel> GetAllRequests()
        {
            return Mapper.Map<List<UserRequestsModel>>(TheUnitOfWork.Request.GetAllRequests());
        }
        public UserRequestsModel GetRequest(int id)
        {
            return Mapper.Map<UserRequestsModel>(TheUnitOfWork.Request.GetById(id));
        }
        public bool SaveNewRequest(UserRequestsModel userRequestsModel)
        {
            if (userRequestsModel == null)

                throw new ArgumentNullException();

            bool result = false;
            var Request = Mapper.Map<UserRquestTobeSeller>(userRequestsModel);
            if (TheUnitOfWork.Request.Insert(Request))
            {
                result = TheUnitOfWork.Commit() > new int();
            }
            return result;
        }


        public bool UpdateRequest(UserRequestsModel userRequestsModel)
        {
            var Request = Mapper.Map<UserRquestTobeSeller>(userRequestsModel);
            TheUnitOfWork.Request.Update(Request);
            TheUnitOfWork.Commit();

            return true;
        }


        public bool DeleteRequest(int id)
        {
            bool result = false;

            TheUnitOfWork.Request.Delete(id);
            result = TheUnitOfWork.Commit() > new int();

            return result;
        }

        public bool CheckRequestExists(UserRequestsModel userRequestsModel)
        {
            UserRquestTobeSeller rquestTobeSeller = Mapper.Map<UserRquestTobeSeller>(userRequestsModel);
            return TheUnitOfWork.Request.CheckRequestExists(rquestTobeSeller);
        }
        #endregion
    }
}
