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
    public class ClientNotifyController : ControllerBase
    {
        ClientNotifyAppService _clientNotifyAppService;
        public ClientNotifyController(ClientNotifyAppService clientNotifyAppService)
        {
            this._clientNotifyAppService = clientNotifyAppService;
        }
        [HttpGet]
        public IActionResult GetAllClientNotifys()
        {
            return Ok(_clientNotifyAppService.GetAllClientNotifys());
        }
        [HttpGet("{id}")]
        public IActionResult GetClientNotifyId(int id)
        {
            return Ok(_clientNotifyAppService.GetClientNotifyById(id));
        }
        [HttpPost]
        public IActionResult Create(ClientNotifyModel notification)
        {
            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _clientNotifyAppService.SaveNewClientNotify(notification);
                return Created("CreateClientNotify", notification);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("ChangeToRead/{Billingid}")]
        public IActionResult GetClientNotifyByBillingId(int Billingid)
        {
            var notifications = _clientNotifyAppService.GetAllClientNotifys().Where(r => r.BillingId == Billingid);
            return Ok(notifications);
        }
        [HttpPut("{id}")]
        public IActionResult Edit(int id, ClientNotifyModel notificationModel)
        {
            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _clientNotifyAppService.UpdateClientNotify(notificationModel);
                return Ok(notificationModel);
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
                _clientNotifyAppService.DeleteClientNotify(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("GetClientNotifyByuserId/{userId}")]
        public IActionResult GetClientNotifyByuserId(string userId)
        {
            var notificarions = _clientNotifyAppService.GetAllClientNotifys().Where(r => r.UserId == userId);
            return Ok(notificarions.OrderByDescending(i => i.Id));
        }
        [HttpGet("GetClientNotifyCountNotRead/{userId}")]
        public IActionResult GetClientNotifyCountNotRead(string userId)
        {
            int counter = 0;
            var sellerNotificarions = _clientNotifyAppService.GetAllClientNotifys().Where(r => r.UserId == userId);
            foreach (var item in sellerNotificarions)
            {
                if (item.IsRead == false)
                    counter++;
            }
            return Ok(counter);
        }

    }
}
