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
    public class BlackListRepository : BaseRepository<BlackList> 
    {
        private DbContext EC_DbContext;

        public BlackListRepository(DbContext EC_DbContext) : base(EC_DbContext)
        {
            this.EC_DbContext = EC_DbContext;
        }

        public List<BlackList> GetAllBlackList()
        {
            return GetAll().ToList();
        }

        public bool InsertUserToBlackList(BlackList blackList)
        {
            return Insert(blackList);
        }
        public void DeleteFromBlackList(int id)
        {
            Delete(id);
        }

        public bool CheckUserNameBlocked(string userId)
        {
            return GetAny(b => b.SellerId == userId);

        }
        public BlackList Get_ById(int id)
        {
            return GetFirstOrDefault(b => b.Id == id);
        }

    }
}
