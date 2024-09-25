using Microsoft.EntityFrameworkCore;

public class BancoDeDados : DbContext
{
    protected override void OnConfiguring(
        DbContextOptionsBuilder builder)
    {
        string credencial = "server=localhost;port=3306;database=planner;user=root;password=positivo";

        builder.UseMySQL(credencial);
    }

    public DbSet<Produto> Produtos => Set<Produto>();
    public DbSet<Fornecedor> Fornecedores => Set<Fornecedor>();
    public DbSet<Categoria> Categorias => Set<Categoria>();
    public DbSet<Inventario> Inventarios => Set<Inventario>();
}
