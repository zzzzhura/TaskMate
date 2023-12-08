namespace TaskMate.UseCases.Mapping.Responses;

public record TaskResponse(long Id, 
    string Text, 
    long UserId, 
    bool IsCompleted,
    string CreatedDate,
    string EndedDate,
    string Status);