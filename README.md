# Full-stack-backend

### Banco de dados criado para armazenar novas músicas

# Principais funcionalidades :earth_asia:

 #### Acesso sem estar logado:
 - [x] Cadastrar usuário.
 - [x] Fazer login.
 
 #### Restrito a usuários logado:
 
 - [x] Ver músicas disponíveis.
 - [x] Criar/publicar uma nova música.
 
# Rodando a aplicação :computer:
 - [x] Clonando o projeto 
 ```
  git clone https://github.com/Martthus/Full-stack-backend.git 
 ```
 - [x] Acessando a pasta onde contem a raiz do projeto: /Full-stack-backend
 ```
  cd Full-stack-backend
 ```
 - [x] Instalando as dependências
 ```
  npm i
 ```
 - [x] Por fim executando a aplicação
 ```
  npm run start dev
 ```
# Endpoints disponíveis:

### CADASTRO :clipboard:
 ```sql
    POST http://localhost:3003/user/signup
      Content-Type: application/json

  {
	  "name": ex: "jabuticaba",
	  "email": ex: "jabuticaba@bom.com",
	  "nickname": ex: "jujubinha",
	  "password": ex: "123456789"
  }
 ```

### LOGIN :busts_in_silhouette:
 ```sql
    POST http://localhost:3003/user/login
      Content-Type: application/json

  {
	  "email": ex: "jabuticaba@bom.com",
	  "password": ex: "123456789"
  }
 ```

### NEW MUSIC :notes:
 ```sql
    POST http://localhost:3003/music/new
      Authorization: token de autorização / ex: "qbfq@%ffw6sdf342¨@%#&sfsw52342¨@%f6125f"
      Content-Type: application/json

  {
	  "title": ex: "Alecrim Dourado",
      "file": ex: "www.musics-cloud.com.cloud/music-alecrimdourado",
      "genre": ex: ["Punk, Rock"],
      "album": ex: "2017"
  }
 ```
 
 ### GET ALL MUSICS
  ```sql
      GET http://localhost:3003/music/all
        Authorization: token de autorização / ex: "qbfq@%ffw6sdf342¨@%#&sfsw52342¨@%f6125f"
        Content-Type: application/json
  ```
