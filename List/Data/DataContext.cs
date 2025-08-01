using Microsoft.EntityFrameworkCore;
using List.Models;

namespace List.Data
{
    public class DataContext : DbContext
    {
        public DbSet<PersonModel> People { get; set; }
        public DbSet<TitleModel> Title { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=database.sqlite");
            base.OnConfiguring(optionsBuilder);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<TitleModel>().HasData(
                new TitleModel { Id = 1, Title = "Minha Lista" }
            );
        }
    }
}
