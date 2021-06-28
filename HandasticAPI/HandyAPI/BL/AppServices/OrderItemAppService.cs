using AutoMapper;
using BL.Bases;
using BL.Dto;
using BL.Interfaces;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.AppServices
{
    public class OrderItemAppService : AppServiceBase
    {
        public OrderItemAppService(IUnitOfWork theUnitOfWork, IMapper mapper) : base(theUnitOfWork, mapper)
        {

        }
        #region CURD

        public List<OrderItemModel> GetAllOrderItems(int orderId)
        {
            return Mapper.Map<List<OrderItemModel>>(TheUnitOfWork.OrderItem.GetAllProductOrder(orderId));
        }
        public OrderItemModel GetOrderItem(int OrderId, int productId)
        {
            return Mapper.Map<OrderItemModel>(TheUnitOfWork.OrderItem.GetFirstOrDefault(c => c.orderID == OrderId && c.ProductID == productId));
        }

        public bool SaveNewOrderItem(OrderItem orderItem)
        {
            if (orderItem == null)
                throw new ArgumentNullException();
            bool result = false;
            if (TheUnitOfWork.OrderItem.Insert(orderItem))
            {
                result = TheUnitOfWork.Commit() > new int();
            }
            return result;
        }
        public bool DeleteOrderItem(int id)
        {
            if (id <= 0)
                throw new InvalidOperationException();
            bool result = false;

            TheUnitOfWork.OrderItem.Delete(id);
            result = TheUnitOfWork.Commit() > new int();

            return result;
        }

        public int GetOrderItemID(int OrderID, int productID)
        {
            return TheUnitOfWork.OrderItem
                .GetFirstOrDefault(c => c.orderID == OrderID && c.ProductID == productID).ID;
        }
       

        #endregion
    }
}
