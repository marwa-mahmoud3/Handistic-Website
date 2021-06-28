using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Models;

namespace HandyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<AppUser> _userManager;
        //private readonly RoleManager<IdentityRole> _roleManager;

        public UsersController(ApplicationDbContext context, UserManager<AppUser> userManager)
        {
            this._context = context;
            this._userManager = userManager;
        }
        [HttpGet("GetAllUsers")]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetAllUsers()
        {
            List<AppUser> users = new List<AppUser>();
            var roleUserId = _context.Roles.FirstOrDefault(r => r.Name == "User").Id;
            foreach (var item in _context.UserRoles.ToList())
            {
                if (item.RoleId == roleUserId)
                {
                    users.Add(await _context.Users.FindAsync(item.UserId));
                }
            }
            return users;
        }
        [HttpGet("GetUserByEmail/{email}")]
        public async Task<ActionResult<AppUser>> GetUser(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }
        [HttpGet("GetUserByUserName/{userName}")]
        public async Task<ActionResult<AppUser>> GetUserByUserName(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            return user;
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if(user == null)
            {
                return NotFound();
            }

            await _userManager.DeleteAsync(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet, Route("admins")]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetAdmins()
        {
            List<AppUser> admins = new List<AppUser>();
            var roleAdminId = _context.Roles.FirstOrDefault(r => r.Name == "Admin").Id;
            foreach (var item in _context.UserRoles.ToList())
            {
                if (item.RoleId == roleAdminId)
                {
                    admins.Add(await _context.Users.FindAsync(item.UserId));
                }
            }
            return admins;
        }
        [HttpGet("GetNameByUserId/{userId}")]
        public async Task<ActionResult<AppUser>> GetNameByUserId(string userId)
        {
           var user = await _userManager.FindByIdAsync(userId);
            return user;
        }
    }
}
