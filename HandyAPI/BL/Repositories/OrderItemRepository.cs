using BL.Bases;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Repositories
{
    public class OrderItemRepository : BaseRepository<OrderItem>
    {
        private DbContext EC_DbContext;

        public OrderItemRepository(DbContext EC_DbContext) : base(EC_DbContext)
        {
            this.EC_DbContext = EC_DbContext;
        }

        #region CRUB

        public List<OrderItem> GetAllProductOrder(int orderId)
        {
            return DbSet.Where(c => c.orderID == orderId).Include(c => c.Product).ToList();
        }

        public bool InsertOrderItem(OrderItem orderItem)
        {
            return Insert(orderItem);
        }
        public void UpdateOrderItem(OrderItem orderItem)
        {
            Update(orderItem);
        }
        public void DeleteOrderItem(int id)
        {
            Delete(id);
        }

        public bool CheckOrderItemExists(OrderItem orderItem)
        {
            return GetAny(l => l.ID == orderItem.ID);
        }
        public OrderItem GetOrderItemById(int id)
        {
            return GetFirstOrDefault(l => l.ID == id);
        }

        #endregion
    }
}