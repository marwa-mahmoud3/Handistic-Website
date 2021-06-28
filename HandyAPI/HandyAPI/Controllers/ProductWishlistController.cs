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
    public class ProductWishlistController : ControllerBase
    {
        ProductWishListAppServices _productwishlistAppService;

        public ProductWishlistController(ProductWishListAppServices productwishlistAppService)
        {
            this._productwishlistAppService = productwishlistAppService;
        }

        [HttpGet]
        public IActionResult GetAllProductWishlists()
        {
            return Ok(_productwishlistAppService.GetAllProductWishlists());
        }
        [HttpGet("{id}")]
        public IActionResult GetProductWishlistById(int id)
        {
            return Ok(_productwishlistAppService.GetProductWishlistt(id));
        }

        [HttpPost]
        public IActionResult Create(ProductWishlistModel productwishlistModel)
        {

            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var prodWishlists = _productwishlistAppService.GetAllProductWishlists();
                var wish = prodWishlists.Find(w => w.productId == productwishlistModel.productId && w.WishlistID == productwishlistModel.WishlistID);
                if (wish != null)
                {
                    return BadRequest("This product already exists in the wishlist");
                }
                
                else
                {
                    _productwishlistAppService.SaveNewProductWishlist(productwishlistModel);

                    return Created("Created ProductWishlist", productwishlistModel);
                }
            }
            catch (Exception ex)
            {

               return BadRequest(ex.Message);

            }
        }


        [HttpPut("{id}")]
        public IActionResult Edit(int id, ProductWishlistModel productwishlistModel)
        {

            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _productwishlistAppService.UpdateProductWishlist(productwishlistModel);
                return Ok(productwishlistModel);
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
                _productwishlistAppService.DeleteProductWishlist(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("DeleteByListId/{id}")]
        public IActionResult DeleteById(int id)
        {
            try
            {

                var productwishlists = _productwishlistAppService.GetAllProductWishlists();
                var wish = productwishlists.FindAll(w => w.WishlistID == id);
                foreach(var productWishlist in wish)
                {
                    _productwishlistAppService.DeleteProductWishlist(productWishlist.Id);
                }
                return Ok("The product has been cleared successfully !");
            }
            catch (Exception ex)
            {
                return BadRequest("The wishlist is already Empty! ");
            }
        }

        [HttpDelete("DeleteByProductId/{id}")]
        public IActionResult DeleteByProductId(int id)
        {
            try
            {
                var productwishlists = _productwishlistAppService.GetAllProductWishlists();
                var wish = productwishlists.Find(w => w.productId == id);

                _productwishlistAppService.DeleteProductWishlist(wish.Id);
                
                return Ok("The product has been cleared successfully !");
            }
            catch (Exception ex)
            {
                return BadRequest("A problem happened! ");
            }
        }



        //[HttpGet("UserId")]
        //public bool GetByUserID(string userId)
        //{
        //    var sellers = _sellerAppService.GetAllSellers();
        //    SellersModel sellerModel = sellers.Find(s => s.SellerId == userId);
        //    return sellerModel != null;
        //}
    }
}
