using Microsoft.EntityFrameworkCore;
using TaskMate.Core.Interfaces.Auth;
using TaskMate.Core.Interfaces.Persistence;
using TaskMate.Core.Tasks.Enums;
using TaskMate.UseCases.Contracts.Tasks;

namespace TaskMate.UseCases.Services;

public class TasksService
{
    private readonly IAppDbContext _dbContext;
    private readonly IUserContext _userContext;

    public TasksService(IAppDbContext dbContext, IUserContext userContext)
    {
        _dbContext = dbContext;
        _userContext = userContext;
    }

    public async Task<List<TaskMate.Core.Tasks.Task>> GetMyTasksAsync()
    {
        if (!_userContext.TryGetUserId(out var userId))
            throw new Exception("Пользователь не найден");

        var tasks = await _dbContext.Tasks
            .Where(t => t.UserId == userId && !t.IsCompleted)
            .ToListAsync();

        return tasks;
    }
    
    public async Task<List<TaskMate.Core.Tasks.Task>> GetCompletedTasksAsync()
    {
        if (!_userContext.TryGetUserId(out var userId))
            throw new Exception("Пользователь не найден");

        var tasks = await _dbContext.Tasks
            .Where(t => t.UserId == userId && t.IsCompleted)
            .ToListAsync();

        return tasks;
    }
    
    public async Task<List<TaskMate.Core.Tasks.Task>> GetUrgentTasksAsync()
    {
        if (!_userContext.TryGetUserId(out var userId))
            throw new Exception("Пользователь не найден");

        var tasks = await _dbContext.Tasks
            .Where(t => t.UserId == userId && t.Status == Status.Urgent && !t.IsCompleted)
            .ToListAsync();

        return tasks;
    }
    
    public async Task<TaskMate.Core.Tasks.Task> GetTaskAsync(long taskId)
    {
        var task = await _dbContext.Tasks
            .FirstOrDefaultAsync(t => t.Id == taskId)
            ?? throw new Exception("Задача не найдена");

        return task;
    }
    
    public async Task<List<TaskMate.Core.Tasks.Task>> SearchTasksAsync(string search, bool isCompleted)
    {
        if (!_userContext.TryGetUserId(out var userId))
            throw new Exception("Пользователь не найден");

        List<TaskMate.Core.Tasks.Task> tasks;
        if (isCompleted)
        {
            tasks = await _dbContext.Tasks
                .Where(t => t.UserId == userId 
                            && t.IsCompleted 
                            && t.Text.ToLower().Equals(search.ToLower()))
                .ToListAsync();
        }
        else
        {
            tasks = await _dbContext.Tasks
                .Where(t => t.UserId == userId 
                            && !t.IsCompleted 
                            && t.Text.ToLower().Equals(search.ToLower()))
                .ToListAsync();
        }
        return tasks;
    }
    
    public async Task CreateTaskAsync(TaskRequest request)
    {
        if (!_userContext.TryGetUserId(out var userId))
            throw new Exception("Пользователь не найден");

        if (!DateTime.TryParse(request.EndedDate, out var endedDate))
            throw new Exception("Формат даты указан неверно");

        var status = MapStatus(request.Status);
        var newTask = Core.Tasks.Task.Create(request.Text, userId, endedDate.ToUniversalTime(), status);
        await _dbContext.Tasks.AddAsync(newTask);

        await _dbContext.SaveChangesAsync();
    }
    
    public async Task UpdateTaskAsync(long taskId, TaskRequest request)
    {
        if (!DateTime.TryParse(request.EndedDate, out var endedDate))
            throw new Exception("Формат даты указан неверно");

        var status = MapStatus(request.Status);
        var task = await _dbContext.Tasks
                       .FirstOrDefaultAsync(t => t.Id == taskId)
                   ?? throw new Exception("Задача не найдена");

        var updatedTask = task.Update(request.Text, endedDate.ToUniversalTime(), status);
        _dbContext.Tasks.Update(updatedTask);

        await _dbContext.SaveChangesAsync();
    }
    
    public async Task CompleteTaskAsync(long taskId)
    {
        var task = await _dbContext.Tasks
                       .FirstOrDefaultAsync(t => t.Id == taskId)
                   ?? throw new Exception("Задача не найдена");

        task.Complete();
        _dbContext.Tasks.Update(task);

        await _dbContext.SaveChangesAsync();
    }
    
    public async Task DeleteTaskAsync(long taskId)
    {
        var task = await _dbContext.Tasks
                       .FirstOrDefaultAsync(t => t.Id == taskId)
                   ?? throw new Exception("Задача не найдена");

        _dbContext.Tasks.Remove(task);

        await _dbContext.SaveChangesAsync();
    }

    private Status MapStatus(string statusStr)
    {
        return statusStr switch
        {
            "Срочно"  => Status.Urgent,
            "Умеренно" => Status.Middle,
            "Не срочно" => Status.NotUrgent,
            _ => throw new ArgumentOutOfRangeException(nameof(statusStr), "Статус не соответствует текущему формату")
        };
    }
}