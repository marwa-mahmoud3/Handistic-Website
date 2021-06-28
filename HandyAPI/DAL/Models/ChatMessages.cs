using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Models
{
    public class ChatMessages
    {
        public int ID { get; set; }
        [ForeignKey("chat")]
        public int chatId { get; set; }
        public string content { get; set; }
        public string senderUserName { get; set; }
        public virtual Chat chat { get; set; }
    }
}
