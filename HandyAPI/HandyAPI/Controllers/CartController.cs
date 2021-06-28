using BL.AppServices;
using BL.Dto;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;


namespace HandyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        CartAppService _cartAppService;
        CartItemAppService _cartItemAppService;
        IHttpContextAccessor _httpContextAccessor;
        ApplicationDbContext _context;
        ProductAppService _productAppService;
        public CartController(CartItemAppService cartItemAppService,
                               IHttpContextAccessor httpContextAccessor,
                               CartAppService cartAppService,
                               ApplicationDbContext context,
                               ProductAppService productAppService)

        {
            this._cartItemAppService = cartItemAppService;
            this._httpContextAccessor = httpContextAccessor;
            this._cartAppService = cartAppService;
            this._context = context;
            this._productAppService = productAppService;

        }


        [HttpGet("{userId}")]
        public IActionResult GetAllCartItems(string userId)
        {
            int cartID = _cartAppService.GetCartIdByUser(userId);
            return Ok(_cartItemAppService.GetAllCartItem(cartID));
        }

        [HttpPost("AddItemToCart/{userID}/{productID}")]
        public IActionResult CreateItemToCart(int productID, string userID)
        {
            int cartID = _cartAppService.GetCartIdByUser(userID);
            ProductModel product = _productAppService.GetProduct(productID);
            CartItem cartItem = new CartItem();
            double netprice = _cartItemAppService.PriceAfterDiscount(product.UnitPrice, product.Discount);
            cartItem.cartId = cartID;
            cartItem.ProductId = productID;
            cartItem.Quantity = 1;
            cartItem.UnitPrice = netprice;
            cartItem.TotalPrice = netprice;
            var isExistingProductCartViewModel = _cartItemAppService.CheckIfItemExistsInCart(cartID, productID);
            if (isExistingProductCartViewModel == false)
            {
                _cartItemAppService.SaveNewCartItem(cartItem);
                return Ok();
            }
            return BadRequest("This Item already exist in your cart !");
        }

        [HttpDelete("DeleteProduct/{userID}/{productID}")]
        public ActionResult DeleteProductFromCart(string userID, int productID)
        {
            int cartID = _cartAppService.GetCartIdByUser(userID);

            var isExistingProductCartViewModel = _cartItemAppService.CheckIfItemExistsInCart(cartID, productID);
            if (isExistingProductCartViewModel == true)
            {
                _cartItemAppService.DeleteCartItem(_cartItemAppService.GetCartItemID(cartID, productID));
                return Ok();
            }
            return BadRequest("This Item doesn't exist in cart");
        }

        [HttpPut("IncreaseCartItem/{userID}/{productID}")]
        public ActionResult IncreaseCartItem(int productID, string userID)
        {
            int cartID = _cartAppService.GetCartIdByUser(userID);
            int cartItemId = _cartItemAppService.GetCartItem(cartID, productID).Id;
            _cartItemAppService.IncreaseQuantity(cartItemId);
            return Ok();
        }

        [HttpPut("DecreaseCartItem/{userID}/{productID}")]
        public ActionResult DecreaseCartItem(int productID, string userID)
        {
            int cartID = _cartAppService.GetCartIdByUser(userID);
            int cartItemId = _cartItemAppService.GetCartItem(cartID, productID).Id;
            _cartItemAppService.DecreaseQuantity(cartItemId);
            return Ok();
        }

        [HttpGet("GetCartItem/{userId}/{productId}")]
        public ActionResult GetCartItem(string userId, int productId)
        {
            int cartID = _cartAppService.GetCartIdByUser(userId);
            CartItemModel cartItem = _cartItemAppService.GetCartItem(cartID, productId);
            return Ok(cartItem);
        }

        [HttpDelete("ClearCartItems/{userId}")]
        public IActionResult ClearCartItems(string userId)
        {
            int cartID = _cartAppService.GetCartIdByUser(userId);
            List<CartItemModel> cartItems = _cartItemAppService.GetAllCartItem(cartID);
            foreach (var item in cartItems)
            {
                _cartItemAppService.DeleteCartItem(item.Id);
            }
            return Ok();
        }
    }
}