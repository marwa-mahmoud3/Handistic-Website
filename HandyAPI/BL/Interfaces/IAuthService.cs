using BL.Dto;
using System.Threading.Tasks;

namespace BL.Interfaces
{
    public interface IAuthService
    {
        Task<AuthModel> RegisterAsync(RegisterModel model, bool isAdmin);
        Task<AuthModel> GetTokenAsync(TokenRequestModel model);
        Task<AuthModel> ResetPasswordAsync(ResetPasswordModel model);
    }
}