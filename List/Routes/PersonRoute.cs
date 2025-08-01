using List.Data;
using List.Models;
using Microsoft.EntityFrameworkCore;

namespace List.Routes
{
    public static class PersonRoute
    {
        public static void PersonRoutes(this WebApplication app)
        {
            var route = app.MapGroup("person");

            //POST
            route.MapPost("", async (PersonRequest req, DataContext db, CancellationToken ct) => //ct to cancel database in case of error
            {
                var person = new PersonModel(req.name);
                await db.People.AddAsync(person, ct);
                await db.SaveChangesAsync(ct);

            });

            //GET all
            route.MapGet("", async (DataContext db, CancellationToken ct) =>
            {
                var people = await db.People.ToListAsync(ct);
                return Results.Ok(people);
            });

            //PUT
            route.MapPut("{id:guid}", async (Guid id, PersonRequest req, DataContext db, CancellationToken ct) =>
            {
                var person = await db.People.FindAsync(id, ct);

                if (person is null)
                {
                    return Results.NotFound();
                }

                person.ChangeName(req.name);
                await db.SaveChangesAsync(ct);
                return Results.Ok(person);
            });

            //DELETE
            route.MapDelete("{id:guid}", async (Guid id, DataContext db, CancellationToken ct) =>
            {
                var person = await db.People.FindAsync(id, ct);

                if (person is null)
                {
                    return Results.NotFound();
                }

                db.People.Remove(person);
                await db.SaveChangesAsync(ct);
                return Results.NoContent();
            });
        }
    }
}
