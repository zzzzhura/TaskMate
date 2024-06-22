using Microsoft.AspNetCore.Mvc;
using TaskMate.UseCases.Contracts.Tasks;
using TaskMate.UseCases.Mapping;
using TaskMate.UseCases.Services;

namespace TaskMate.Web.Controllers;

[Route("tasks")]
public class TasksController : ApiController
{
    private readonly TasksService _tasksService;

    public TasksController(TasksService tasksService)
    {
        _tasksService = tasksService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var tasks = await _tasksService.GetMyTasksAsync();
        return Ok(tasks.Select(TaskMapper.MapToResponse));
    } 
    
    [HttpGet("completed")]
    public async Task<IActionResult> GetCompleted()
    {
        var tasks = await _tasksService.GetCompletedTasksAsync();
        return Ok(tasks.Select(TaskMapper.MapToResponse));
    } 
    
    [HttpGet("urgent")]
    public async Task<IActionResult> GetUrgentTasks()
    {
        var tasks = await _tasksService.GetUrgentTasksAsync();
        return Ok(tasks.Select(TaskMapper.MapToResponse));
    } 
    
    [HttpGet("{id:long}")]
    public async Task<IActionResult> Get(long id)
    {
        var task = await _tasksService.GetTaskAsync(id);
        return Ok(TaskMapper.MapToResponse(task));
    } 
    
    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] string searchStr, [FromQuery] bool isCompleted)
    {
        var tasks = await _tasksService.SearchTasksAsync(searchStr, isCompleted);
        return Ok(tasks.Select(TaskMapper.MapToResponse));
    } 
    
    [HttpPost]
    public async Task<IActionResult> Create(TaskRequest request)
    {
        await _tasksService.CreateTaskAsync(request);
        return Ok();
    } 
    
    [HttpPut("{id:long}")]
    public async Task<IActionResult> Update(long id, TaskRequest request)
    {
        await _tasksService.UpdateTaskAsync(id, request);
        return Ok();
    } 
    
    [HttpPut("complete/{taskId:long}")]
    public async Task<IActionResult> Complete(long taskId)
    {
        await _tasksService.CompleteTaskAsync(taskId);
        return Ok();
    } 
    
    [HttpDelete("{id:long}")]
    public async Task<IActionResult> Delete(long id)
    {
        await _tasksService.DeleteTaskAsync(id);
        return Ok();
    } 
}