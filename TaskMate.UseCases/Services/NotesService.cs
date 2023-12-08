using Microsoft.EntityFrameworkCore;
using TaskMate.Core.Interfaces.Auth;
using TaskMate.Core.Interfaces.Persistence;
using TaskMate.Core.Notes;
using TaskMate.UseCases.Contracts.Notes;

namespace TaskMate.UseCases.Services;

public class NotesService
{
    private readonly IAppDbContext _dbContext;
    private readonly IUserContext _userContext;

    public NotesService(IAppDbContext dbContext, IUserContext userContext)
    {
        _dbContext = dbContext;
        _userContext = userContext;
    }

    public async Task<List<Note>> GetMyNotes()
    {
        if (!_userContext.TryGetUserId(out var userId))
            throw new Exception("Пользователь не найден");

        var notes = await _dbContext.Notes
            .Include(n => n.Tags)
            .Where(n => n.UserId == userId && !n.IsArchived)
            .ToListAsync();
        return notes;
    }
    
    public async Task<List<Note>> GetArchivedAsync()
    {
        if (!_userContext.TryGetUserId(out var userId))
            throw new Exception("Пользователь не найден");

        var notes = await _dbContext.Notes
            .Include(n => n.Tags)
            .Where(n => n.UserId == userId && n.IsArchived)
            .ToListAsync();
        return notes;
    }
    
    public async Task<List<Note>> GetNotesWithoutTagsAsync()
    {
        if (!_userContext.TryGetUserId(out var userId))
            throw new Exception("Пользователь не найден");

        var notes = await _dbContext.Notes
            .Include(n => n.Tags)
            .Where(n => n.UserId == userId && !n.IsArchived && n.Tags.Count == 0)
            .ToListAsync();
        return notes;
    }
    
    public async Task<Note> GetNote(long id)
    {
        var note = await _dbContext.Notes.FirstOrDefaultAsync(n => n.Id == id)
            ?? throw new Exception("Заметка не найдена в базе данных");
        return note;
    }
    
    public async Task<Note> CreateNoteAsync(CreateNoteRequest request)
    {
        if (!_userContext.TryGetUserId(out var userId))
            throw new Exception("Пользователь не найден");
        
        var note = Note.Create(request.Title, userId);
        await _dbContext.Notes.AddAsync(note);
        
        await _dbContext.SaveChangesAsync();
        return note;
    }
    
    public async Task<Note> WriteNoteAsync(long noteId, WriteNoteRequest request)
    {
        if (!_userContext.TryGetUserId(out var userId))
            throw new Exception("Пользователь не найден");
        
        var note = await _dbContext.Notes.FirstOrDefaultAsync(note => note.Id == noteId 
                                                                      && note.UserId == userId)
                   ?? throw new Exception("Заметка не найдена в базе данных");
        
        note.Write(request.Text);
        _dbContext.Notes.Update(note);
        
        await _dbContext.SaveChangesAsync();
        return note;
    }
    
    public async Task DeleteNoteAsync(long noteId)
    {
        var note = await _dbContext.Notes.FirstOrDefaultAsync(note => note.Id == noteId)
            ?? throw new Exception("Заметка не найдена в базе данных");
        _dbContext.Notes.Remove(note);

        await _dbContext.SaveChangesAsync();
    }

    public async Task AddTagAsync(long tagId, long noteId)
    {
        var note = await _dbContext.Notes.FirstOrDefaultAsync(note => note.Id == noteId)
                   ?? throw new Exception("Заметка не найдена в базе данных");
        
        var tag = await _dbContext.Tags.FirstOrDefaultAsync(tag => tag.Id == tagId)
                   ?? throw new Exception("Тег не найден в базе данных");
        
        note.AddTag(tag);
        _dbContext.Notes.Update(note);

        await _dbContext.SaveChangesAsync();
    }

    public async Task MoveToArchiveAsync(long noteId)
    {
        var note = await _dbContext.Notes.FirstOrDefaultAsync(note => note.Id == noteId)
                   ?? throw new Exception("Заметка не найдена в базе данных");
        
        note.Archive();
        _dbContext.Notes.Update(note);

        await _dbContext.SaveChangesAsync();
    }
}