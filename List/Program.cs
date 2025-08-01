using List.Data;
using List.Routes;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<DataContext>();

var app = builder.Build();

// Habilita Swagger na interface
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.PersonRoutes();
app.TitleRoutes();

app.UseHttpsRedirection();
app.Run();
