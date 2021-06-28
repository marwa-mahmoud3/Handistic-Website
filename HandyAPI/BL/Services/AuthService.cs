using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BL.Configuration;
using DAL.Models;
using Microsoft.AspNetCore.WebUtilities;
using AutoMapper;
using BL.Dto;
using BL.Interfaces;

namespace BL.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly JWT _jwt;

        public AuthService(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager, IOptions<JWT> jwt)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _jwt = jwt.Value;
        }

        [Obsolete]
        public async Task<AuthModel> RegisterAsync(RegisterModel model, bool isAdmin)
        {
            var userbyEmail = await _userManager.FindByEmailAsync(model.Email);
            if (userbyEmail != null)
                return new AuthModel { Message = "Email is already registered!" };
            var userbyName = await _userManager.FindByNameAsync(model.UserName);

            if (userbyName != null)
                return new AuthModel { Message = "Username is already registered!" };

            if (model.Password != model.ConfirmPassword)
                return new AuthModel { Message = "Password and Confirm Password Not Match" };
            var user = new AppUser
            {
                UserName = model.UserName,
                Email = model.Email,
                City = model.City,
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            var role = "";
            if (!result.Succeeded)
            {
                var errors = string.Empty;

                foreach (var error in result.Errors)
                    errors += $"{error.Description},";

                return new AuthModel { Message = errors };
            }
            if (isAdmin)
            {
                await _userManager.AddToRoleAsync(user, "Admin");
                role = "Admin";
            }
            else
            {
                await _userManager.AddToRoleAsync(user, "User");
                role = "User";
            }
            var jwtSecurityToken = await CreateJwtToken(user);

            return new AuthModel
            {
                Email = user.Email,
                ExpiresOn = jwtSecurityToken.ValidTo,
                IsAuthenticated = true,
                Roles = new List<string> { role },
                Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken),
                UserName = user.UserName,
                UserId = user.Id,
            };
        }

        public async Task<AuthModel> GetTokenAsync(TokenRequestModel model)
        {
            var authModel = new AuthModel();

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user is null || !await _userManager.CheckPasswordAsync(user, model.Password))
            {
                authModel.Message = "Email or Password is incorrect!";
                return authModel;
            }
            //if (!await _userManager.IsEmailConfirmedAsync(user))
            //{
            //    authModel.Message = "Email is not confirmed";
            //    return authModel;
            //}
            var jwtSecurityToken = await CreateJwtToken(user);
            var rolesList = await _userManager.GetRolesAsync(user);

            authModel.IsAuthenticated = true;
            authModel.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
            authModel.Email = user.Email;
            authModel.UserName = user.UserName;
            authModel.UserId = user.Id;
            authModel.ExpiresOn = jwtSecurityToken.ValidTo;
            authModel.Roles = rolesList.ToList();

            return authModel;
        }

        private async Task<JwtSecurityToken> CreateJwtToken(AppUser user)
        {
            var userClaims = await _userManager.GetClaimsAsync(user);
            var roles = await _userManager.GetRolesAsync(user);
            var roleClaims = new List<Claim>();

            foreach (var role in roles)
                roleClaims.Add(new Claim("roles", role));

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("uid", user.Id)
            }
            .Union(userClaims)
            .Union(roleClaims);

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha512Signature);

            var jwtSecurityToken = new JwtSecurityToken(
                issuer: _jwt.Issuer,
                audience: _jwt.Audience,
                claims: claims,
                expires: DateTime.Now.AddDays(_jwt.DurationInDays),
                signingCredentials: signingCredentials);

            return jwtSecurityToken;
        }

        public async Task<AuthModel> ResetPasswordAsync(ResetPasswordModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
                return new AuthModel { Message = "Invail Email or Not Register" };
            var result = await _userManager.IsEmailConfirmedAsync(user);
            if (!result)
                return new AuthModel { Message = "Email isn't Confirm " };
            if (model.Password != model.ConfrimPassword)
                return new AuthModel { Message = "Password and Confirm Password Not Match" };

            var authModel = new AuthModel();

            var jwtSecurityToken = await CreateJwtToken(user);
            authModel.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);

            await _userManager.ResetPasswordAsync(user, authModel.Token, model.Password);
            return new AuthModel { Message = "" };
        }
    }
}