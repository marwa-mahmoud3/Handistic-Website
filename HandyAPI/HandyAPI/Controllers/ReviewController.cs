using BL.AppServices;
using BL.Dto;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HandyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        ProductAppService _productAppService;
        ReviewAppService _reviewsAppService;
        public ReviewController(ReviewAppService reviewsAppService, ProductAppService productAppService)
        {
            this._reviewsAppService = reviewsAppService;
            this._productAppService = productAppService;
        }
        [HttpGet("{productId}")]
        public IActionResult GetUserReviewOnProduct(int productId,string userId)
        {
            ReviewModel userReview = _reviewsAppService.GetUserReviewOnProduct(userId, productId);
            return Ok(userReview);
        }
        [HttpPost("AddReview")]
        public IActionResult AddReview(ReviewModel review)
        {
            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }
            try
            {
    
                var userReview = _reviewsAppService.GetUserReviewOnProduct(review.UserId, review.ProductId);
                if (userReview == null)
                {
                    ReviewModel addedReview = _reviewsAppService.SaveNewReview(review);
                    return Created("created", addedReview);
                }
                review.Id = userReview.Id;
                _reviewsAppService.UpdateReview(review);

                return Created("Updated", review);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
      
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _reviewsAppService.DeleteReview(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("averageRate/{productId}")]
        public IActionResult ProductAverageRate(int productId)
        {
            return Ok(_reviewsAppService.GetAverageRateForProduct(productId));
        }

        [HttpGet("ProductReviews/{productId}")]
        public IActionResult getAllProductReviews(int productId)
        {
            _reviewsAppService.GetProductsReviews(productId);
            return Ok(_reviewsAppService.GetProductsReviews(productId));
        }
        [HttpGet("TopRatingProduct")]
        public IActionResult TopRatingProduct()
        {
            return Ok(_reviewsAppService.GetTopRatingProduct());
        }

        [HttpGet("RelatedToTopRatingProduct")]
        public IActionResult getAllRelatedProductsToTopRatingProduct()
        {
            var product = _reviewsAppService.GetTopRatingProduct();
            return Ok(_productAppService.GetAllProductWhere(product.CategoryId));
        }

        [HttpGet("ProductReviewsCount/{productId}")]
        public IActionResult getReviewsCount(int productId)
        {
            return Ok(_reviewsAppService.CountProductReviews(productId));
        }

        [HttpGet("test")]

        public IActionResult gettest()
        {
            return Ok(_reviewsAppService.getProductsByDescendingRating());
        }
        [HttpGet("GetTopRatedProductsPagination/{pageSize}/{pageNumber}")]
        public IActionResult GetTopRatedProductsPagination(int pageSize, int pageNumber)
        {
            return Ok(_reviewsAppService.GetTopRatedProductsPagination(pageSize, pageNumber));
        }
        [HttpGet("GetTopRatedProducts")]
        public IActionResult GetTopRatedProducts()
        {   
            return Ok(_reviewsAppService.GetTopRatedProductsByDescendingRating());
        }
    }
}