Node.js - Transformer
================

Introdução
------------

O serviço Transformer permite transformar fluxos gerados a partir do Node-red em documentos genéricos interpretatos por outros serviços.
Os documentos em JSON gerados pelo Node-red são transformados em regras em XML e DRL e disponibilizados através de HTTP GET, Web Sockets e MQTT. 

- [Node.js](http://nodejs.org/)
- [Socket.io](http://socket.io/)
- [MQTT](https://github.com/mqttjs/MQTT.js)


Requisitos
------------

Será necessário instalar o node.js, socket.io e mqtt. 

- Node.js :  [http://nodejs.org/](http://nodejs.org/)
- Socket.io:  [http://socket.io/](http://socket.io/)
- MQTT:  [https://github.com/mqttjs/MQTT.js](https://github.com/mqttjs/MQTT.js)


Iniciar Serviço
------------

**node src/app_Server.js**

(Se não funcionar instalar todas as dependências!)

**npm install**