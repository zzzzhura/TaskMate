using Microsoft.EntityFrameworkCore;
using TaskMate.Core.Accounts;
using TaskMate.Core.Notes;
using TaskMate.Core.Tags;
using Task = TaskMate.Core.Tasks.Task;

namespace TaskMate.Core.Interfaces.Persistence;

public interface IAppDbContext
{
    DbSet<Account> Accounts { get; set; }
    DbSet<Task> Tasks { get; set; }
    DbSet<Note> Notes { get; set; }
    DbSet<Tag> Tags { get; set; }
    
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}