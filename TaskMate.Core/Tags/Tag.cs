using TaskMate.Core.Notes;
using TaskMate.Shared.Entities;

namespace TaskMate.Core.Tags;

public class Tag : Entity
{
    public string Name { get; private set; }

    public List<Note> Notes { get; set; } = null!;
    
    private Tag(string name)
    {
        Name = name;
    }

    public static Tag Create(string name)
    {
        var tag = new Tag(name);
        return tag;
    }
}