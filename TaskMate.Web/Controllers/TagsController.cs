using Microsoft.AspNetCore.Mvc;
using TaskMate.UseCases.Contracts.Tags;
using TaskMate.UseCases.Mapping;
using TaskMate.UseCases.Services;

namespace TaskMate.Web.Controllers;

[Route("tags")]
public class TagsController : ApiController
{
    private readonly TagsService _tagsService;

    public TagsController(TagsService tagsService)
    {
        _tagsService = tagsService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var tags = await _tagsService.GetTagsAsync();
        return Ok(tags.Select(TagMapper.MapToResponse));
    }
    
    [HttpPost]
    public async Task<IActionResult> Create(CreateTagRequest request)
    {
        var tag = await _tagsService.CreateTagAsync(request);
        return Ok(TagMapper.MapToResponse(tag));
    }
    
    [HttpDelete("{id:long}")]
    public async Task<IActionResult> Delete(long id)
    {
        await _tagsService.DeleteTagAsync(id);
        return Ok(id);
    }
}