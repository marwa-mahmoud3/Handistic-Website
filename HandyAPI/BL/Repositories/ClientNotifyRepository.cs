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
    public class ClientNotifyRepository : BaseRepository<ClientNotify>
    {
        private DbContext EC_DbContext;

        public ClientNotifyRepository(DbContext EC_DbContext) : base(EC_DbContext)
        {
            this.EC_DbContext = EC_DbContext;
        }

        #region CRUB

        public List<ClientNotify> GetAllClientNotify()
        {
            return GetAll().ToList();
        }

        public ClientNotify GetClientNotifyById(int id)
        {
            return GetFirstOrDefault(l => l.Id == id);
        }

        public bool InsertClientNotify(ClientNotify notification)
        {
            return Insert(notification);
        }
        public void UpdateClientNotify(ClientNotify notification)
        {
            Update(notification);
        }
        public void DeleteClientNotify(int id)
        {
            Delete(id);
        }

        public bool CheckClientNotifyExists(ClientNotify notification)
        {
            return GetAny(l => l.Id == notification.Id);
        }

        #endregion
    }
}

