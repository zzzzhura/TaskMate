namespace TaskMate.Core.Interfaces;

public interface IDateTimeProvider
{
    DateTime UtcNow { get; }
}