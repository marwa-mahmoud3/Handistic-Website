using BL.AppServices;
using BL.Dto;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HandyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        OrderAppService _orderAppService;
        CartItemAppService _cartItemAppService;
        OrderItemAppService _orderItemAppService;
        ProductAppService _productAppService;
        public OrdersController(OrderItemAppService orderItemAppService,
                               OrderAppService orderAppService,
                               ApplicationDbContext context,
                               ProductAppService productAppService,
                               CartItemAppService cartItemAppService)

        {
            this._orderItemAppService = orderItemAppService;
            this._orderAppService = orderAppService;
            this._productAppService = productAppService;
            this._cartItemAppService = cartItemAppService;
        }

        [HttpPost("CreateOrder/{userID}/{TotalPrice}")]
        public IActionResult CreateOrder(string userID,double TotalPrice)
        {
            _orderAppService.CreateUserOrder(userID, TotalPrice);
            return Ok();
        }
        [HttpPost("AddItemInOrder/{productID}/{CartID}")]
        public IActionResult AddItemInOrder(int productID, int CartID)
        {
            var OrderId = _orderAppService.GetLastOrderId();
            ProductModel product = _productAppService.GetProduct(productID);
            OrderItem orderItem = new OrderItem();
            var catItem = _cartItemAppService.GetCartItem(CartID, productID);
            orderItem.orderID = OrderId;
            orderItem.ProductID = productID;
            orderItem.Quantity = catItem.Quantity;
            product.SalesCount += catItem.Quantity;
            _productAppService.UpdateProduct(product);
            orderItem.unitPrice = product.UnitPrice;
            orderItem.TotalPrice = catItem.Quantity * product.UnitPrice;
            _orderItemAppService.SaveNewOrderItem(orderItem);
            _cartItemAppService.DeleteCartItem(catItem.Id);
            return Ok(orderItem);
        }

        [HttpGet("GetOrderItems/{orderId}/{sellername}")]
        public ActionResult GetOrderItems(int orderId,string sellername)
        {
            var orderItems = _orderItemAppService.GetAllOrderItems(orderId);
            List<ProductModel> products = new List<ProductModel>();
            foreach (var item in orderItems)
            {

                products.Add(_productAppService.GetProduct(item.ProductID));
            }
            
            return Ok(products.Where(r =>r.UserName == sellername));
        }

        [HttpGet("GetAllOrderItems/{orderId}")]
        public ActionResult GetAllOrderItems(int orderId)
        {
            return Ok(_orderItemAppService.GetAllOrderItems(orderId));
        }
        [HttpGet("GetAllOrders/{orderId}")]
        public ActionResult GetAllOrders(int orderId)
        {
            return Ok(_orderAppService.GetAllOrders());
        }

    }
}
