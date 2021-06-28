using BL.Bases;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BL.Repositories
{
    public class UserRequestsRepository : BaseRepository<UserRquestTobeSeller>
    {
        private DbContext EC_DbContext;

        public UserRequestsRepository(DbContext EC_DbContext) : base(EC_DbContext)
        {
            this.EC_DbContext = EC_DbContext;
        }
        #region CRUB

        public List<UserRquestTobeSeller> GetAllRequests()
        {
            return GetAll().ToList();
        }

        public bool InsertRequests(UserRquestTobeSeller request)
        {
            return Insert(request);
        }
        public void UpdateRequest(UserRquestTobeSeller request)
        {
            Update(request);
        }
        public void DeleteRequest(int id)
        {
            Delete(id);
        }

        public bool CheckRequestExists(UserRquestTobeSeller request)
        {
            return GetAny(l => l.Id == request.Id);
        }
        public UserRquestTobeSeller GetRequestById(int id)
        {
            return GetFirstOrDefault(l => l.Id == id);
        }
        #endregion
    }
}
