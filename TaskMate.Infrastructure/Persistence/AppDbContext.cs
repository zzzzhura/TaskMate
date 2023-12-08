using Microsoft.EntityFrameworkCore;
using TaskMate.Core.Accounts;
using TaskMate.Core.Interfaces.Persistence;
using TaskMate.Core.Notes;
using TaskMate.Core.Tags;
using Task = TaskMate.Core.Tasks.Task;

namespace TaskMate.Infrastructure.Persistence;

public sealed class AppDbContext : DbContext, IAppDbContext
{
    public DbSet<Account> Accounts { get; set; } = null!;
    public DbSet<Task> Tasks { get; set; } = null!;
    public DbSet<Note> Notes { get; set; } = null!;
    public DbSet<Tag> Tags { get; set; } = null!;

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }
}