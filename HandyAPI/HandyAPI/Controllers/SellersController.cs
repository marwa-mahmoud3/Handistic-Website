using BL.AppServices;
using BL.Dto;
using Microsoft.AspNetCore.Mvc;
using System;


namespace HandyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SellersController : ControllerBase
    {
        SellerAppService _sellerAppService;
        ShopAppService _shopAppService;

        public SellersController(SellerAppService sellerAppService, ShopAppService shopAppService)
        {
            this._sellerAppService = sellerAppService;
            _shopAppService = shopAppService;
        }

        [HttpGet]
        public IActionResult GetAllSellers()
        {
            return Ok(_sellerAppService.GetAllSellers());
        }
        [HttpGet("{id}")]
        public IActionResult GetSellerById(int id)
        {
            return Ok(_sellerAppService.GetSeller(id));
        }

        [HttpPost]
        public IActionResult Create(UserRequestsModel userRequestsModel)
        {

            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }
            try
            {
                SellersModel sellersModel = new SellersModel();
                sellersModel.FirstName = userRequestsModel.FirstName;
                sellersModel.LastName = userRequestsModel.LastName;
                sellersModel.Phone = userRequestsModel.Phone;
                sellersModel.Governorate = userRequestsModel.Governorate;
                sellersModel.IdCardImage = userRequestsModel.IdCardImage;
                sellersModel.PersonWithCardImage = userRequestsModel.PersonWithCardImage;
                sellersModel.ProductWithCardImage = userRequestsModel.ProductWithCardImage;
                sellersModel.Link = userRequestsModel.Link;
                sellersModel.SellerId = userRequestsModel.UserId;
                var shops = _shopAppService.GetAllShops();
                foreach(var shop in shops)
                {
                    if (shop.RquestId == sellersModel.SellerId)
                        sellersModel.ShopId = shop.Id;
                }
                _sellerAppService.SaveNewSeller(sellersModel);

                return Created("CreateSeller", sellersModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Edit(int id, SellersModel sellersModel)
        {

            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _sellerAppService.UpdateSeller(sellersModel);
                return Ok(sellersModel);
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
                _sellerAppService.DeleteSeller(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("UserId")]
        public IActionResult DeleteByUserID(string userId,string UserName)
        {
            try
            {
                var sellers = _sellerAppService.GetAllSellers();
                SellersModel sellerModel = sellers.Find(s => s.SellerId == userId);
                _sellerAppService.RemoveSellerProducts(UserName);
                _shopAppService.DeleteSellerShop(userId);
                _sellerAppService.DeleteSeller(sellerModel.Id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("UserId")]
        public bool GetByUserID(string userId)
        {
            var sellers = _sellerAppService.GetAllSellers();
            SellersModel sellerModel = sellers.Find(s => s.SellerId == userId);
            return sellerModel!= null;
        }
    }
}
