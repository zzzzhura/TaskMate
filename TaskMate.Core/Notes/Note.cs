using TaskMate.Core.Tags;
using TaskMate.Shared.Entities;

namespace TaskMate.Core.Notes;

public class Note : Entity
{
    private readonly List<Tag> _tags = new();
    
    public string Title { get; private set; }
    public string? Text { get; private set; }
    public byte[]? Image { get; private set; }
    public bool IsArchived { get; private set; }
    public DateTime CreatedDate { get; private set; }
    public DateTime UpdatedDate { get; private set; }
    public long UserId { get; private set; }
    public IReadOnlyCollection<Tag> Tags => _tags;
    
    private Note(string title, DateTime createdDate, DateTime updatedDate, long userId)
    {
        Title = title;
        CreatedDate = createdDate;
        UpdatedDate = updatedDate;
        UserId = userId;
    }

    public static Note Create(string title, long userId)
    {
        return new Note(title, DateTime.UtcNow, DateTime.UtcNow, userId);
    }

    public void Write(string text)
    {
        Text = text;
        UpdatedDate = DateTime.UtcNow;
    }

    public void AddTag(Tag tag)
    {
        _tags.Add(tag);
    }
    
    public void Archive()
    {
        if (IsArchived)
            throw new Exception("Задача уже в архиве");
        IsArchived = true;
    }

    public void SetCover(byte[] imageBytes)
    {
        Image = imageBytes;
    }
    
    public void RemoveCover()
    {
        if (Image is null)
            throw new Exception("Обложка уже удалена");
        Image = null;
    }
}