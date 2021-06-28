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
    public class WishlistController : ControllerBase
    {
        WishlistAppService _wishlistAppService;
        public WishlistController(WishlistAppService wishlistAppService)
        {
            this._wishlistAppService = wishlistAppService;
        }

        [HttpGet]
        public IActionResult GetAllWishlists()
        {
            return Ok(_wishlistAppService.GetAllWishlists());
        }
        [HttpGet("{id}")]
        public IActionResult GetWishlistById(int id)
        {
            return Ok(_wishlistAppService.GetWishlist(id));
        }


        //[HttpPost]
        //public IActionResult Create(WishlistModel wishlistModel)
        //{

        //    if (ModelState.IsValid == false)
        //    {
        //        return BadRequest(ModelState);
        //    }
        //    try
        //    {

        //        _wishlistAppService.CreateUserWishlist(wishlistModel);

        //        return Created("CreateWishlist", wishlistModel);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //       // return BadRequest(ex.Message);

        //    }
        //}
        [HttpGet("GetId/{userid}")]
        public Wishlist GetWishlistByUserId(string userid)
        {
            var empty = new Wishlist();
          
                var wishlists = _wishlistAppService.GetAllWishlists();
            var wish = wishlists.Find(w => w.UserId == userid);

            //foreach (var wishlist in wishlists)
            //{
            //    if (wishlist.UserId == userid)
            //    {

            //        return wishlist;
            //    }
            //}

            return wish;


        }

        [HttpPut("{id}")]
        public IActionResult Edit(int id, WishlistModel wishlistModel)
        {

            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _wishlistAppService.UpdateWishlist(wishlistModel);
                return Ok(wishlistModel);
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
                _wishlistAppService.DeleteWishlist(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
