# :newspaper: ig.news

Tenha notícias em primeira mão e de altíssima qualidade através de assinaturas super acessíveis e de conteúdos gerados para que você se mantenha atualizado sobre o mundo da tecnologia.

### Features

- *:pencil: Login através do Github*
- *:pencil: Inscrição da assinatura do usuário*
- *:pencil: Pagamento via Stripe*
- *:pencil: Listagem de postagens dinâmicas*
- *:pencil: Autênticação de visualização de conteúdo*

### Tecnologias

- *:fire: ReactJS*
- *:fire: NextJS + TypeScript*
- *:fire: Prismic CMS*
- *:fire: Pré processador SASS*
- *:fire: React Icons*
- *:fire: Stripe Payments*
- *:fire: Fauna DB*

### Clonando e Rodando
```javascript
  // Clone o projeto
  $ git clone https://github.com/avilysva/ig.news.git
  
  // Rode o projeto com o seguinte comando
  $ yarn dev
  
  // O projeto será executado na seguinte porta
  $ http://localhost:3000
  
  // Para ouvir os Webhooks do stripe, primeiro instale a CLI
  https://stripe.com/docs/stripe-cli/overview
  
  // Rode o comando a baixo para ouvir os Webhooks
  $ stripe listen --forward-to localhost:3000/api/webhooks
```

## A Aplicação

![cover](https://github.com/avilysva/avilysva/blob/master/projects-images/ig.news/cover.png)

