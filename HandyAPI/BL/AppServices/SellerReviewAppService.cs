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
    public class SellerReviewAppService : AppServiceBase
    {
        public SellerReviewAppService(IUnitOfWork theUnitOfWork, IMapper mapper) : base(theUnitOfWork, mapper)
        {

        }
        public SellerReviewModel SaveNewReview(SellerReviewModel sellerReview)
        {
            bool result = false;
            var res = Mapper.Map<SellerReview>(sellerReview);

            if (TheUnitOfWork.SellerReview.Insert(res))
            {
                result = TheUnitOfWork.Commit() > new int();
            }
            return (result) ? Mapper.Map<SellerReviewModel>(sellerReview) : null;
        }
        public SellerReviewModel UpdateSellerReview(SellerReviewModel sellerReview)
        {
            bool result = false;
            SellerReview oldSellerReview = TheUnitOfWork.SellerReview.GetSellerReviewById(sellerReview.Id) ;
            Mapper.Map(sellerReview, oldSellerReview);
            TheUnitOfWork.SellerReview.Update(oldSellerReview);
            result = TheUnitOfWork.Commit() > new int();
            return (result) ? Mapper.Map<SellerReviewModel>(oldSellerReview) : null;
        }
        public bool DeleteSellerReview(int id)
        {
            bool result = false;
            TheUnitOfWork.SellerReview.Delete(id);
            result = TheUnitOfWork.Commit() > new int();
            return result;
        }
        public int CountSellerReviews(string sellerId)
        {
            return TheUnitOfWork.SellerReview.CountSellerReviews(sellerId);
        }
        public SellerReviewModel GetUserReviewsOnSeller(string userId, string sellerId)
        {
            SellerReview sellerReview = TheUnitOfWork.SellerReview
                .GetUserReviewOnSeller(userId, sellerId);
            return Mapper.Map<SellerReviewModel>(sellerReview);

        }
        public IEnumerable<SellerReview> GetAll()
        {
            IEnumerable<SellerReview> reviews = TheUnitOfWork.SellerReview.GetWhere(r=>r.Rating == 5);
            return Mapper.Map<IEnumerable<SellerReview>>(reviews);
        }
        public double GetAverageRateForSeller(string sellerId)
        {
            if (TheUnitOfWork.SellerReview.CountSellerReviews(sellerId) == 0)
            {
                return 0.0;
            }
            return TheUnitOfWork.SellerReview.GetAverageRateForSeller(sellerId);
        }
        public IEnumerable<SellerReviewModel> GetSellersReviews(string sellerId)
        {
            IEnumerable<SellerReview> sellerReviews = TheUnitOfWork.SellerReview.GetSellerReviews(sellerId);
            return Mapper.Map<IEnumerable<SellerReviewModel>>(sellerReviews);
        }
        public SellersModel GetTopRatedSeller()
        {
            double maxRating = 0;
            Sellers seller = null;
            IEnumerable<Sellers> sellers = TheUnitOfWork.Seller.GetAllSellers();
            foreach (var s in sellers)
            {
                var sellerId = s.SellerId;
                if (TheUnitOfWork.SellerReview.CountSellerReviews(sellerId) > 0)
                {
                    double avRating = TheUnitOfWork.SellerReview.GetAverageRateForSeller(sellerId);
                    if (avRating > maxRating)
                    {
                        seller = s;
                        maxRating = avRating;
                    }
                }
            }
            return Mapper.Map<SellersModel>(seller);

        }
        public IEnumerable<SellersModel> getSellersByDescendingRating()
        {
            IEnumerable<Sellers> sellers = TheUnitOfWork.Seller.GetAllSellers();
            List<Sellers> sellersWithoutRating = new List<Sellers>();
            List<Sellers> sellersDescendingByAvRating = new List<Sellers>();

            var list = new List<KeyValuePair<Sellers, double>>();
            foreach (var s in sellers)
            {
                var sellerId = s.SellerId;
                if (TheUnitOfWork.SellerReview.CountSellerReviews(sellerId) > 0)
                {
                    double avRating = TheUnitOfWork.SellerReview.GetAverageRateForSeller(sellerId);
                    list.Add(new KeyValuePair<Sellers, double>(s, avRating));
                }
                else sellersWithoutRating.Add(s);
            }
            list.OrderByDescending(e => e.Value);
            list.ForEach(e =>
            {
                sellersDescendingByAvRating.Add(e.Key);
            });
            sellersDescendingByAvRating.AddRange(sellersWithoutRating);
            return Mapper.Map<IEnumerable<SellersModel>>(sellersDescendingByAvRating);
        }

    }
}
