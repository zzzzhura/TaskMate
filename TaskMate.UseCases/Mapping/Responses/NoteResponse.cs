using TaskMate.Core.Tags;

namespace TaskMate.UseCases.Mapping.Responses;

public record NoteResponse(
    long Id,
    string Title,
    byte[] Image,
    string? Text,
    bool IsArchived,
    string CreatedDate,
    string UpdatedDate,
    long UserId,
    List<TagResponse> Tags);
