using List.Data;
using List.Models;
using Microsoft.EntityFrameworkCore;

namespace List.Routes
{
    public static class TitleRoute
    {
        public static void TitleRoutes(this WebApplication app)
        {
            var route = app.MapGroup("title");

            //GET
            route.MapGet("", async (DataContext db, CancellationToken ct) =>
            {
                var title = await db.Title.FirstOrDefaultAsync(ct);
                return Results.Ok(title);
            });

            //PUT
            route.MapPut("{id:int}", async (int id, TitleRequest req, DataContext db, CancellationToken ct) =>
            {
                var title = await db.Title.FindAsync(id, ct);

                if (title is null)
                {
                    return Results.NotFound();
                }

                title.ChangeTitle(req.title);
                await db.SaveChangesAsync(ct);
                return Results.Ok(title);
            });
        }
    }
}
