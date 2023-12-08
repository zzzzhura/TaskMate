using System.Text.Json.Serialization;

namespace TaskMate.Web;

public static class DependencyInjection
{
    public static IServiceCollection AddPresentation(this IServiceCollection services)
    {
        services.AddControllers().AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        });
        
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        services.AddCors();

        return services;
    }
}