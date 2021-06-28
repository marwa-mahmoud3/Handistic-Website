using BL.Interfaces;
using DAL.Models;
using BL.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Bases
{
    public class UnitOfWork : IUnitOfWork
    {
        #region Common Properties
        private DbContext DbContext { get; set; }
        private UserManager<AppUser> _userManager;
        private RoleManager<IdentityRole> _roleManager;
  

        #endregion

        #region Constructors
        public UnitOfWork(ApplicationDbContext DbContext, UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            this._userManager = userManager;
            this._roleManager = roleManager;
            this.DbContext = DbContext;//
      

            // Avoid load navigation properties
            //DbContext.Configuration.LazyLoadingEnabled = false;
        }
        #endregion
        public CartRepository cart;//=> throw new NotImplementedException();
        public CartRepository Cart
        {
            get
            {
                if (cart == null)
                    cart = new CartRepository(DbContext);
                return cart;
            }
        }
        #region Methods
        public int Commit()
        {
            return DbContext.SaveChanges();
        }

        public void Dispose()
        {
            DbContext.Dispose();
        }
        #endregion
        public CartItemRepository cartItem;
        public CartItemRepository CartItem
        {
            get
            {
                if (cartItem == null)
                    cartItem = new CartItemRepository(DbContext);
                return cartItem;
            }
        }

        public ProductRepository product;//=> throw new NotImplementedException();
        public ProductRepository Product
        {
            get
            {
                if (product == null)
                    product = new ProductRepository(DbContext);
                return product;
            }
        }
        

       
        public ShopsRepository shop;
        public ShopsRepository Shop
        {
            get
            {
                if (shop == null)
                    shop = new ShopsRepository(DbContext);
                return shop;
            }
        }

        public SellersRepository seller;
        public SellersRepository Seller
        {
            get
            {
                if (seller == null)
                    seller = new SellersRepository(DbContext);
                return seller;
            }
        }
        public UserRequestsRepository request;
        public UserRequestsRepository Request
        {
            get
            {
                if (request == null)
                    request = new UserRequestsRepository(DbContext);
                return request;
            }
        }

        public CityShopRepository cityShop;//=> throw new NotImplementedException();
        public CityShopRepository CityShop
        {
            get
            {
                if (cityShop == null)
                    cityShop = new CityShopRepository(DbContext);
                return cityShop;
            }
        }
        public WishListRepository wishList;
        public WishListRepository WishList
        {
            get
            {
                if (wishList == null)
                    wishList = new WishListRepository(DbContext);
                return wishList;
            }
        }

        public ProductWishlistRepository productWishlist;
        public ProductWishlistRepository ProductWishlist
        {
            get
            {
                if (productWishlist == null)
                    productWishlist = new ProductWishlistRepository(DbContext);
                return productWishlist;
            }
        }
        public BillingDetailsRepository billingDetails;
        public BillingDetailsRepository BillingDetails 
        {
            get
            {
                if (billingDetails == null)
                    billingDetails = new BillingDetailsRepository(DbContext);
                return billingDetails;
            }
        }
        public OrderRepository order;
        public OrderRepository Order
        {
            get
            {
                if (order == null)
                    order = new OrderRepository(DbContext);
                return order;
            }
        }
        public OrderItemRepository orderItem;
        public OrderItemRepository OrderItem
        {
            get
            {
                if (orderItem == null)
                    orderItem = new OrderItemRepository(DbContext);
                return orderItem;
            }
        }
        public ReviewRepository review;
        public ReviewRepository Review
        {
            get
            {
                if (review == null)
                    review = new ReviewRepository(DbContext);
                return review;
            }
        }
        public NotificationRepository notification;
        public NotificationRepository Notification
        {
            get
            {
                if (notification == null)
                    notification = new NotificationRepository(DbContext);
                return notification;
            }
        }
        public ClientNotifyRepository clientNotify;
        public ClientNotifyRepository ClientNotify
        {
            get
            {
                if (clientNotify == null)
                    clientNotify = new ClientNotifyRepository(DbContext);
                return clientNotify;
            }
        }
        public SellerReviewRepository sellerReview;
        public SellerReviewRepository SellerReview
        {
            get
            {
                if (sellerReview == null)
                    sellerReview = new SellerReviewRepository(DbContext);
                return sellerReview;
            }
        }
        public BlackListRepository blackList;
        public BlackListRepository BlackList
        {
            get
            {
                if (blackList == null)
                    blackList = new BlackListRepository(DbContext);
                return blackList;
            }
        }
    }
}
