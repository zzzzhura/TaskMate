using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TaskMate.Web.Controllers;

[ApiController]
[Authorize]
public class ApiController : Controller
{
    
}