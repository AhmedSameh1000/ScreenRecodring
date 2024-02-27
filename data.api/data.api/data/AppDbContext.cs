using data.api.models;
using Microsoft.EntityFrameworkCore;

namespace data.api.data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<video> Videos { get; set; }
    }
}

