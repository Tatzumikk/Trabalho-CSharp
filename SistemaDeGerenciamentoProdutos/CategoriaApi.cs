using Microsoft.EntityFrameworkCore;

public static class CategoriaApi
{
    public static void MapCategoriaApi(this WebApplication app)
    {
        var tabela = app.MapGroup("/categorias");

        // Rota GET para todas as categorias
        tabela.MapGet("/", async (BancoDeDados db) => 
            await db.Categorias.ToListAsync());
        

        // Rota GET para uma categoria específica pelo ID
        tabela.MapGet("/{id}", async (int id, BancoDeDados db) =>
            await db.Categorias.FindAsync(id)
            is Categoria categoria
                ? Results.Ok(categoria)
                : Results.NotFound());

        // Rota POST para criar uma nova categoria
        tabela.MapPost("/", async (Categoria categoria, BancoDeDados db) => {
            db.Categorias.Add(categoria);
            await db.SaveChangesAsync();
            return Results.Created($"/categorias/{categoria.ID}", categoria);
        });

        // Rota PUT para atualizar uma categoria existente
        tabela.MapPut("/{id}", async (int id, Categoria categoriaAtualizada, BancoDeDados db) =>
        {
            var categoria = await db.Categorias.FindAsync(id);
            if (categoria is null) return Results.NotFound();

            categoria.Descricao = categoriaAtualizada.Descricao;

            await db.SaveChangesAsync();

            return Results.NoContent();
        });

        // Rota DELETE para remover uma categoria
        tabela.MapDelete("/{id}", async (int id, BancoDeDados db) =>
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
