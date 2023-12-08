using TaskMate.Core.Accounts.Enums;

namespace TaskMate.UseCases.Contracts.Accounts;

public record AccountResponse(
    string Username,
    BalanceResponse Balance,
    Role Role);

public record BalanceResponse(double Value);
