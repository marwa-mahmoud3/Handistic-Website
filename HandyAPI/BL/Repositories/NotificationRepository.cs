using BL.Bases;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Repositories
{
    public class NotificationRepository : BaseRepository<Notification>
    {
        private DbContext EC_DbContext;

        public NotificationRepository(DbContext EC_DbContext) : base(EC_DbContext)
        {
            this.EC_DbContext = EC_DbContext;
        }

        #region CRUB

        public List<Notification> GetAllNotifications()
        {
            return GetAll().ToList();
        }

        public Notification GetNotificationById(int id)
        {
            return GetFirstOrDefault(l => l.Id == id);
        }

        public bool InsertNotification(Notification notification)
        {
            return Insert(notification);
        }
        public void UpdateNotification(Notification notification)
        {
            Update(notification);
        }
        public void DeleteNotification(int id)
        {
            Delete(id);
        }

        public bool CheckNotificationExists(Notification notification)
        {
            return GetAny(l => l.Id == notification.Id);
        }
    
        #endregion
    }
}
