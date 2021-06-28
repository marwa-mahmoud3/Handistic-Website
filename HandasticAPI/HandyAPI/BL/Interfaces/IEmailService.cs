using BL.Dto;
using System.Threading.Tasks;

namespace BL.Interfaces
{
    public interface IEmailService
    {
        public bool SendMessageToConfirmEmail(UserData userData);
    }
}
