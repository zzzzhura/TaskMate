using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TaskMate.Core.Tags;

namespace TaskMate.Infrastructure.Persistence.EntityConfigs;

public class TagConfig : IEntityTypeConfiguration<Tag>
{
    public void Configure(EntityTypeBuilder<Tag> builder)
    {
        builder.ToTable("tags");
        
        builder.HasKey(a => a.Id);
        builder.Property(a => a.Name)
            .HasMaxLength(40)
            .IsRequired();

        builder.HasMany(n => n.Notes)
            .WithMany(t => t.Tags)
            .UsingEntity("NoteTag")
            .ToTable("note_tags");
    }
}