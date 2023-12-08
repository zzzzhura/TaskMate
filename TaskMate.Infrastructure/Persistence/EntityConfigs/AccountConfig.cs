using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TaskMate.Core.Accounts;
using TaskMate.Core.Accounts.Enums;

namespace TaskMate.Infrastructure.Persistence.EntityConfigs;

public class AccountConfig : IEntityTypeConfiguration<Account>
{
    public void Configure(EntityTypeBuilder<Account> builder)
    {
        builder.ToTable("accounts");

        builder.HasKey(a => a.Id);
        builder.Property(a => a.Username)
            .IsRequired()
            .HasMaxLength(80);

        builder.Property(a => a.Role)
            .HasConversion(
                roleEnum => roleEnum.ToString(), 
                roleStr => (Role)Enum.Parse(typeof(Role), roleStr));
    }
}