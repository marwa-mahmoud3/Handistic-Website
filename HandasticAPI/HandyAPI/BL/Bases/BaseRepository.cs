using BL.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;

using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BL.Bases
{
    public class BaseRepository<T> : IRepository<T> where T : class
    {

        #region Properties
        protected DbContext DbContext { get; set; }

        protected DbSet<T> DbSet { get; set; }
        #endregion

        #region Constructor
        public BaseRepository(DbContext dbContext)
        {
            if (dbContext == null)
                throw new ArgumentNullException("dbContext");

            DbContext = dbContext;
            DbSet = DbContext.Set<T>();
        }
        #endregion

        #region Get All Data Methods
        public virtual IQueryable<T> GetAll()
        {
            var dd = DbSet;
            return dd;
        }


        public IQueryable<T> GetAllSorted<TKey>(Expression<Func<T, TKey>> sortingExpression)
        {
            return DbSet.OrderBy<T, TKey>(sortingExpression);
        }

        public IQueryable<T> GetWhere(System.Linq.Expressions.Expression<Func<T, bool>> filter = null, string includeProperties = "")
        {
            IQueryable<T> query = DbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }
            query = includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries)
                .Aggregate(query, (current, includeProperty) => current.Include(includeProperty));

            return query;
        }

        public bool GetAny(System.Linq.Expressions.Expression<Func<T, bool>> filter = null)
        {
            IQueryable<T> query = DbSet;
            bool result = false;
            if (filter != null)
            {
                result = query.Any(filter);
            }
            return result;
        }

        public T GetFirstOrDefault(System.Linq.Expressions.Expression<Func<T, bool>> filter = null)
        {
            if (filter != null)
            {
                return DbSet.FirstOrDefault(filter);
            }
            return null;
        }


        #endregion

        #region Get one record
        public virtual T GetById(int id)
        {
            return DbSet.Find(id);
        }

        public virtual T GetById(long id)
        {
            return DbSet.Find(id);
        }

        #endregion

        #region CRUD Methods
        public virtual bool Insert(T entity)
        {
            bool returnVal = false;
            EntityEntry<T> dbEntityEntry = DbContext.Entry(entity);
            if (dbEntityEntry.State != EntityState.Detached)
            {
                dbEntityEntry.State = EntityState.Added;
            }
            else
            {
                DbSet.Add(entity);
            }
            returnVal = true;
            return returnVal;
        }

        public virtual void InsertList(List<T> entityList)
        {
            DbSet.AddRange(entityList);
        }

        public virtual void Update(T entity)
        {
            EntityEntry<T> dbEntityEntry = DbContext.Entry(entity);
         
            //if (dbEntityEntry.State == EntityState.Detached)
            //{
            //    DbSet.Attach(entity);
            //}
            dbEntityEntry.State = EntityState.Modified;
        }

        public virtual void UpdateList(List<T> entityList)
        {
            foreach (T item in entityList)
            {
                Update(item);
            }
        }
        public virtual void Delete(int id)
        {
            var entity = GetById(id);
            if (entity == null) return; // not found; assume already deleted.
            Delete(entity);
        }
        public virtual void Delete(T entity)
        {
            EntityEntry<T> dbEntityEntry = DbContext.Entry(entity);
            if (dbEntityEntry.State != EntityState.Deleted)
            {
                dbEntityEntry.State = EntityState.Deleted;
            }
            else
            {
                DbSet.Attach(entity);
                DbSet.Remove(entity);
            }
        }
        public virtual void DeleteList(List<T> entityList)
        {
            foreach (T item in entityList)
            {
                Delete(item);
            }
        }

        #endregion

        #region pagination
        public virtual int CountEntity()
        {
            return DbSet.Count();
        }
        public virtual IEnumerable<T> GetPageRecords(int pageSize, int pageNumber)
        {
            pageSize = (pageSize <= 0) ? 10 : pageSize;
            pageNumber = (pageNumber < 1) ? 0 : pageNumber - 1;

            return DbSet.Skip(pageNumber * pageSize).Take(pageSize).ToList();
        }
        #endregion
    }
}
