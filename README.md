# Metodos utilizados para CRUD

 GET: Buscar ou listar uma informação
 POST: Criar alguma nova informação
 PUT: Atualizar uma informação existente
 DELETE: Deletar uma informação existente

 Corpo (Request Body): Dados para criação ou atualização de um registro => request.body
 Route Params: Identificar qual recurso eu quero atualizar ou deletar => request.params
 Query Params: Paginação, filtros, ordenação => request.query

# Controle de versão
  Migration

# Casos de Uso
# Funcionalidades
## Usuarios

    - Rota para criar um usuario;
    - Rota para logar um usuario;

## Eventos 
    - Rota para criar um evento;
    - Rota para listar um evento;
        - Filtrar por Dia, Cidade, Estilo;
    