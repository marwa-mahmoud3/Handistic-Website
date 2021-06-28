
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
    public class ProductRepository: BaseRepository<Product>
    {

        private DbContext EC_DbContext;

        public ProductRepository(DbContext EC_DbContext) : base(EC_DbContext)
        {
            this.EC_DbContext = EC_DbContext;
        }
        #region CRUB

        public IEnumerable<Product> GetAllProduct()
        {
            return GetAll()
                .Include(p => p.Category)
                .ToList();
        }

        public bool InsertProduct(Product product)
        {
            return Insert(product);
        }
        public void UpdateProduct(Product product)
        {
            Update(product);
        }
        public void DeleteProduct(int id)
        {
            Delete(id);
        }

        public bool CheckProductExists(Product product)
        {
            return GetAny(l => l.Id== product.Id);
        }
        public Product GetProductById(int id)
        {
            var product = DbSet
                .Include(p => p.Category)
                .FirstOrDefault(p => p.Id == id);
            return product;
        }

        public IEnumerable<Product> GetProductsByCategory(int categoryId)
        {
            var query = DbSet
                .Include(p => p.Category)
                .Where(p => p.CategoryId == categoryId);
            return query;
        }

        internal IEnumerable<Product> GetRelatedProducts(int categoryId, int numberOfProducts)
        {
            var query = DbSet
                    .Include(p => p.Category)
                    .Where(p => p.CategoryId == categoryId)
                    .OrderBy(p => Guid.NewGuid())
                    .Take(numberOfProducts);
            var x = query.ToQueryString();
            return query;
        }
        #endregion

       
        
    }
}
