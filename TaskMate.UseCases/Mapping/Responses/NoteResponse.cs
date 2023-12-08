using TaskMate.Core.Tags;

namespace TaskMate.UseCases.Mapping.Responses;

public record NoteResponse(
    long Id,
    string Title,
    string? Text,
    bool IsArchived,
    string CreatedDate,
    string UpdatedDate,
    long UserId,
    IReadOnlyCollection<Tag> Tags);
