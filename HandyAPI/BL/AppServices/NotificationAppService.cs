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
    public class NotificationAppService : AppServiceBase
    {
        public NotificationAppService(IUnitOfWork theUnitOfWork, IMapper mapper) : base(theUnitOfWork, mapper)
        {

        }
        #region CURD
        public List<NotificationModel> GetAllNotifications()
        {

            return Mapper.Map<List<NotificationModel>>(TheUnitOfWork.Notification.GetAll());
        }
        public NotificationModel GetNotificationById(int id)
        {
            if (id < 0)
                throw new ArgumentNullException();
            return Mapper.Map<NotificationModel>(TheUnitOfWork.Notification.GetById(id));
        }
        public bool SaveNewNotification(NotificationModel notificationmodel)
        {
            if (notificationmodel == null)
                throw new ArgumentNullException();
            bool result = false;
            var notification = Mapper.Map<Notification>(notificationmodel);
            if (TheUnitOfWork.Notification.Insert(notification))
            {
                result = TheUnitOfWork.Commit() > new int();
            }
            return result;
        }
        public bool DeleteNotification(int id)
        {
            if (id <= 0)
                throw new InvalidOperationException();
            bool result = false;
            TheUnitOfWork.Notification.Delete(id);
            result = TheUnitOfWork.Commit() > new int();

            return result;
        }

        public bool UpdateNotification(NotificationModel notificationModel)
        {
            var notification = Mapper.Map<Notification>(notificationModel);
            TheUnitOfWork.Notification.Update(notification);
            TheUnitOfWork.Commit();

            return true;
        }
  
        public List<NotificationModel> GetLastNotification()
        {
            return GetAllNotifications().OrderByDescending(i => i.Date).ToList();
        }

        #endregion
    }
}
