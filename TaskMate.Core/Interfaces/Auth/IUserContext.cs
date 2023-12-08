using TaskMate.Core.Accounts;

namespace TaskMate.Core.Interfaces.Auth;

public interface IUserContext
{
    bool TryGetUserId(out long result);
    Task<Account?> GetUserAsync();
}