var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<BancoDeDados>();
builder.Services.AddSwaggerGen();
var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.MapCategoriaApi();
app.MapFornecedorApi();
app.MapInventarioApi();
app.MapProdutoApi();

app.UseSwagger();
app.UseSwaggerUI();

app.Run();
