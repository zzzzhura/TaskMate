using TaskMate.Core.Tasks.Enums;

namespace TaskMate.UseCases.Contracts.Tasks;

public record TaskRequest(string Text, string EndedDate, string Status);