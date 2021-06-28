using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class Chat
    {
        [Key]
        public int chatId { get; set; }
        public string SenderUserName { get; set; }
        public string RecieverUserName { get; set; }
        public virtual ICollection<ChatMessages> ChatMessages { get; set; }
    }
}
