using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TaskMate.Core.Notes;

namespace TaskMate.Infrastructure.Persistence.EntityConfigs;

public class NoteConfig : IEntityTypeConfiguration<Note>
{
    public void Configure(EntityTypeBuilder<Note> builder)
    {
        builder.ToTable("notes");
        
        builder.HasKey(a => a.Id);
        builder.Property(a => a.Title)
            .HasMaxLength(80)
            .IsRequired();

        builder.HasMany(n => n.Tags)
            .WithMany(t => t.Notes)
            .UsingEntity("NoteTag")
            .ToTable("note_tags");
    }
}