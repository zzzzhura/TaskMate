using TaskMate.Core.Tags;
using TaskMate.UseCases.Mapping.Responses;

namespace TaskMate.UseCases.Mapping;

public static class TagMapper
{
    public static TagResponse MapToResponse(Tag tag)
        {
            return 
                new TagResponse(tag.Name ,tag.Id);
        }
    
}