# Full-stack-backend

### Banco de dados criado para armazenar novas músicas

# Principais funcionalidades :earth_asia:

 #### Acesso sem estar logado:
 - [x] Cadastrar usuário.
 - [x] Fazer login.
 
 #### Restrito a usuários logado:
 
 - [x] Ver músicas disponíveis.
 - [x] Criar/publicar uma nova música.
 - [x] Pegar músicas por id.
 
# Rodando a aplicação :computer:
 - [x] Clonando o projeto 
 ```bash
  git clone https://github.com/Martthus/Full-stack-backend.git 
 ```
 - [x] Acessando a pasta onde contem a raiz do projeto: /Full-stack-backend
 ```bash
  cd Full-stack-backend
 ```
 - [x] Instalando as dependências
 ```bash
  npm i
 ```
 - [x] Por fim executando a aplicação
 ```bash
  npm run dev
 ```
# Endpoints disponíveis:

### SIGNUP :clipboard:
  ```node
    POST http://localhost:3003/user/signup
      Authorization: none
      Content-Type: application/json

  {
	  "name": ex: "jabuticaba",
	  "email": ex: "jabuticaba@bom.com",
	  "nickname": ex: "jujubinha",
	  "password": ex: "123456789"
  }
 ```

### LOGIN :busts_in_silhouette:
```node
    POST http://localhost:3003/user/login
      Authorization: none
      Content-Type: application/json


  {
      "email": ex: "jabuticaba@bom.com",
      "password": ex: "123456789"
  }
 ```

### NEW MUSIC :notes:
 ```node
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
 
 ### GET ALL MUSICS :musical_score:
  ```node
      GET http://localhost:3003/music/all
        Authorization: token de autorização / ex: "qbfq@%ffw6sdf342¨@%#&sfsw52342¨@%f6125f"
        Content-Type: application/json
  ```
  
 ### GET MUSIC BY ID :musical_score:
  ```node
      GET http://localhost:3003/music/{{id}}
        Authorization: token de autorização / ex: "qbfq@%ffw6sdf342¨@%#&sfsw52342¨@%f6125f"
        Content-Type: application/json
  ```
