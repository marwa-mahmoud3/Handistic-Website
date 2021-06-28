using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DAL.Models;
using AutoMapper;
using BL.AppServices;
using BL.Dto;

namespace HandyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityShopsController : ControllerBase
    {
        CityShopAppService _cityShopAppService;
        ShopAppService _shopAppService;

        public CityShopsController(CityShopAppService cityShopAppService , ShopAppService shopAppService)
        {
            this._cityShopAppService = cityShopAppService;
            this._shopAppService = shopAppService;
        }

        [HttpGet]
        public IActionResult GetAllCityShops()
        {
            return Ok(_cityShopAppService.GetAllCityShops());
        }
        [HttpGet("{id}")]
        public IActionResult GetCityShopById(int id)
        {
            return Ok(_cityShopAppService.GetCityShop(id));
        }

        [HttpPost]
        public IActionResult Create(CityShopModel cityShopModel)
        {

            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _cityShopAppService.SaveNewCityShop(cityShopModel);

                return Created("CreateCityShop", cityShopModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }


        [HttpPost("CityShop")]

        public IActionResult CreateCityShop(ShopModel shopModel)
        {

            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _shopAppService.SaveNewShop(shopModel);
                var shops = _shopAppService.GetAllShops();
                foreach (var shop in shops)
                {
                    if (shop.RquestId == shopModel.RquestId)
                    {
                        shopModel.Id = shop.Id;
                    }
                }
                foreach (var city in shopModel.cities)
                {
                    CityShopModel cityShopModel = new CityShopModel();
                    cityShopModel.CityId = city.Id;
                    cityShopModel.ShopId = shopModel.Id;
                    _cityShopAppService.SaveNewCityShop(cityShopModel);
                }
                
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }

        [HttpPut("{id}")]
        public IActionResult Edit(int id, CityShopModel cityShopModel)
        {

            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _cityShopAppService.UpdateCityShop(cityShopModel);
                return Ok(cityShopModel);
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
                _cityShopAppService.DeleteCityShop(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
    }
