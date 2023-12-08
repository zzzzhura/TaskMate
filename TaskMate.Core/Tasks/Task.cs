using TaskMate.Core.Tasks.Enums;
using TaskMate.Shared.Entities;


namespace TaskMate.Core.Tasks;

public class Task : Entity
{
    public string Text { get; private set; }
    public long UserId { get; private set; }
    public bool IsCompleted { get; private set; }
    public DateTime CreatedDate { get; private set; }
    public DateTime EndedDate { get; private set; }
    public Status Status { get; private set; }
    
    private Task(string text, long userId, DateTime createdDate, DateTime endedDate, Status status)
    {
        Text = text;
        UserId = userId;
        CreatedDate = createdDate;
        EndedDate = endedDate;
        Status = status;
    }

    public static Task Create(string text, long userId, DateTime endedDate, Status status)
    {
        return new Task(text, userId, DateTime.UtcNow, endedDate, status);
    }

    public Task Update(string text, DateTime endedDate, Status status)
    {
        Text = text;
        EndedDate = endedDate;
        Status = status;
        return this;
    }

    public void Complete()
    {
        if (IsCompleted)
            throw new Exception("Задача уже выполнена");
        IsCompleted = true;
    }
}