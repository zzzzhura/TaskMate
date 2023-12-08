using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using TaskMate.Core.Accounts;
using TaskMate.Core.Interfaces.Auth;
using TaskMate.Core.Interfaces.Persistence;

namespace TaskMate.Infrastructure.Auth.Utils;

public class CurrentUserContext : IUserContext
{
    private readonly IHttpContextAccessor _contextAccessor;
    private readonly IAppDbContext _dbContext;
    
    public CurrentUserContext(IHttpContextAccessor contextAccessor, IAppDbContext dbContext)
    {
        _contextAccessor = contextAccessor;
        _dbContext = dbContext;
    }

    public bool TryGetUserId(out long result)
    {
        var stringId = _contextAccessor.HttpContext?.User
            .FindFirst(ClaimTypes.NameIdentifier)?.Value;

        return long.TryParse(stringId, out result);
    }

    public async Task<Account?> GetUserAsync()
    {
        if (!TryGetUserId(out var userId))
            return null;
        return await _dbContext.Accounts.FirstOrDefaultAsync(a => a.Id == userId);
    }
}