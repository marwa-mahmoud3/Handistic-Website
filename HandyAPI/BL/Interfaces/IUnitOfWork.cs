
using BL.Repositories;
using System;


namespace BL.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        #region Methode
        int Commit();
        #endregion
        CartItemRepository CartItem { get; }
        CartRepository Cart { get; }
        ProductRepository Product { get; }
        ShopsRepository Shop { get; }
        SellersRepository Seller { get; }
        UserRequestsRepository Request { get; }

        CityShopRepository CityShop { get; }

        WishListRepository WishList { get; }
        ProductWishlistRepository ProductWishlist { get; }
        OrderItemRepository OrderItem { get; }
        OrderRepository Order { get; }
        BillingDetailsRepository BillingDetails { get; }
        NotificationRepository Notification { get; }
        ReviewRepository Review { get; }
        ClientNotifyRepository ClientNotify { get; }
        SellerReviewRepository SellerReview { get; }
        BlackListRepository BlackList { get; }
    }
}
