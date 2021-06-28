using BL.Dto;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace HandyAPI.Hubs { 
    public class ChatHub : Hub 
    {
        public Task SendMessage1(string user ,string message)
        {
            return Clients.All.SendAsync("ReceiveOne", user, message);
        }
        public Task SendMessage(Message msg)
        {
            return Clients.Client(msg.ConnectionId).SendAsync("ReceiveOne", msg.user, msg.msgText);
        }
    } 
}
