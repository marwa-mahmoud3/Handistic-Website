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
    public class OrderAppService : AppServiceBase
    {
        public OrderAppService(IUnitOfWork theUnitOfWork, IMapper mapper) : base(theUnitOfWork, mapper)
        {

        }
        #region CURD

        public List<OrderModel> GetAllOrders()
        {

            return Mapper.Map<List<OrderModel>>(TheUnitOfWork.Order.GetAllOrder());
        }
        public OrderModel GetOrder(int id)
        {
            if (id < 0)
                throw new ArgumentNullException();
            return Mapper.Map<OrderModel>(TheUnitOfWork.Order.GetById(id));
        }

        public bool CreateUserOrder(string userId,double TotalPrice)
        {
            bool result = false;
            Order order = new Order() { userId = userId,TotalPrice = TotalPrice };
            if (TheUnitOfWork.Order.Insert(order))
            {
                result = TheUnitOfWork.Commit() > new int();
            }
            return result;
        }

        public int GetOrderIdByUser(string userId)
        {
            List<Order> orders = new List<Order>();
            orders = Mapper.Map<List<Order>>(TheUnitOfWork.Order.GetAllOrder().Where(c => c.userId == userId));
            var result = orders.OrderByDescending(i => i.Id).FirstOrDefault();
            return result.Id;
        }


        public bool Delete(int id)
        {
            if (id < 0)
                throw new ArgumentNullException();

            bool result = false;

            TheUnitOfWork.Order.Delete(id);
            result = TheUnitOfWork.Commit() > new int();

            return result;
        }
         public int GetLastOrderId()
        {
            var result = TheUnitOfWork.Order.GetAll().OrderByDescending(i => i.Id).FirstOrDefault();
            return result.Id;
        }
        #endregion
    }
}
