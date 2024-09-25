using Microsoft.EntityFrameworkCore;

public static class FornecedorApi
{
    public static void MapFornecedorApi(this WebApplication app)
    {
        var tabela = app.MapGroup("/fornecedores");

        tabela.MapGet("/fornecedores", async (BancoDeDados db) =>
            await db.Fornecedores.ToListAsync());

        tabela.MapGet("/fornecedores/{id}", async (int id, BancoDeDados db) => 
            await db.Fornecedores.FindAsync(id) is Fornecedor fornecedor
                ? Results.Ok(fornecedor)
                : Results.NotFound());

        tabela.MapPost("/fornecedores", async (Fornecedor fornecedor, BancoDeDados db) => {
            db.Fornecedores.Add(fornecedor);
            await db.SaveChangesAsync();
            return Results.Created($"/fornecedores/{fornecedor.ID}", fornecedor);
        });

        tabela.MapPut("/fornecedores/{id}", async (int id, Fornecedor fornecedorAtualizado, BancoDeDados db) =>
        {
            var fornecedor = await db.Fornecedores.FindAsync(id);
            if (fornecedor is null) return Results.NotFound();

            fornecedor.NomeFornecedor = fornecedorAtualizado.NomeFornecedor;
            fornecedor.ProdutoFornecido = fornecedorAtualizado.ProdutoFornecido;
            fornecedor.CodigoFornecedor = fornecedorAtualizado.CodigoFornecedor;

            await db.SaveChangesAsync();

            return Results.NoContent();
        });

        tabela.MapDelete("/fornecedores/{id}", async (int id, BancoDeDados db) =>
        {
            if (await db.Fornecedores.FindAsync(id) is Fornecedor fornecedor)
            {
                db.Fornecedores.Remove(fornecedor);
                await db.SaveChangesAsync();
                return Results.NoContent();
            }
            return Results.NotFound();
        });
    }
}
