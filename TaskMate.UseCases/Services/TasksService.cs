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
    
    public async Task<List<TaskMate.Core.Tasks.Task>> GetCompletedTaskAsync()
    {
        if (!_userContext.TryGetUserId(out var userId))
            throw new Exception("Пользователь не найден");

        var tasks = await _dbContext.Tasks
            .Where(t => t.UserId == userId && t.IsCompleted)
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
    
    public async Task CreateTaskAsync(TaskRequest request)
    {
        if (!_userContext.TryGetUserId(out var userId))
            throw new Exception("Пользователь не найден");

        if (!DateTime.TryParse(request.EndedDate, out var endedDate))
            throw new Exception("Формат даты указан неверно");

        if (!Enum.TryParse<Status>(request.Status, true, out var status))
            throw new Exception("Статус указан неверно");

        var newTask = Core.Tasks.Task.Create(request.Text, userId, endedDate, status);
        await _dbContext.Tasks.AddAsync(newTask);

        await _dbContext.SaveChangesAsync();
    }
    
    public async Task UpdateTaskAsync(long taskId, TaskRequest request)
    {
        if (!DateTime.TryParse(request.EndedDate, out var endedDate))
            throw new Exception("Формат даты указан неверно");

        if (!Enum.TryParse<Status>(request.Status, true, out var status))
            throw new Exception("Статус указан неверно");
        
        var task = await _dbContext.Tasks
                       .FirstOrDefaultAsync(t => t.Id == taskId)
                   ?? throw new Exception("Задача не найдена");

        var updatedTask = task.Update(request.Text, endedDate, status);
        _dbContext.Tasks.Update(updatedTask);

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
}