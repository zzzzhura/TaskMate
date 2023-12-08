using TaskMate.Core.Accounts;
using TaskMate.Core.Accounts.Enums;
using TaskMate.Core.Interfaces.Auth;

namespace TaskMate.Infrastructure.Persistence;

public class SeedData
{
    private const string AdminPassword = "secret";
    private const string ClientPassword = "123456";
    
    public static async Task SeedAsync(AppDbContext context, IPasswordHasher passwordHasher)
    {
        if (context.Accounts.Any()) return;

        var (adminHash, adminSalt) = passwordHasher.HashPassword(AdminPassword);
        var (clientHash, clientSalt) = passwordHasher.HashPassword(ClientPassword);

        var accounts = new List<Account>
        {
            Account.Create("Anna Zhuravleva", nameof(Role.Admin), adminHash, adminSalt),
            Account.Create("Somebody client", nameof(Role.Client), clientHash, clientSalt)
        };
        
        await context.Accounts.AddRangeAsync(accounts);
        await context.SaveChangesAsync();
    } 
}