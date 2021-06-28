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
    public class BillingDetailsController : ControllerBase
    {
        BillingDetailsAppService _billingDetailsAppService;

        public BillingDetailsController(BillingDetailsAppService billingDetailsAppService)
        {
            this._billingDetailsAppService = billingDetailsAppService;
        }

        [HttpGet]
        public IActionResult GetAllBillingDetails()
        {
            return Ok(_billingDetailsAppService.GetAllBillingDetails());
        }
        [HttpGet("{id}")]
        public IActionResult GetBillingDetailsById(int id)
        {
            return Ok(_billingDetailsAppService.GetBillingDetails(id));
        }
        [HttpGet("userId")]
        public int GetBillingDetailsId(string userId)
        {

            var result = _billingDetailsAppService.GetAllBillingDetails().Find(b => b.userId == userId).ID;
            return result;
        }

        [HttpPost]
        public IActionResult Create(BillingDetailsModel billingDetailsModel)
        {

            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }
            try
            {

                var billing = _billingDetailsAppService.CreateBillingDetails(billingDetailsModel);

                return Ok(billing);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }
        [HttpGet("GetLastBillingDetails")]
        public IActionResult GetLastBillingDetails(string UserId)
        {
            var Billing = _billingDetailsAppService.GetAllBillingDetails().Where(r => r.userId == UserId)
                .OrderByDescending(i => i.ID).FirstOrDefault();
            return Ok(Billing);
        }
    }
}
