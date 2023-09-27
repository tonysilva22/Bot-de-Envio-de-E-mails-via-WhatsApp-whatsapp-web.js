# Bot de Envio de E-mails via WhatsApp

Este é um bot que permite enviar e-mails diretamente pelo WhatsApp. Ele utiliza a biblioteca `whatsapp-web.js` para se comunicar com o WhatsApp Web e a biblioteca `nodemailer` para enviar e-mails.

## Configuração

Antes de usar o bot, é necessário configurar algumas informações:

1. Instale as dependências:

   ```bash
   npm install whatsapp-web.js qrcode-terminal moment nodemailer readline
   ```

2. Configure o Gmail:

   - Abra o arquivo `index.js` e substitua `'seuemail@gmail.com'` e `'****senha******'` pelo seu endereço de e-mail e senha do Gmail.

3. Inicie o Bot:

   ```bash
   node botemail.js
   ```

## Funcionalidades

O bot é capaz de:

- Gerar um código QR para autenticação no WhatsApp.
- Saudar o usuário com base no horário do dia.
- Solicitar e enviar e-mails.

## Uso

1. Após iniciar o bot, escaneie o código QR gerado com o WhatsApp no seu celular.

2. O bot irá cumprimentar você com base no horário do dia.

3. Ele solicitará o e-mail de destino, o assunto e a mensagem do e-mail.

4. Após fornecer essas informações, o bot enviará o e-mail.

5. Você receberá uma confirmação de envio.





