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
    public class BlackListAppService : AppServiceBase
    {
        public BlackListAppService(IUnitOfWork theUnitOfWork, IMapper mapper) : base(theUnitOfWork, mapper)
        {
        }
        public IEnumerable<BlackListModel> GetAll()
        {
            IEnumerable<BlackList> list = TheUnitOfWork.BlackList.GetAllBlackList();
            return Mapper.Map<IEnumerable<BlackListModel>>(list);
        }

        public BlackListModel GetById(int id)
        {
            return Mapper.Map<BlackListModel>(TheUnitOfWork.BlackList.GetById(id));
        }
        public bool Save(BlackListModel blackListModel)
        {
            if (blackListModel == null)
                throw new ArgumentNullException();
            bool result = false;
            var blackList = Mapper.Map<BlackList>(blackListModel);
            if (TheUnitOfWork.BlackList.Insert(blackList))
            {
                result = TheUnitOfWork.Commit() > new int();
            }
            return result;
        }
        public bool Delete(int id)
        {
            TheUnitOfWork.BlackList.Delete(id);
            return TheUnitOfWork.Commit() > new int();
        }
        public bool IsUserBlocked(string userId)
        {
            return TheUnitOfWork.BlackList.CheckUserNameBlocked(userId);
        }

        public bool UnBlockUser(int Id)
        {
            var res = TheUnitOfWork.BlackList.GetFirstOrDefault(b => b.Id == Id);
            if (res == null) return false;
            TheUnitOfWork.BlackList.DeleteFromBlackList(res.Id);
            return true;

        }
        public BlackListModel GetByUserId(string userId)
        {
            return Mapper.Map<BlackListModel>(TheUnitOfWork.BlackList.GetFirstOrDefault(b => b.SellerId == userId));
        }
    }
}
