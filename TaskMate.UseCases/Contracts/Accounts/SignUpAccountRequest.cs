namespace TaskMate.UseCases.Contracts.Accounts;

public record SignUpAccountRequest(
    string Username, 
    string Password);