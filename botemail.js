const { Client } = require('whatsapp-web.js');
const client = new Client();
const qrcode = require('qrcode-terminal');
const nodemailer = require('nodemailer');//npm install nodemailer
const readline = require('readline');



async function run() {
  client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
  });

  client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
  });

  await client.initialize();


  
function cumprimentar() {
  const dataAtual = new Date();
  const hora = dataAtual.getHours();

  let saudacao;

  if (hora >= 6 && hora < 12) {
    saudacao = "Bom dia!";
  } else if (hora >= 12 && hora < 17) {
    saudacao = "Boa tarde!";
  } else {
    saudacao = "Boa noite!";
  }

  return saudacao;
}



  const delay = ms => new Promise(res => setTimeout(res, ms));

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'seuemail@gmail.com',
        pass: '****senha******'
    }
  });

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  client.on('message', async msg => {
   
    if (
      msg.body.match(/(boa noite|bom dia|boa tarde|ola|tudo bem |dia|informações|mais informações|Imagens|videos|audios|teste)/i) &&
      msg.from.endsWith('@c.us')
    ) 
    {
      const chat = await msg.getChat();
      chat.sendStateTyping();
      await delay(3000);
      const saudacoes = cumprimentar();
      await client.sendMessage(msg.from, `${saudacoes} `);
  
      let toEmail = '';
      let subject = '';
      let text = '';
  
      const toEmailQuestion = 'Por favor, digite o e-mail de destino para enviar o e-mail:';
      await client.sendMessage(msg.from, toEmailQuestion);
      const toEmailResponse = await waitForResponse();
      toEmail = toEmailResponse.body;
  
      const subjectQuestion = 'Qual é o assunto do e-mail?';
      await client.sendMessage(msg.from, subjectQuestion);
      const subjectResponse = await waitForResponse();
      subject = subjectResponse.body;
  
      const textQuestion = 'Qual é a mensagem do e-mail?';
      await client.sendMessage(msg.from, textQuestion);
      const textResponse = await waitForResponse();
      text = textResponse.body;
  
      const mailOptions = {
        from: 'seu-email@gmail.com',
        to: toEmail,
        subject: subject,
        text: text
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('E-mail enviado: ' + info.response);
          const successMessage = 'E-mail enviado com sucesso! 📧';
          client.sendMessage(msg.from, successMessage);
        }
      });
      
    }
  });
  
  function waitForResponse() {
    return new Promise((resolve, reject) => {
      client.on('message', async msg => {
        if (msg.from.endsWith('@c.us')) {
          resolve(msg);
        }
      });
    });
  }
}  
run().catch(err => console.error(err));
