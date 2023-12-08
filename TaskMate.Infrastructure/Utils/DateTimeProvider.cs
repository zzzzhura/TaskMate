using TaskMate.Core.Interfaces;

namespace TaskMate.Infrastructure.Utils;

public class DateTimeProvider : IDateTimeProvider
{
    public DateTime UtcNow => DateTime.UtcNow;
}