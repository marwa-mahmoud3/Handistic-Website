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
   public class SellerReviewRepository : BaseRepository<SellerReview>
    {
        private DbContext EC_DbContext;

        public SellerReviewRepository(DbContext EC_DbContext) : base(EC_DbContext)
        {
            this.EC_DbContext = EC_DbContext;
        }

        public bool InsertSellerReview(SellerReview sellerReview)
        {
            return Insert(sellerReview);
        }
        public IEnumerable<SellerReview> GetSellerReviews(string sellerId)
        {
            var query = DbSet
                .Include(r => r.User)
                .Where(r => r.SellerId == sellerId);
            return query;
        }
        internal int CountSellerReviews(string sellerId)
        {
            return DbSet.Where(p => p.SellerId == sellerId).Count();
        }

        internal double GetAverageRateForSeller(string sellerId)
        {
            double ratingAverage = DbSet.Where(r => r.SellerId == sellerId)
                .Select(r => r.Rating).Average();
            return ratingAverage;
        }
        public SellerReview GetSellerReviewById(int Id)
        {
            return DbSet.Include(r => r.User).FirstOrDefault(r => r.Id == Id);
        }
        internal SellerReview GetUserReviewOnSeller(string userId, string sellerId)
        {
            return DbSet
                .Include(r => r.User)
                .FirstOrDefault(r => r.UserId == userId && r.SellerId == sellerId);
        }

    }
}
