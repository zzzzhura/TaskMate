using Microsoft.EntityFrameworkCore;
using TaskMate.Core.Interfaces.Persistence;
using TaskMate.Core.Tags;
using TaskMate.UseCases.Contracts.Tags;

namespace TaskMate.UseCases.Services;

public class TagsService
{
    private readonly IAppDbContext _dbContext;

    public TagsService(IAppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Tag>> GetTagsAsync()
    {
        return await _dbContext.Tags.ToListAsync();
    }
    
    public async Task<Tag> CreateTagAsync(CreateTagRequest request)
    {
        var tag = Tag.Create(request.Name);
        await _dbContext.Tags.AddAsync(tag);
        
        await _dbContext.SaveChangesAsync();
        return tag;
    }
    
    public async Task DeleteTagAsync(long id)
    {
        var tag = await _dbContext.Tags.FirstOrDefaultAsync(t => t.Id == id)
            ?? throw new Exception("Тег не найден");

        _dbContext.Tags.Remove(tag);
        await _dbContext.SaveChangesAsync();
    }
}