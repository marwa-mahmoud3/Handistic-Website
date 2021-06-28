using BL.AppServices;
using BL.Dto;
using Microsoft.AspNetCore.Mvc;
using System;

namespace HandyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopsController : ControllerBase
    {
        ShopAppService _shopAppService;
        

        public ShopsController(ShopAppService shopAppService)
        {
            this._shopAppService = shopAppService;
        }

        [HttpGet]
        public IActionResult GetAllShops()
        {
            return Ok(_shopAppService.GetAllShops());
        }
        [HttpGet("{id}")]
        public IActionResult GetShopById(int id)
        {
            return Ok(_shopAppService.GetShop(id));
        }

        [HttpGet("GetShopById")]
        public IActionResult GetShopsById(int id)
        {
            return Ok(_shopAppService.GetShop(id));
        }

        [HttpPost]
        public IActionResult Create(ShopModel shopModel)
        {

            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _shopAppService.SaveNewShop(shopModel);

                return Created("CreateShop", shopModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }

        [HttpPut("{id}")]
        public IActionResult Edit(int id, ShopModel shopModel)
        {

            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _shopAppService.UpdateShop(shopModel);
                return Ok(shopModel);
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
                _shopAppService.DeleteShop(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpGet("UserId")]
        public ShopModel GetByUserID(string userId)
        {
            var shops = _shopAppService.GetAllShops();
            ShopModel shopmodel = shops.Find(s => s.RquestId == userId);
            return shopmodel;
        }
    }
}
