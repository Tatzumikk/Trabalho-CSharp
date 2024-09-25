using Microsoft.EntityFrameworkCore;

public static class InventarioApi
{
    public static void MapInventarioApi(this WebApplication app)
    {
        var tabela = app.MapGroup("/inventarios");

        tabela.MapGet("/inventarios", async (BancoDeDados db) =>
            await db.Inventarios.ToListAsync());

        tabela.MapGet("/inventarios/{id}", async (int id, BancoDeDados db) => 
            await db.Inventarios.FindAsync(id) is Inventario inventario
                ? Results.Ok(inventario)
                : Results.NotFound());

        tabela.MapPost("/inventarios", async (Inventario inventario, BancoDeDados db) => {
            db.Inventarios.Add(inventario);
            await db.SaveChangesAsync();
            return Results.Created($"/inventarios/{inventario.ID}", inventario);
        });

        tabela.MapPut("/inventarios/{id}", async (int id, Inventario inventarioAtualizado, BancoDeDados db) =>
        {
            var inventario = await db.Inventarios.FindAsync(id);
            if (inventario is null) return Results.NotFound();

            inventario.NomeProduto = inventarioAtualizado.NomeProduto;
            inventario.Descricao = inventarioAtualizado.Descricao;
            inventario.Quantidade = inventarioAtualizado.Quantidade;

            await db.SaveChangesAsync();

            return Results.NoContent();
        });

        tabela.MapDelete("/inventarios/{id}", async (int id, BancoDeDados db) =>
        {
            if (await db.Inventarios.FindAsync(id) is Inventario inventario)
            {
                db.Inventarios.Remove(inventario);
                await db.SaveChangesAsync();
                return Results.NoContent();
            }
            return Results.NotFound();
        });
    }
}
