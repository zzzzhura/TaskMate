namespace TaskMate.UseCases.Contracts.Accounts;

public record AddAccountRequest(
    string Username, 
    string Password,
    string Email,
    string Role);