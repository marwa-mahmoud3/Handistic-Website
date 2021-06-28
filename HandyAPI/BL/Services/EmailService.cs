using BL.Dto;
using BL.Interfaces;
using Microsoft.Extensions.Options;
using System;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace BL.Services
{
    public class EmailService : IEmailService
    {
        public bool SendMessageToConfirmEmail(UserData userData)
        {
            try
            {
                var fromAddress = new MailAddress("HandasticWebsite@gmail.com", "Handastic Website");
                var toAddress = new MailAddress(userData.Email, userData.UserName);
                const string fromPassword = "123456789HandasticWebsite";
                const string subject = "Handastic Website";
                const string body = "Your Account is Confirmed Now , Follow the link to begin your journey with us  http://localhost:3000/Login ";
                var smtp = new SmtpClient
                {
                    Host = "smtp.gmail.com",
                    Port = 587,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(fromAddress.Address, fromPassword),
                };
                using (var message = new MailMessage(fromAddress, toAddress)
                {
                    Subject = subject,
                    Body = body
                })
                {
                    smtp.Send(message);
                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}