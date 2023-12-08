using Microsoft.Extensions.DependencyInjection;
using TaskMate.UseCases.Services;

namespace TaskMate.UseCases;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<AccountService>();
        services.AddScoped<NotesService>();
        services.AddScoped<TagsService>();
        services.AddScoped<TasksService>();

        return services;
    }
}