namespace TaskMate.UseCases.Contracts.Accounts;

public record UpdateAccountRequest(
    string Username, 
    string Password);
