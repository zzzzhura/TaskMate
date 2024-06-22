using TaskMate.Core.Tasks.Enums;
using TaskMate.UseCases.Mapping.Responses;

namespace TaskMate.UseCases.Mapping;

public static class TaskMapper
{
    public static TaskResponse MapToResponse(TaskMate.Core.Tasks.Task task)
    {
        var status = task.Status switch
        {
            Status.Urgent => "Срочно",
            Status.Middle => "Умеренно",
            Status.NotUrgent => "Не срочно",
            Status.None => throw new ArgumentException("Статус должен быть одним из трех индикаторов"),
            _ => throw new ArgumentOutOfRangeException(nameof(task.Status))
        };
        var startedDate = task.CreatedDate
            .ToLocalTime()
            .ToShortDateString();
        
        var endedDate = task.EndedDate
            .ToLocalTime()
            .ToShortDateString();
        
        return 
            new TaskResponse(task.Id, task.Text, task.UserId, task.IsCompleted, 
                startedDate, endedDate, status);
    }
}