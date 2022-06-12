# About the project / _Sobre o projeto_

This project is a challenge proposed by Carrefour Tech Day, where the object is to freely create an e-commerce containing the company's products through 2 different APIs, one to search stores by zip-code and another to search for products from store. The layout is mobile-focused.

_Esse é projeto é um desafio proposto pelo Carrefour Tech Day, onde o objeto é criar livremente um e-commerce contendo produtos da empresa através de 2 APIs distintas, uma para buscar lojas pelo CEP e outra para buscar produtos da loja. O layout tem como foco dispositivos móveis._

---

# Skills / _Habilidades_

- Javascript, HTML
- CSS layout developed with Bootstrap and Tailwind. _Layout CSS desenvolvido com Bootstrap e Tailwind_
- React with Redux for state management. _React com Redux para gerenciamento de estado_
- API consumption com axios. _Consumo de API com axios_
- Data storage in local storage. _Armazenamento de dados no local storage_
- Creation of specific routes including 404 page. _Criação de rotas específicas incluindo página 404_
- Use of icons from react-icons library. _Utilização de ícones da biblioteca react-icons_
- Carousel of images. _Carrossel de imagens_
- Use of conventional commits. _Utilização de commits padronizados_
- App prepared to be deployed in Docker. _App preparado para ser implementado no Docker_
- App deployed in Heroku. _App implementado no Heroku_

---

# Layout

<img src="intro.gif" alt="Carrefour Tech Day" style="width:100%;"/>

---

# Deployment / _Implantação_

See it in action/ **Veja em ação**: [https://carrefourtech.herokuapp.com/](https://carrefourtech.herokuapp.com/)

Commands:
git clone git@github.com:kelsonbatista/project-carrefour-tech-day.git
docker build -t carrefour-dev-img .
docker run -d -it -p 5000:80/tcp --name carrefour-dev carrefour-dev-img
Access http://localhost:5000
