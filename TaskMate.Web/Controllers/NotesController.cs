using Microsoft.AspNetCore.Mvc;
using TaskMate.UseCases.Contracts.Notes;
using TaskMate.UseCases.Mapping;
using TaskMate.UseCases.Services;

namespace TaskMate.Web.Controllers;

[Route("notes")]
public class NotesController : ApiController
{
    private readonly NotesService _notesService;

    public NotesController(NotesService notesService)
    {
        _notesService = notesService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var notes = await _notesService.GetMyNotes();
        return Ok(notes.Select(NoteMapper.MapToResponse));
    }
    
    [HttpGet("archive")]
    public async Task<IActionResult> GetArchived()
    {
        var notes = await _notesService.GetArchivedAsync();
        return Ok(notes.Select(NoteMapper.MapToResponse));
    }
    
    [HttpGet("noTags")]
    public async Task<IActionResult> GetNoTags()
    {
        var notes = await _notesService.GetNotesWithoutTagsAsync();
        return Ok(notes.Select(NoteMapper.MapToResponse));
    }
    
    [HttpGet("{id:long}")]
    public async Task<IActionResult> Get(long id)
    {
        var note = await _notesService.GetNote(id);
        return Ok(NoteMapper.MapToResponse(note));
    }
    
    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] string searchStr, [FromQuery] bool isArchive)
    {
        var notes = await _notesService.SearchNotesAsync(searchStr, isArchive);
        return Ok(notes.Select(NoteMapper.MapToResponse));
    }
    
    [HttpPost]
    public async Task<IActionResult> Create(CreateNoteRequest request)
    {
        var note = await _notesService.CreateNoteAsync(request);
        return Ok(note);
    }
    
    [HttpPut("{id:long}")]
    public async Task<IActionResult> Write(long id, WriteNoteRequest request)
    {
        var note = await _notesService.WriteNoteAsync(id, request);
        return Ok(note);
    }

    [HttpPut("{noteId:long}/tagging/{tagId:long}")]
    public async Task<IActionResult> AddTag(long noteId, long tagId)
    {
        await _notesService.AddTagAsync(tagId, noteId);
        return Ok();
    }
    
    [HttpPut("archive/{noteId:long}")]
    public async Task<IActionResult> MoveToArchive(long noteId)
    {
        await _notesService.MoveToArchiveAsync(noteId);
        return Ok();
    }
    
    [HttpDelete("{noteId:long}")]
    public async Task<IActionResult> Delete(long noteId)
    {
        await _notesService.DeleteNoteAsync(noteId);
        return Ok(noteId);
    }
    
    [HttpPut("newCover/{noteId:long}")]
    public async Task<IActionResult> SetCover(long noteId, [FromForm] IFormFile image)
    {
        await _notesService.SetNoteCoverAsync(noteId, image);
        return Ok();
    }
    
    [HttpPut("removeCover/{noteId:long}")]
    public async Task<IActionResult> RemoteCover(long noteId)
    {
        await _notesService.RemoveCoverNoteAsync(noteId);
        return Ok();
    }
}