using Microsoft.EntityFrameworkCore;

public static class CategoriaApi
{
    public static void MapCategoriaApi(this WebApplication app)
    {
        var tabela = app.MapGroup("/categorias");

        tabela.MapGet("/categorias", async (BancoDeDados db) =>
            await db.Categorias.ToListAsync());

        tabela.MapGet("/categorias/{id}", async (int id, BancoDeDados db) =>
            await db.Categorias.FindAsync(id)
            is Categoria categoria
                ? Results.Ok(categoria)
                : Results.NotFound());

        tabela.MapPost("/categorias", async (Categoria categoria, BancoDeDados db) => {
            db.Categorias.Add(categoria);
            await db.SaveChangesAsync();
            return Results.Created($"/categorias/{categoria.ID}", categoria);
        });

        tabela.MapPut("categorias/{id}", async (int id, Categoria categoriaAtualizada, BancoDeDados db) =>
        {
            var categoria = await db.Categorias.FindAsync(id);
            if (categoria is null) return Results.NotFound();

            categoria.Descricao = categoriaAtualizada.Descricao;

            await db.SaveChangesAsync();

            return Results.NoContent();
        });

        tabela.MapDelete("categorias/{id}", async (int id, BancoDeDados db) =>
        {
            if (await db.Categorias.FindAsync(id) is Categoria categoria)
            {
                db.Categorias.Remove(categoria);
                await db.SaveChangesAsync();
                return Results.NoContent();
            }
            return Results.NotFound();
        });
    }
}
