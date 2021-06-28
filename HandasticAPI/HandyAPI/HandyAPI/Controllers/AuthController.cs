using BL.AppServices;
using BL.Dto;
using DAL.Models;
using BL.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace HandyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly CartAppService _cartAppService;
        private readonly WishlistAppService _wishlistAppService;
        private readonly UserManager<AppUser> _userManager;
        private readonly IAuthService _authService;
        private readonly IEmailService _emailService;
        
        public AuthController(IAuthService authService, IEmailService emailService, CartAppService cartAppService, UserManager<AppUser> userManager , WishlistAppService wishlistService)
        {
            _authService = authService;
            _emailService = emailService;
            _userManager = userManager;
            _wishlistAppService = wishlistService;
            _cartAppService = cartAppService;

        }

        [HttpPost("Register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterModel model, bool isAdmin = false)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authService.RegisterAsync(model, isAdmin);

         

            if (!result.IsAuthenticated)
                return BadRequest(result.Message);
            var user = await _userManager.FindByEmailAsync(model.Email);

            WishlistModel wishlistModel = new WishlistModel() { UserId = user.Id };
            _wishlistAppService.CreateUserWishlist(wishlistModel.UserId);
            _cartAppService.CreateUserCart(user.Id);
            return Ok(result);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> GetTokenAsync([FromBody] TokenRequestModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authService.GetTokenAsync(model);

            if (!result.IsAuthenticated)
                return BadRequest(result.Message);

            return Ok(result);
        }
        [HttpPost("EmailConfrimation")]
        public async Task<IActionResult> EmailConfrimationAsync(ConfirmEmailModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return BadRequest("Invalid Email OR Not Register");
            else
            {
                UserData userData = new UserData();
                userData.Email = model.Email;
                userData.UserName = user.UserName;
                var result = _emailService.SendMessageToConfirmEmail(userData);
                if (result == true)
                {
                    await _userManager.SetTwoFactorEnabledAsync(user, true);
                    user.EmailConfirmed = true;
                    await _userManager.UpdateAsync(user);
                }
            }
            return Ok(user);
        }
        [HttpPost("SendMessageToEmail")]
        public async Task<IActionResult> SendMessageToEmail([FromForm] UserData userData)
        {
            var flag = _emailService.SendMessageToConfirmEmail(userData);
            if (flag)
                return Ok(userData);
            return BadRequest("Invaild Email OR Not Register");
        }
        [HttpPut("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (model.Password != model.ConfrimPassword)
                return BadRequest("Password and Confirm Password Not Match");
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return BadRequest("Invaild Email");
            var hashedNewPassword = _userManager.PasswordHasher.HashPassword(user, model.Password);
            user.PasswordHash = hashedNewPassword;
            await _userManager.UpdateAsync(user);
            return Ok(user);
        }
    }
}