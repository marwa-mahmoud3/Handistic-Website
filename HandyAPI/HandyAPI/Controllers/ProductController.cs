using BL.Dto;
using Microsoft.AspNetCore.Mvc;
using System;
using BL.AppServices;
using System.Linq;
using System.Collections.Generic;

namespace HandyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : Controller
    {
        ProductAppService _productAppService;
        WishlistAppService _wishlistAppService;
        CartAppService _cartAppService;
        ReviewAppService _reviewsAppService;
        public ProductController(ProductAppService productAppService ,
            WishlistAppService wishlistAppService , CartAppService cartAppService,
            ReviewAppService reviewsAppService)
        {
            this._productAppService = productAppService;
            this._wishlistAppService = wishlistAppService;
            this._cartAppService = cartAppService;
            this._reviewsAppService = reviewsAppService;
        }

        [HttpGet]
        public IActionResult GetAllProducts()
        {
            return Ok(_productAppService.GetAllProduct());
        }
        [HttpGet("{id}")]
        public IActionResult GetProductById(int id)
        {
            return Ok(_productAppService.GetProduct(id));
        }

        [HttpGet("GetProductsCountByCategoryId/{categoryId}")]
        public int GetProductsByCategoryId(int categoryId)
        {
            var result = _productAppService.GetProductsCountByCategory(categoryId);
            return result;
        }

        [HttpGet("GetProductsByCategory/{categoryId}")]
        public IActionResult GetProductsByCategory(int categoryId)
        {
            var result = _productAppService.GetProductsByCategory(categoryId);
            return Ok(result);
        }

        [HttpPost]
        public IActionResult Create(ProductModel productModel)
        {

            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _productAppService.SaveNewProduct(productModel);
                
                return Created("CreateProduct", productModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }

        [HttpPut("{id}")]
        public IActionResult Edit(int id, ProductModel productModel)
        {

            if (ModelState.IsValid == false)
            {
                return BadRequest(ModelState);
            }
            try
            {
                _productAppService.UpdateProduct(productModel);
                return Ok(productModel);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _productAppService.DeleteProduct(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("GetProductsWithDiscount")]
        public IActionResult GetProductsWithDiscount()
        {
            var result = _productAppService.GetProductsWithDiscount();
            return Ok(result);
        }
        [HttpGet("GetOfferedProductsByCategory/{categoryId}")]
        public int GetOfferedProductsByCategory(int categoryId)
        {
            var result = _productAppService.GetOfferedProductsByCategory(categoryId);
            return result;
        }
        [HttpGet("SearchByKeyWordPagination/{keyWord}/{pageSize}/{pageNumber}")]
        public IActionResult GetProductBySearch(string keyWord, int pageSize, int pageNumber)
        {
            return Ok(_productAppService.GetProductsBySearchPagination(keyWord, pageSize, pageNumber));
        }
        [HttpGet("CountProductsBySearch/{keyWord}")]
        public IActionResult GetCountBySearch(string keyWord)
        {
            return Ok(_productAppService.CountProductsBySearch(keyWord));
        }
        [HttpGet("GetProductsByCategoryByPaging/{categoryId}/{pageSize}/{pageNumber}")]

        public IActionResult GetProductsBy(int categoryId, int pageSize, int pageNumber)
        {
            return Ok(_productAppService.GetProductsByCategoryIdPagination(categoryId, pageSize, pageNumber));
        }
        [HttpGet("GetOfferedByCategoryPagination/{categoryId}/{pageSize}/{pageNumber}")]
        public IActionResult GetProductsWithDiscountByCategoryPagination(int categoryId, int pageSize, int pageNumber)
        {
            return Ok(_productAppService.GetProductsWithDiscountByCategoryPagination(categoryId, pageSize, pageNumber));
        }
        [HttpGet("GetTopSales")]
        public IActionResult GetTopSales()
        {
            var product = _productAppService.GetAllProduct().Where(p => p.SalesCount > 0);
            return Ok(product.OrderByDescending(p => p.SalesCount));
        }
        [HttpGet("GetTopSalesPagination/{pageSize}/{pageNumber}")]
        public IActionResult GetTopSalesPagination(int pageSize, int pageNumber)
        {
            return Ok(_productAppService.GetTopSallingProductPagination(pageSize, pageNumber));
        }
        [HttpGet("GetSellerProductsPagination/{sellerName}/{pageSize}/{pageNumber}")]
        public IActionResult GetSellerProductsPagination(string sellerName, int pageSize, int pageNumber)
        {
            return Ok(_productAppService.GetProductsBySellerNamePagination(sellerName, pageSize, pageNumber));
        }
        [HttpGet("GetAllProductsBySellerName/{sellerName}")]
        public IActionResult GetAllProductsBySellerName(string sellerName)
        {
            return Ok(_productAppService.GetAllProductsBySellerName(sellerName));
        }
        [HttpGet("GetCustomizedProducts/{userId}")]
        public IActionResult GetCustomizedProducts(string userId)
        {
            // cart ,whishlist, bestSelling
            var wishList = _wishlistAppService.UserWishedProducts(userId);
            var cartList = _cartAppService.UserCartProducts(userId);
            var bestSellingList = _productAppService.SellingProductsByUser(userId);
            List<ProductModel> res = new List<ProductModel>();
            var myDictionary = new Dictionary<int, int>();
            int max_sz = Math.Max(wishList.Count(), Math.Max(cartList.Count(), bestSellingList.Count()));
            if (max_sz == 0)
            {
                var mixOfTopSellingAndRating = _reviewsAppService.GitMixTopSellingAndRating();
                if (mixOfTopSellingAndRating.Count() > 3)
                    return Ok(mixOfTopSellingAndRating);
            }
            for (int i = 0; i < max_sz; i++)
            {
                if (i < cartList.Count() && !myDictionary.ContainsKey(cartList.ElementAt(i).Id))
                {
                    res.Add(cartList.ElementAt(i));
                    myDictionary.Add(cartList.ElementAt(i).Id, 1);
                }
                if (i < wishList.Count() && !myDictionary.ContainsKey(wishList.ElementAt(i).Id))
                {
                    res.Add(wishList.ElementAt(i));
                    myDictionary.Add(wishList.ElementAt(i).Id, 1);

                }
                if (i < bestSellingList.Count() && !myDictionary.ContainsKey(bestSellingList.ElementAt(i).Id))
                {
                    res.Add(bestSellingList.ElementAt(i));
                    myDictionary.Add(bestSellingList.ElementAt(i).Id, 1);
                }
            }
            if (res.Count() < 8)
            {

                for (int i = 0; i < cartList.Count() && res.Count() < 8; i++)
                {
                    var result = _productAppService.GetProductsByCategory(cartList.ElementAt(i).CategoryId).ToList();
                    result.ForEach(e =>
                    {
                        if (!myDictionary.ContainsKey(e.Id))
                        {
                            myDictionary.Add(e.Id, 1);
                            res.Add(e);
                        }
                    });
                }
                for (int i = 0; i < wishList.Count() && res.Count() < 8; i++)
                {
                    var result = _productAppService.GetProductsByCategory(wishList.ElementAt(i).CategoryId).ToList();
                    result.ForEach(e =>
                    {
                        if (!myDictionary.ContainsKey(e.Id))
                        {
                            myDictionary.Add(e.Id, 1);
                            res.Add(e);
                        }
                    });
                }
                for (int i = 0; i < bestSellingList.Count() && res.Count() < 8; i++)
                {
                    var result = _productAppService.GetProductsByCategory(bestSellingList.ElementAt(i).CategoryId).ToList();
                    result.ForEach(e =>
                    {
                        if (!myDictionary.ContainsKey(e.Id))
                        {
                            myDictionary.Add(e.Id, 1);
                            res.Add(e);
                        }
                    });
                }
                if (res.Count() < 8)
                {
                    var result = _productAppService.GetAllProduct().ToList();
                    result.ForEach(e =>
                    {
                        if (!myDictionary.ContainsKey(e.Id))
                        {
                            myDictionary.Add(e.Id, 1);
                            res.Add(e);
                        }
                    });
                    res.Take(8);
                }
            }
            return Ok(res);
        }
    }
}
