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
    public class BillingDetailsRepository : BaseRepository<BillingDetails>
    {
        private DbContext EC_DbContext;

        public BillingDetailsRepository(DbContext EC_DbContext) : base(EC_DbContext)
        {
            this.EC_DbContext = EC_DbContext;
        }

        #region CRUB

        public List<BillingDetails> GetAllBillingDetails()
        {
            return GetAll().ToList();
        }

        public bool InsertBillingDetails(BillingDetails billingDetails)
        {
            return Insert(billingDetails);
        }
        public void UpdateBillingDetails(BillingDetails billingDetails)
        {
            Update(billingDetails);
        }
        public void DeletebillingDetails(int id)
        {
            Delete(id);
        }

        public bool CheckbillingDetailsExists(BillingDetails billingDetails)
        {
            return GetAny(l => l.ID == billingDetails.ID);
        }
        public BillingDetails GetBillingDetailsById(int id)
        {
            return GetFirstOrDefault(l => l.ID == id);
        }

        #endregion
    }
}
