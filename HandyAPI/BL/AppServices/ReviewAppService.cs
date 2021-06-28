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
     public class ReviewAppService : AppServiceBase
    {
        public ReviewAppService(IUnitOfWork theUnitOfWork, IMapper mapper) : base(theUnitOfWork, mapper)
        {

        }
        public ReviewModel SaveNewReview(ReviewModel review)
        {
            bool result = false;
            var res = Mapper.Map<Review>(review);

            if (TheUnitOfWork.Review.Insert(res))
            {
                result = TheUnitOfWork.Commit() > new int();
            }
            return (result) ? Mapper.Map<ReviewModel>(review) : null;
        }
        public ReviewModel UpdateReview(ReviewModel review)
        {
            bool result = false;
            Review oldReview = TheUnitOfWork.Review.GetReviewById(review.Id);
            Mapper.Map(review, oldReview);
            TheUnitOfWork.Review.Update(oldReview);
            result = TheUnitOfWork.Commit() > new int();
            return (result) ? Mapper.Map<ReviewModel>(oldReview) : null;
        }
        public bool DeleteReview(int id)
        {
            bool result = false;
            TheUnitOfWork.Review.Delete(id);
            result = TheUnitOfWork.Commit() > new int();
            return result;
        }
        public int CountProductReviews(int productId)
        {
            return TheUnitOfWork.Review.CountProductReviews(productId);
        }
        public ReviewModel GetUserReviewOnProduct(string userId, int productId)
        {
            Review review = TheUnitOfWork.Review
                .GetUserReviewOnProduct(userId, productId);
            return Mapper.Map<ReviewModel>(review);

        }
        public double GetAverageRateForProduct(int productId)
        {
            if (TheUnitOfWork.Review.CountProductReviews(productId) == 0)
            {
                return 0.0;
            }
            return TheUnitOfWork.Review.GetAverageRateForProduct(productId);
        }
        public IEnumerable<ReviewModel> GetProductsReviews(int productId)
        {
            IEnumerable<Review> reviews = TheUnitOfWork.Review.GetProductReviews(productId);
            return Mapper.Map<IEnumerable<ReviewModel>>(reviews);
        }
        public ProductModel GetTopRatingProduct()
        {
            double maxRating = 0;
            Product product = null;
            IEnumerable<Product> products = TheUnitOfWork.Product.GetAllProduct();
            foreach (var p in products)
            {
                if (TheUnitOfWork.Review.GetProductReviews(p.Id).Count() > 0)
                {
                    double avRating = TheUnitOfWork.Review.GetAverageRateForProduct(p.Id);
                    if (avRating > maxRating)
                    {
                        product = p;
                        maxRating = avRating;
                    }
                }
            }         
            return Mapper.Map<ProductModel>(product);
   
        }
        public IEnumerable<ProductModel> getProductsByDescendingRating()
        {
            IEnumerable<Product> products = TheUnitOfWork.Product.GetAllProduct();
            List<Product> productWithoutRating = new List<Product>();
            List<Product> productsDescendingByAvRating = new List<Product>();

            var list = new List<KeyValuePair<Product, double>>();
            foreach (var p in products)
            {
                if (TheUnitOfWork.Review.GetProductReviews(p.Id).Count() > 0)
                {
                    double avRating = TheUnitOfWork.Review.GetAverageRateForProduct(p.Id);
                    list.Add(new KeyValuePair<Product, double>(p, avRating));
                }
                else productWithoutRating.Add(p);
            }
            list.OrderByDescending(e => e.Value);
            list.ForEach(e =>
            {
                productsDescendingByAvRating.Add(e.Key);
            });
            productsDescendingByAvRating.AddRange(productWithoutRating);
            return Mapper.Map <IEnumerable< ProductModel >> (productsDescendingByAvRating);
        }
        public List<ProductModel> GetTopRatedProductsPagination(int pageSize, int pageNumber)
        {
            var reviews = TheUnitOfWork.Review.GetTopRated().ToList();
            HashSet<Product> products = new HashSet<Product>();
            foreach (var item in reviews)
            {
                products.Add(TheUnitOfWork.Product.GetProductById(item.ProductId));
            }
            pageSize = (pageSize <= 0) ? 10 : pageSize;
            pageNumber = (pageNumber < 1) ? 0 : pageNumber - 1;
            products.Skip(pageNumber * pageSize).Take(pageSize).ToList();
            return Mapper.Map<List<ProductModel>>(products);
        }
        public IEnumerable<ProductModel> GetTopRatedProductsByDescendingRating()
        {
            IEnumerable<Product> products = TheUnitOfWork.Product.GetAllProduct();
            List<Product> productWithoutRating = new List<Product>();
            List<Product> productsDescendingByAvRating = new List<Product>();
            var list = new List<KeyValuePair<Product, double>>();
            foreach (var p in products)
            {
                if (TheUnitOfWork.Review.GetProductReviews(p.Id).Count() > 0)
                {
                    double avRating = TheUnitOfWork.Review.GetAverageRateForProduct(p.Id);
                    list.Add(new KeyValuePair<Product, double>(p, avRating));
                }
                else productWithoutRating.Add(p);
            }
            list.OrderBy(e => e.Value);
            list.ForEach(e =>
            {
                productsDescendingByAvRating.Add(e.Key);
            });
            //productsDescendingByAvRating.AddRange(productWithoutRating);
            return Mapper.Map<IEnumerable<ProductModel>>(productsDescendingByAvRating);
        }
        public IEnumerable<ProductModel> GitMixTopSellingAndRating()
        {
            List<Product> res = new List<Product>();
            var myDictionary = new Dictionary<int, int>();
            var productSelling = TheUnitOfWork.Product.GetAllProduct().Where(p => p.SalesCount > 0);
            var topSelling = productSelling.OrderByDescending(p => p.SalesCount);
            var ProductsRating = getProductsByDescendingRating();
            for (int i = 0; i < Math.Max(productSelling.Count(), topSelling.Count()) ; i++)
            {

                if (i < topSelling.Count() && !myDictionary.ContainsKey(productSelling.ElementAt(i).Id))
                {
                    myDictionary.Add(productSelling.ElementAt(i).Id, 1);
                    res.Add(productSelling.ElementAt(i));
                }
                if (i < ProductsRating.Count() && !myDictionary.ContainsKey(ProductsRating.ElementAt(i).Id))
                {
                    myDictionary.Add(ProductsRating.ElementAt(i).Id, 1);
                    res.Add(Mapper.Map<Product>(ProductsRating.ElementAt(i)));
                }
            }
            return Mapper.Map<IEnumerable<ProductModel>>(res);
        }
    }
}