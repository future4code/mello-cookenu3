# RESPOSTAS

### EXERCÍCIO 1

**A:** Rounds são as rodadas de iterações para aleatorizar a senha. Quanto mais rounds, mais demorado porém mais seguro a criptografia fica.
O tanto ideal de rounds é 12.
Salt é uma string aleatória colocada junta da senha para o hash ficar diferente.

### EXERCÍCIO 2

**A:** De certo o cadastro, uma vez que para fazer uma comparação posteriormente, precisamos dos dados já criptografados usando o BCrypt.
**B:** Este endpoint só necessitará de uma alteração quando formos usar User Roles. Caso contrário, não necessitará de alterações.

### EXERCÍCIO 4

OBS: Estou usando /user/:id invés de /user/profile para usar a função getUserById pois não compreendi a diferença das duas, uma vez que a /user/profile também pegava os usuários pelo id no código anterior.
