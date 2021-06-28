using BL.AppServices;
using BL.Dto;
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
    public class SellerReviewsController : ControllerBase
    {
        SellerAppService _sellerAppService;
        SellerReviewAppService _sellerReviewAppService;
        public SellerReviewsController(SellerReviewAppService sellerReviewsAppService, SellerAppService sellerAppService)
        {
            this._sellerReviewAppService = sellerReviewsAppService;
            this._sellerAppService = sellerAppService;
        }
        [HttpGet]
        public IActionResult GetAllSellerReviews()
        {
            return Ok(_sellerReviewAppService.GetAll());
        }
        [HttpGet("GetAllReviewOnSeller/{sellerId}")]
        public IActionResult GetAllReviewOnSeller(string sellerId)
        {
            return Ok(_sellerReviewAppService.GetSellersReviews(sellerId));
        }
        [HttpGet("{sellerId}")]
        public IActionResult GetUserReviewOnSeller(string userID, string sellerId)
        {
            SellerReviewModel sellerReview = _sellerReviewAppService.GetUserReviewsOnSeller(userID,sellerId);
            return Ok(sellerReview);
        }
        [HttpPost("AddSellerReview")]
        public IActionResult AddSellerReview(SellerReviewModel review)
        {
            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }
            try
            {
               
                var userReview = _sellerReviewAppService.GetUserReviewsOnSeller(review.UserId,review.SellerId);
                if (userReview != null)
                {
                    review.Id = userReview.Id;
                    _sellerReviewAppService.UpdateSellerReview(review);
                    return Created("Updated", review);
                }
                _sellerReviewAppService.SaveNewReview(review);
                return Created("Created", review);
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
                _sellerReviewAppService.DeleteSellerReview(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("averageRate/{sellerId}")]
        public IActionResult SellerAverageRate(string sellerId)
        {
            return Ok(_sellerReviewAppService.GetAverageRateForSeller(sellerId));
        }

        [HttpGet("SellerReviews/{sellerId}")]
        public IActionResult getAllSellerReviews(string sellerId)
        {
            return Ok(_sellerReviewAppService.GetSellersReviews(sellerId));
        }
        [HttpGet("TopRatingSeller")]
        public IActionResult TopRatingSeller()
        {
            return Ok(_sellerReviewAppService.GetTopRatedSeller());
        }


        [HttpGet("SellerReviewsCount/{sellerId}")]
        public IActionResult getReviewsCount(string sellerId)
        {
            return Ok(_sellerReviewAppService.CountSellerReviews(sellerId));
        }

        [HttpGet("test")]

        public IActionResult gettest()
        {
            return Ok(_sellerReviewAppService.getSellersByDescendingRating());
        }

    }
}
