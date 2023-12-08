using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskMate.UseCases.Contracts.Accounts;
using TaskMate.UseCases.Services;

namespace TaskMate.Web.Controllers;

[Route("auth")]
public class AccountController : ApiController
{
    private readonly AccountService _accountService;
    
    public AccountController(AccountService accountService)
    {
        _accountService = accountService;
    }

    /// <summary>
    /// Получение данных о текущем аккаунте
    /// </summary>
    /// <returns></returns>
    [HttpGet("me")]
    public async Task<IActionResult> GetCurrent()
    {
        var account = await _accountService.GetCurrentAccountAsync();
        return Ok(account);
    }
    
    /// <summary>
    /// Получение нового jwt токена пользователя
    /// </summary>
    /// <param name="request"></param>
    /// <returns></returns>
    [HttpPost("signIn")]
    [AllowAnonymous]
    public async Task<IActionResult> SignIn(SignInAccountRequest request)
    {
        var authResult = await _accountService.SignInAsync(request);
        return Ok(authResult);
    }
    
    
    /// <summary>
    /// Регистрация нового аккаунта
    /// </summary>
    /// <param name="request"></param>
    /// <returns></returns>
    [HttpPost("signUp")]
    [AllowAnonymous]
    public async Task<IActionResult> SignUp(SignUpAccountRequest request)
    {
        await _accountService.SignUpAsync(request);
        return Ok();
    }
    
    /// <summary>
    /// Обновление своего аккаунта
    /// </summary>
    /// <param name="request"></param>
    /// <returns></returns>
    [HttpPut("update")]
    public async Task<IActionResult> Update(UpdateAccountRequest request)
    {
        await _accountService.UpdateAccountAsync(request);
        return Ok();
    }
}