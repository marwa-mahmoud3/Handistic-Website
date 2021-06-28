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
    public class ReviewRepository : BaseRepository<Review>
    {
        private DbContext EC_DbContext;

        public ReviewRepository(DbContext EC_DbContext) : base(EC_DbContext)
        {
            this.EC_DbContext = EC_DbContext;
        }

        public bool InsertReview(Review review)
        {
            return Insert(review);
        }

        public IEnumerable<Review> GetProductReviews(int productId)
        {
            var query = DbSet
                .Include(r => r.Product)
                .Where(r => r.ProductId == productId);
            return query;
        }
        internal int CountProductReviews(int productId)
        {
            return DbSet.Where(p => p.ProductId == productId).Count();
        }

        internal double GetAverageRateForProduct(int productId)
        {
            double ratingAverage = DbSet.Where(r => r.ProductId == productId)
                .Select(r => r.Rating).Average();
            return ratingAverage;
        }
        public Review GetReviewById(int id)
        {
            return DbSet.Include(r => r.User).FirstOrDefault(r => r.Id == id);
        }
        internal Review GetUserReviewOnProduct(string userId, int productId)
        {
            return DbSet
                .Include(r => r.User)
                .FirstOrDefault(r => r.UserId == userId && r.ProductId == productId);
        }
        public IEnumerable<Review> GetTopRated()
        {
            var query = DbSet.OrderByDescending(r => r.Rating);
            return query;
        }
    }
}