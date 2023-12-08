using System.Globalization;
using Humanizer;
using TaskMate.Core.Notes;
using TaskMate.UseCases.Mapping.Responses;

namespace TaskMate.UseCases.Mapping;

public static class NoteMapper
{
    public static NoteResponse MapToResponse(Note note)
    {
        var createdDate = note.CreatedDate.Humanize(culture: CultureInfo.CurrentCulture);
        var updatedDate = note.UpdatedDate.Humanize(culture: CultureInfo.CurrentCulture);
        
        return 
            new NoteResponse(note.Id, note.Title, note.Text, note.IsArchived, 
                createdDate, updatedDate, note.UserId, note.Tags);
    }
}