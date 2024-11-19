var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<BancoDeDados>();
builder.Services.AddSwaggerGen();

builder.Services.AddCors();
var app = builder.Build();
// Adicione esta linha na configuração do serviço

// Antes da configuração de endpoints, adicione:
app.UseCors(policy => policy
    .AllowAnyOrigin() // Permite qualquer origem (pode ser substituído por .WithOrigins("http://localhost:3000") para maior segurança)
    .AllowAnyMethod() // Permite todos os métodos (GET, POST, etc.)
    .AllowAnyHeader() // Permite todos os cabeçalhos
);


app.MapGet("/", () => "Hello World!");
app.MapCategoriaApi();
app.MapFornecedorApi();
app.MapInventarioApi();
app.MapProdutoApi();

app.UseSwagger();
app.UseSwaggerUI();

app.Run();
