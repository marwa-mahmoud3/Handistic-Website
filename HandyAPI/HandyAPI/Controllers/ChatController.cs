using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BL.Dto;
using DAL.Models;
using HandyAPI.Hubs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Public_Chat.Controllers
{
    [Produces("application/json")]
    [Route("api/chat")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IHubContext<ChatHub> _hubContext;
        private readonly UserManager<AppUser> _userManager;

        public ChatController(IHubContext<ChatHub> hubContext, UserManager<AppUser> userManager )
        {
            _hubContext = hubContext;
            _userManager = userManager;
        }

        [Route("send")]
        [HttpPost]
        public IActionResult SendRequest(Message msg, string ReceiverUserName)
        {
            _hubContext.Clients.All.SendAsync("ReceiveOne", msg.user, msg.msgText);
            return Ok();
        }
          
        //public IActionResult SendRequest(Message msg)
        //{
        //    _hubContext.Clients.Client(msg.ConnectionId).SendAsync("ReceiveOne",msg.user, msg.msgText);
        //    return Ok();
        //}

    }
}
