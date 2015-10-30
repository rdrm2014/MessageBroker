#!/usr/bin/env bash

path='~/GitHub/Nodejs/EngServicos/MessageBroker/testMQTT/'

osascript -e 'tell app "Terminal"
    do script "node '$path'receive.js -t ESP8266_IR"
end tell'

osascript -e 'tell app "Terminal"
    do script "node '$path'receive.js -t ESP8266_ReadIR"
end tell'

osascript -e 'tell app "Terminal"
    do script "node '$path'receive.js -t ESP8266_Temp"
end tell'

osascript -e 'tell app "Terminal"
    do script "node '$path'receive.js -t ESP8266_Pir"
end tell'

osascript -e 'tell app "Terminal"
    do script "node '$path'receive.js -t ESP8266_Relay"
end tell'

osascript -e 'tell app "Terminal"
    do script "node '$path'emit.js -t Teste -m AHAHA"
end tell'