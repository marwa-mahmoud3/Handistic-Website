using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DAL.Models
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : 
            base(options)
        {
        }
      
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
           optionsBuilder.UseSqlServer("Data Source=.;Initial Catalog=Handy;Integrated Security=True;MultipleActiveResultSets=true");
        }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<City> City { get; set; }
        public virtual DbSet<Sellers> Sellers { get; set; }
        public virtual DbSet<Shops> Shops { get; set; }
        public virtual DbSet<CityShop> CityShop { get; set; }
        public virtual DbSet<UserRquestTobeSeller> UserRquestTobeSeller { get; set; }
        public virtual DbSet<Wishlist> Wishlists { get; set; }
        public virtual DbSet<ProductWishlist> ProductWishLists { get; set; }
        public virtual DbSet<Cart> carts { get; set; }
        public virtual DbSet<CartItem> cartItems { get; set; }
        public virtual DbSet<Order> orders { get; set; }
        public virtual DbSet<OrderItem> OrderItems { get; set; }
        public virtual DbSet<BillingDetails>  BillingDetails { get; set; }
        public virtual DbSet<Review> Reviews { get; set; }
        public virtual DbSet<Notification> Notifications { get; set; }
        public virtual DbSet<ClientNotify> ClientNotify { get; set; }
        public virtual DbSet<SellerReview> SellerReview { get; set; }
        public virtual DbSet<Chat> Chats { get; set; }
        public virtual DbSet<ChatMessages> ChatMessages { get; set; }
        public virtual DbSet<BlackList> BlackList { get; set; }
    }
}