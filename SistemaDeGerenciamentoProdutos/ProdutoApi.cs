using Microsoft.EntityFrameworkCore;

public static class ProdutoApi
{
    public static void MapProdutoApi(this WebApplication app)
    {
        var tabela = app.MapGroup("/produtos");

        tabela.MapGet("/produtos", async (BancoDeDados db) =>
            await db.Produtos.ToListAsync());

        tabela.MapGet("/produtos/{id}", async (int id, BancoDeDados db) =>
            await db.Produtos.FindAsync(id)
            is Produto produto
                ? Results.Ok(produto)
                : Results.NotFound());

        tabela.MapPost("/produtos", async (Produto produto, BancoDeDados db) => {
            db.Produtos.Add(produto);
            await db.SaveChangesAsync();
            return Results.Created($"/produtos/{produto.ID}", produto);
        });

        tabela.MapPut("produtos/{id}", async (int id, Produto produtoAtualizado, BancoDeDados db) =>
        {
            var produto = await db.Produtos.FindAsync(id);
            if (produto is null) return Results.NotFound();

            produto.NomeProduto = produtoAtualizado.NomeProduto;
            produto.CodigoProduto = produtoAtualizado.CodigoProduto;
            produto.Preco = produtoAtualizado.Preco;

            await db.SaveChangesAsync();

            return Results.NoContent();
        });

        tabela.MapDelete("produtos/{id}", async (int id, BancoDeDados db) =>
        {
            if (await db.Produtos.FindAsync(id) is Produto produto)
            {
                db.Produtos.Remove(produto);
                await db.SaveChangesAsync();
                return Results.NoContent();
            }
            return Results.NotFound();
        });
    }
}
