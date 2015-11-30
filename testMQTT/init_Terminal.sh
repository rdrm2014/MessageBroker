#!/usr/bin/env bash

path='~/GitHub/Nodejs/EngServicos/Transformer/testMQTT'

# ESP8266 - ESP8266_IR
osascript -e 'tell app "Terminal"
    do script "node '$path'/receive.js -t ESP8266_IR"
end tell'

# ESP8266 - ESP8266_ReadIR
osascript -e 'tell app "Terminal"
    do script "node '$path'/receive.js -t ESP8266_ReadIR"
end tell'

# ESP8266 - ESP8266_Temp
osascript -e 'tell app "Terminal"
    do script "node '$path'/receive.js -t ESP8266_Temp"
end tell'

# ESP8266 - ESP8266_Pir
osascript -e 'tell app "Terminal"
    do script "node '$path'/receive.js -t ESP8266_Pir"
end tell'

# ESP8266 - ESP8266_Relay
osascript -e 'tell app "Terminal"
    do script "node '$path'/receive.js -t ESP8266_Relay"
end tell'

# Message Broker - MessageBroker_RuleXML
osascript -e 'tell app "Terminal"
    do script "node '$path'/receive.js -t MessageBroker_RuleXML"
end tell'

# Message Broker - MessageBroker_RuleDRL
osascript -e 'tell app "Terminal"
    do script "node '$path'/receive.js -t MessageBroker_RuleDRL"
end tell'

osascript -e 'tell app "Terminal"
    do script "node '$path'/emit.js -t Teste -m AHAHA"
end tell'