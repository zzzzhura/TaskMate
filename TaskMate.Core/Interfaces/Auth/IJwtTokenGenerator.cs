using TaskMate.Core.Accounts;

namespace TaskMate.Core.Interfaces.Auth;

public interface IJwtTokenGenerator
{
    string GenerateToken(Account account);
}