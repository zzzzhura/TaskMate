using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TaskMate.Core.Tasks.Enums;
using Task = TaskMate.Core.Tasks.Task;

namespace TaskMate.Infrastructure.Persistence.EntityConfigs;

public class TaskConfig : IEntityTypeConfiguration<Task>
{
    public void Configure(EntityTypeBuilder<Task> builder)
    {
        builder.ToTable("tasks");
        
        builder.HasKey(a => a.Id);
        builder.Property(a => a.Text)
            .IsRequired();

        builder.Property(a => a.Status)
            .HasConversion(
                status => status.ToString(), 
                statusStr => (Status)Enum.Parse(typeof(Status), statusStr));
    }
}