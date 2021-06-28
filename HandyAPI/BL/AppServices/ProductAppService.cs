using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using BL.Bases;
using BL.Interfaces;
using BL.Dto;
using DAL.Models;

namespace BL.AppServices
{
    public class ProductAppService : AppServiceBase
    {
        public ProductAppService(IUnitOfWork theUnitOfWork, IMapper mapper) : base(theUnitOfWork, mapper)
        {
        }
        public IEnumerable<ProductModel> GetAllProduct()
        {
            IEnumerable<Product> allProducts = TheUnitOfWork.Product.GetAllProduct();
            return Mapper.Map<IEnumerable<ProductModel>>(allProducts);
        }
       
        public List<ProductModel> GetAllProductWhere(int categoryID)
        {
            var res = TheUnitOfWork.Product.GetWhere(p => p.CategoryId == categoryID);

            return Mapper.Map<List<ProductModel>>(res);
        }

        public IEnumerable<ProductModel> GetRelatedProducts(int categoryId, int numberOfProducts)
        {
            IEnumerable<Product> relatedProducts = TheUnitOfWork.Product
                .GetRelatedProducts(categoryId, numberOfProducts);
            return Mapper.Map<IEnumerable<ProductModel>>(relatedProducts);

        }

       
        public IEnumerable<ProductModel> GetProductsByCategory(int id)
        {
            IEnumerable<Product> products = TheUnitOfWork.Product.GetProductsByCategory(id);
            return Mapper.Map<IEnumerable<ProductModel>>(products);

        }

        public ProductModel GetProduct(int id)
        {
            return Mapper.Map<ProductModel>(TheUnitOfWork.Product.GetProductById(id));
        }

        public bool SaveNewProduct(ProductModel productViewModel)
        {
            if (productViewModel == null)
                throw new ArgumentNullException();
            bool result = false;
            var product = Mapper.Map<Product>(productViewModel);
            if (TheUnitOfWork.Product.Insert(product))
            {
                result = TheUnitOfWork.Commit() > new int();
            }
            return result;
        }


        public bool UpdateProduct(ProductModel productModel)
        {
            var productFromDB = TheUnitOfWork.Product.GetById(productModel.Id);
            Mapper.Map(productModel, productFromDB);
            TheUnitOfWork.Product.Update(productFromDB);
            TheUnitOfWork.Commit();
            return true;
        }
        public bool DecreaseQuantity(int prodID, int decresedQuantity)
        {
            var product = TheUnitOfWork.Product.GetById(prodID);
            product.Quantity -= decresedQuantity;
            TheUnitOfWork.Product.Update(product);
            TheUnitOfWork.Commit();
            return true;
        }
        public bool DeleteProduct(int id)
        {
            bool result = false;

            TheUnitOfWork.Product.Delete(id);
            result = TheUnitOfWork.Commit() > new int();

            return result;
        }
        public bool CheckProductExists(ProductModel productViewModel)
        {
            Product product = Mapper.Map<Product>(productViewModel);
            return TheUnitOfWork.Product.CheckProductExists(product);
        }
        public IEnumerable<ProductModel> GetProductsWithDiscount()
        {
            var res = TheUnitOfWork.Product.GetWhere(p => p.Discount > 0);
            return Mapper.Map<List<ProductModel>>(res);
        }
        public int GetProductsCountByCategory(int id)
        {
            IEnumerable<Product> products = TheUnitOfWork.Product.GetProductsByCategory(id);
            return products.ToList().Count();

        }
        public int GetOfferedProductsByCategory(int id)
        {
            IEnumerable<Product> products = TheUnitOfWork.Product.GetProductsByCategory(id).Where(p => p.Discount > 0);
            return products.ToList().Count();

        }
        public IEnumerable<ProductModel> GetProductsBySearch(string productToSearch)
        {
            var searchRes = TheUnitOfWork.Product.GetWhere(p => p.ProductName.Contains(productToSearch));
    
            return Mapper.Map<List<ProductModel>>(searchRes);
        }
        public IEnumerable<ProductModel> GetProductsByCategoryIdPagination(int catId, int pageSize, int pageNumber)
        {
            pageSize = (pageSize <= 0) ? 10 : pageSize;
            pageNumber = (pageNumber < 1) ? 0 : pageNumber - 1;
            var products = TheUnitOfWork.Product.GetWhere(p => p.CategoryId == catId)
                .Skip(pageNumber * pageSize).Take(pageSize)
                .Include(p => p.Category)
                .ToList(); ;

            return Mapper.Map<List<ProductModel>>(products);
        }
        public IEnumerable<ProductModel> GetPageRecords(int pageSize, int pageNumber)
        {
            var products = Mapper.Map<List<ProductModel>>(TheUnitOfWork.Product.GetPageRecords(pageSize, pageNumber));
            return products;
        }
        public IEnumerable<ProductModel> GetProductsWithDiscountByCategoryPagination(int catId, int pageSize, int pageNumber)
        {
            pageSize = (pageSize <= 0) ? 10 : pageSize;
            pageNumber = (pageNumber < 1) ? 0 : pageNumber - 1;
            var products = TheUnitOfWork.Product.GetWhere(p => p.CategoryId == catId && p.Discount > 0)
                .Skip(pageNumber * pageSize).Take(pageSize)
                .Include(p => p.Category)
                .ToList();
            return Mapper.Map<List<ProductModel>>(products);
        }
        public IEnumerable<ProductModel> GetProductsBySearchPagination(string keyWord, int pageSize, int pageNumber)
        {
            pageSize = (pageSize <= 0) ? 10 : pageSize;
            pageNumber = (pageNumber < 1) ? 0 : pageNumber - 1;
            var products = TheUnitOfWork.Product.GetWhere(p => p.ProductName.Contains(keyWord))
                .Skip(pageNumber * pageSize).Take(pageSize)
                .Include(p => p.Category)
                .ToList();
            return Mapper.Map<List<ProductModel>>(products);
        }
        public int CountProductsBySearch(string productToSearch)
        {
            var searchRes = TheUnitOfWork.Product.GetWhere(p => p.ProductName.Contains(productToSearch));

            return searchRes.Count();
        }
        public IEnumerable<ProductModel> GetTopSallingProductPagination(int pageSize, int pageNumber)
        {
            pageSize = (pageSize <= 0) ? 10 : pageSize;
            pageNumber = (pageNumber < 1) ? 0 : pageNumber - 1;
            var products = TheUnitOfWork.Product.GetWhere(p => p.SalesCount > 0)
                .Skip(pageNumber * pageSize).Take(pageSize)
                .ToList();
            return Mapper.Map<List<ProductModel>>(products);
        }
        public IEnumerable<ProductModel> GetAllProductsBySellerName(string sellerName)
        {
            var products = TheUnitOfWork.Product.GetWhere(p => p.UserName == sellerName)
                .ToList();
            return Mapper.Map<List<ProductModel>>(products);
        }
        public IEnumerable<ProductModel> GetProductsBySellerNamePagination(string sellerName, int pageSize, int pageNumber)
        {
            pageSize = (pageSize <= 0) ? 10 : pageSize;
            pageNumber = (pageNumber < 1) ? 0 : pageNumber - 1;
            var products = TheUnitOfWork.Product.GetWhere(p => p.UserName == sellerName)
                .Skip(pageNumber * pageSize).Take(pageSize)
                .ToList();
            return Mapper.Map<List<ProductModel>>(products);
        }
        public IEnumerable<ProductModel> SellingProductsByUser(string userId)
        {
            var myDictionary = new Dictionary<int, int>();
            var orders = TheUnitOfWork.Order.GetWhere(o => o.userId == userId);
            foreach (var order in orders)
            {
                var orderItems = TheUnitOfWork.OrderItem.GetWhere(o => o.orderID == order.Id);
                foreach (var i in orderItems)
                {
                    if (myDictionary.ContainsKey(i.ProductID))
                    {
                        myDictionary[i.ProductID] = myDictionary[i.ProductID] + i.Quantity;
                    }
                    else myDictionary.Add(i.ProductID, i.Quantity);
                }
            }
            List<ProductModel> UserBestSeellingByDescendingOrder = new List<ProductModel>();
            var list = new List<KeyValuePair<int, int>>();

            foreach (KeyValuePair<int, int> e in myDictionary)
            {
                list.Add(new KeyValuePair<int, int>(e.Key, e.Value));
            }
            list.OrderByDescending(e => e.Value);
            list.ForEach(e =>
            {
                UserBestSeellingByDescendingOrder.Add
                (Mapper.Map<ProductModel>(TheUnitOfWork.Product.GetById(e.Key)));
            });
            return UserBestSeellingByDescendingOrder;
        }
    }
}
