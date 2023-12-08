namespace TaskMate.UseCases.Contracts.Accounts;

public record SignInAccountRequest(
    string Username, 
    string Password);
