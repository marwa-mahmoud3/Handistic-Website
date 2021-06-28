using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Models;
using BL.Dto;

namespace BL.Configuration
{
    public class MapperConfig : Profile
    {
        public MapperConfig()
        {
            this.CreateMap<Category, CategoryModel>().ReverseMap();
            this.CreateMap<Product, ProductModel>().ReverseMap();
            this.CreateMap<City, CityModel>().ReverseMap();           
            this.CreateMap<Shops, ShopModel>().ReverseMap();
            this.CreateMap<Sellers, SellersModel>().ReverseMap();
            this.CreateMap<UserRquestTobeSeller, UserRequestsModel>().ReverseMap();
            this.CreateMap<CityShop, CityShopModel>().ReverseMap();
            this.CreateMap<Wishlist, WishlistModel>().ReverseMap();
            this.CreateMap<ProductWishlist, ProductWishlistModel>().ReverseMap();
            this.CreateMap<CartItem, CartItemModel>().ReverseMap();
            this.CreateMap<Cart, CartModel>().ReverseMap();
            this.CreateMap<OrderItem, OrderItemModel>().ReverseMap();
            this.CreateMap<Order, Order>().ReverseMap();
            this.CreateMap<BillingDetails, BillingDetailsModel>().ReverseMap();
            this.CreateMap<Review, ReviewModel>().ReverseMap();
            this.CreateMap<Notification, NotificationModel>().ReverseMap();
            this.CreateMap<ClientNotify, ClientNotifyModel>().ReverseMap();
            this.CreateMap<SellerReview, SellerReviewModel>().ReverseMap();
            this.CreateMap<BlackList, BlackListModel>().ReverseMap();
        }
    }
}
