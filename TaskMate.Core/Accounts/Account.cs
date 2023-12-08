using TaskMate.Core.Accounts.Enums;
using TaskMate.Shared.Entities;

namespace TaskMate.Core.Accounts;

public class Account : Entity
{
    public string Username { get; private set; }
    public string? Email { get; private set; }
    public byte[] PasswordHash { get; private set; }
    public byte[] PasswordSalt { get; private set; }
    public Role Role { get; private set; }

    private Account(string username, Role role, byte[] passwordHash, byte[] passwordSalt, string? email = null)
    {
        Username = username;
        Role = role;
        Email = email;
        PasswordHash = passwordHash;
        PasswordSalt = passwordSalt;
    }

    public static Account Create(string username, string role, 
        byte[] passwordHash, byte[] passwordSalt, string? email = null)
    {
        var accountRole = Validate(role);
        return new Account(username, accountRole, passwordHash, passwordSalt, email);
    }
    
    public Account ChangeRole(string role)
    {
        var accountRole = Validate(role);
        Role = accountRole;
        return this;
    }
    
    public Account Edit(string username, byte[] passwordHash, byte[] passwordSalt)
    {
        Username = username;
        PasswordHash = passwordHash;
        PasswordSalt = passwordSalt;
        return this;
    }
    
    private static Role Validate(string role)
    {
        return !Enum.TryParse<Role>(role, true, out var accountRole)
            ? throw new Exception() 
            : accountRole;
    }

#pragma warning disable CS8618
    private Account(string username, string email, Role role)
    {
        Username = username;
        Email = email;
        Role = role;
    }
}