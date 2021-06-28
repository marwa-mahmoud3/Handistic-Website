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
    public class ClientNotifyAppService : AppServiceBase
    {
        public ClientNotifyAppService(IUnitOfWork theUnitOfWork, IMapper mapper) : base(theUnitOfWork, mapper)
        {

        }
        #region CURD
        public List<ClientNotifyModel> GetAllClientNotifys()
        {

            return Mapper.Map<List<ClientNotifyModel>>(TheUnitOfWork.ClientNotify.GetAll());
        }
        public ClientNotifyModel GetClientNotifyById(int id)
        {
            if (id < 0)
                throw new ArgumentNullException();
            return Mapper.Map<ClientNotifyModel>(TheUnitOfWork.ClientNotify.GetById(id));
        }
        public bool SaveNewClientNotify(ClientNotifyModel notificationmodel)
        {
            if (notificationmodel == null)
                throw new ArgumentNullException();
            bool result = false;
            var notification = Mapper.Map<ClientNotify>(notificationmodel);
            if (TheUnitOfWork.ClientNotify.Insert(notification))
            {
                result = TheUnitOfWork.Commit() > new int();
            }
            return result;
        }
        public bool DeleteClientNotify(int id)
        {
            if (id <= 0)
                throw new InvalidOperationException();
            bool result = false;
            TheUnitOfWork.ClientNotify.Delete(id);
            result = TheUnitOfWork.Commit() > new int();

            return result;
        }

        public bool UpdateClientNotify(ClientNotifyModel notificationModel)
        {
            var notification = Mapper.Map<ClientNotify>(notificationModel);
            TheUnitOfWork.ClientNotify.Update(notification);
            TheUnitOfWork.Commit();

            return true;
        }


        #endregion
    }
}
