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
    public class NotificationsController : ControllerBase
    {
        NotificationAppService _notificationAppService;
        public NotificationsController(NotificationAppService notificationAppService)
        {
            this._notificationAppService = notificationAppService;
        }
        [HttpGet]
        public IActionResult GetAllNotifications()
        {
            return Ok(_notificationAppService.GetAllNotifications());
        }
        [HttpGet("{id}")]
        public IActionResult GetNotificationId(int id)
        {
            return Ok(_notificationAppService.GetNotificationById(id));
        }
        [HttpPost]
        public IActionResult Create(NotificationModel notification)
        {
            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _notificationAppService.SaveNewNotification(notification);
                return Created("CreateNotification", notification);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("ChangeToRead/{Billingid}")]
        public IActionResult GetNotificarionByBillingId(int Billingid)
        {
            var notifications = _notificationAppService.GetAllNotifications().Where(r=>r.BillingId == Billingid);
            return Ok(notifications);
        }
        [HttpPut("{id}")]
        public IActionResult Edit(int id, NotificationModel notificationModel)
        {
            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _notificationAppService.UpdateNotification(notificationModel);
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
                _notificationAppService.DeleteNotification(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("GetNotificationBySellerId/{sellerId}")]
        public IActionResult GetNotificationBySellerId(string sellerId)
        {
           var notificarions= _notificationAppService.GetAllNotifications().Where(r => r.SellerId == sellerId);
            return Ok(notificarions.OrderByDescending(i => i.Id));
        }
        [HttpGet("GetNotificationCountNotRead/{sellerId}")]
        public IActionResult GetNotificationCountNotRead(string sellerId)
        {
            int counter = 0;
            var sellerNotificarions = _notificationAppService.GetAllNotifications().Where(r => r.SellerId == sellerId);
            foreach (var item in sellerNotificarions) {
                if (item.IsRead == false)
                    counter++;
            }
            return Ok(counter);
        }

        [HttpGet("GetNotifyByBillingId/{BillingId}")]

        public NotificationModel GetNotifyByBillingId(int BillingId)
        {

            var result = _notificationAppService.GetAllNotifications().Find(b => b.BillingId == BillingId);

            return result;
        }
    }
}