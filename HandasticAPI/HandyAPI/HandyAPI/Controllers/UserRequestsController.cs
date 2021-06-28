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
    public class UserRequestsController : ControllerBase
    {
        UserRequsetAppService _userRequestAppService;
        ShopAppService _shopAppService;


        public UserRequestsController(UserRequsetAppService userRequestAppService, ShopAppService shopAppService)
        {
            this._userRequestAppService = userRequestAppService;
            this._shopAppService = shopAppService;
        }

        [HttpGet]
        public IActionResult GetAllRequests()
        {
            return Ok(_userRequestAppService.GetAllRequests());
        }
        [HttpGet("{id}")]
        public IActionResult GetRequestById(int id)
        {
            return Ok(_userRequestAppService.GetRequest(id));
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
                if (_shopAppService.IsSellerHasShop(userRequestsModel.UserId))
                {
                    return BadRequest("You have already a Shop!");
                }
                var requests = _userRequestAppService.GetAllRequests();

                foreach(var request in requests)
                {
                    if (request.UserId == userRequestsModel.UserId)
                        return BadRequest("You have already requested please Try agian after three days");
                }
                _userRequestAppService.SaveNewRequest(userRequestsModel);
                return Created("CreateRequest", userRequestsModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }

        [HttpPut("{id}")]
        public IActionResult Edit(int id, UserRequestsModel userRequestsModel)
        {

            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _userRequestAppService.UpdateRequest(userRequestsModel);
                return Ok(userRequestsModel);
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
                _userRequestAppService.DeleteRequest(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("Reject/{id}")]
        public IActionResult DeleteRequestAndShop(int id)
        {
            try
            {
                string userId = _userRequestAppService.GetRequest(id).UserId;
                _shopAppService.DeleteSellerShop(userId);
                _userRequestAppService.DeleteRequest(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("DeleteByUserID/UserId")]
        public IActionResult DeleteByUserID(string userId)
        {
            try
            {
                var userRequests = _userRequestAppService.GetAllRequests();
                UserRequestsModel userRequestsModel = new UserRequestsModel();
                foreach (var Request in userRequests)
                {
                    if(userId == Request.UserId)
                    {
                        userRequestsModel = Request;
                        _userRequestAppService.DeleteRequest(userRequestsModel.Id);
                        return Ok();
                    }
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
