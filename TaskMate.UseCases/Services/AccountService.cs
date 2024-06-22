using Microsoft.EntityFrameworkCore;
using TaskMate.Core.Accounts;
using TaskMate.Core.Accounts.Enums;
using TaskMate.Core.Interfaces.Auth;
using TaskMate.Core.Interfaces.Persistence;
using TaskMate.UseCases.Contracts.Accounts;
using TaskMate.UseCases.Services.Common;

namespace TaskMate.UseCases.Services;

public class AccountService
{
    private readonly IAppDbContext _dbContext;
    private readonly IUserContext _userContext;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public AccountService(IAppDbContext dbContext, IUserContext userContext, 
        IPasswordHasher passwordHasher, IJwtTokenGenerator jwtTokenGenerator)
    {
        _dbContext = dbContext;
        _userContext = userContext;
        _passwordHasher = passwordHasher;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<Account> GetCurrentAccountAsync()
    {
        var account = await _userContext.GetUserAsync()
            ?? throw new Exception("Not found current account");
        return account;
    }
    
    public async Task AddAccountAsync(AddAccountRequest request)
    {
        if(await _dbContext.Accounts.FirstOrDefaultAsync(a => a.Username == request.Username) is not null)
            throw new Exception("Account exists");

        var (hash, salt) = _passwordHasher.HashPassword(request.Password);
        var createdAccount = Account.Create(request.Username, request.Role, hash, salt, request.Email);
        await _dbContext.Accounts.AddAsync(createdAccount);
        await _dbContext.SaveChangesAsync();
    }
    
    public async Task<List<Account>> GetAllAccountsAsync()
    {
        var accounts = await _dbContext.Accounts.ToListAsync();
        return accounts;
    }

    public async Task<AuthResult> SignInAsync(SignInAccountRequest request)
    {
        var account = await _dbContext.Accounts.FirstOrDefaultAsync(a => a.Username == request.Username)
            ?? throw new Exception();
        
        var isSuccess = _passwordHasher.VerifyPassword(request.Password, account.PasswordHash, account.PasswordSalt);
        if (!isSuccess)
            throw new Exception("Пароль неверный");

        var accessToken = _jwtTokenGenerator.GenerateToken(account);
        return new AuthResult(accessToken);
    }

    public async Task SignUpAsync(SignUpAccountRequest request)
    {
        if (await _dbContext.Accounts.FirstOrDefaultAsync(a => a.Username == request.Username) is not null)
            throw new Exception("Already exists");
        
        var (hash, salt) = _passwordHasher.HashPassword(request.Password);
        var createdAccount = Account.Create(request.Username, role: nameof(Role.Client), hash, salt);
        
        await _dbContext.Accounts.AddAsync(createdAccount);
        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateAccountAsync(UpdateAccountRequest request)
    {
        if (await _dbContext.Accounts.FirstOrDefaultAsync(a => a.Username == request.Username) is not null)
            throw new Exception("Already exists");
        
        var currentAccount = await _userContext.GetUserAsync();
        if (currentAccount is null)
            throw new Exception("Not found current account");
        
        var (hash, salt) = _passwordHasher.HashPassword(request.Password);
        var updatedAccount = currentAccount.Edit(request.Username, hash, salt);
        
        _dbContext.Accounts.Update(updatedAccount);
        await _dbContext.SaveChangesAsync();
    }
}