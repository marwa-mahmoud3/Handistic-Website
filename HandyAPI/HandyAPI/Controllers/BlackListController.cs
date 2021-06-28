using BL.AppServices;
using BL.Dto;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HandyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlackListController : ControllerBase
    {
        private readonly BlackListAppService _blackListAppService;
        private readonly UserManager<AppUser> _userManager;

        public BlackListController(BlackListAppService blackListAppService, UserManager<AppUser>userManager)
        {
            this._blackListAppService = blackListAppService;
            this._userManager = userManager;
        }

        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            return Ok(_blackListAppService.GetAll());
        }
        [HttpGet("GetById")]
        public IActionResult GetById(int id)
        {
            return Ok(_blackListAppService.GetById(id));
        }
        [HttpGet("UserExists/{userId}")]
        public bool CheckIfUserlocked(string userId)
        {
          return  _blackListAppService.IsUserBlocked(userId);
        }

        [HttpPost("AddSeller")]
        public IActionResult AddSellerToBlackList(SellersModel seller)
        {
            BlackListModel blackListModel = new BlackListModel();
            blackListModel.SellerId = seller.SellerId;
            blackListModel.FirstName = seller.FirstName;
            blackListModel.LastName = seller.LastName;
            blackListModel.Phone = seller.Phone;
            blackListModel.IdCardImage = seller.IdCardImage;
            blackListModel.PersonWithCardImage = seller.PersonWithCardImage;
            blackListModel.Governorate = seller.Governorate;
            blackListModel.ProductWithCardImage = seller.ProductWithCardImage;
            return Ok(_blackListAppService.Save(blackListModel));
        }
        [HttpDelete]
        public bool UnBlockUser(int id)
        {
            return _blackListAppService.Delete(id);
        }
        [HttpGet("GetBlockedUser/{userId}")]
        public IActionResult GetBlockedUser(string userId)
        {
            return Ok(_blackListAppService.GetByUserId(userId));
        }

    }

    
}
