const { default: simpleConnect, useMultiFileAuthState, jidDecode, DisconnectReason, generateWAMessageFromContent } = require("@adiwajshing/baileys")
const chalk = require('chalk')
const fs = require("fs")
const exec = require('child_process')
const pino = require('pino')
const { Boom } = require('@hapi/boom')

//const samu330 = new WAConnection()
let simple = {}




exports.connect = async() => {
    console.log(chalk.keyword("blue")('◦ Conectando ◦'))
    
    const {state, saveCreds} = await useMultiFileAuthState("nyanbot")

    const samu330 = simpleConnect({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true,
        browser: ['NyanBot','Safari','1.0.0'],
        auth: state
    })

    samu330.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }
    
    //exports.samu330 = samu330
    samu330.ev.on('creds.update', saveCreds)
    samu330.ev.on("connection.update", (update) => {
        let {qr, connection, lastDisconnect} = update
        if (qr) console.log(chalk.keyword("yellow")('💎   Escanea el codigo...'))
        //if (connection == "conecting") console.log(chalk.keyword("green")('✅   Conectado'))
        if (connection == "close") {console.log(chalk.keyword("red")('❌   Desconectado'))
            let reason = new Boom(lastDisconnect?.error)?.output.statusCode
            if (reason == DisconnectReason.badSession) console.log(chalk.keyword("red")('❌   Sesion invalida'))
            if (reason == DisconnectReason.connectionClosed) console.log(chalk.keyword("red")("❌   La conexion fue cerrada"))
            if (reason == DisconnectReason.restartRequired) console.log(chalk.keyword("red")("❌   Se requiere reiniciar"))
            return this.connect()
            //if (reason == DisconnectReason.intentional) console.log(chalk.keyword("red")("❌   Desconectado por el usuario"))

    }
        if (connection == "open") {console.log(chalk.keyword("green")('✅   Conectado'))
        samu330.user.jid = samu330.decodeJid(samu330.user.id)
    }
        
    })
    /*fs.existsSync(auth) && samu330.loadAuthInfo(auth)
    samu330.on('connecting', () => {
        console.log(chalk.whiteBright("⌛"), chalk.keyword("red")("□ Estado de NyanBot"), chalk.keyword("aqua")("Connecting..."))
    })*/
        /*samu330.on('open', () => {
        console.log(chalk.keyword("green")('╒═══ '), chalk.keyword("blue")('⌈ '), chalk.keyword("aqua")('CONECTADO'), chalk.keyword("blue")(' ⌉'), chalk.keyword("green")(' ═══'))
        console.log(chalk.keyword("green")("├"), chalk.keyword("aqua")("WA Version : "), chalk.whiteBright(samu330.user.phone.wa_version))
        console.log(chalk.keyword("green")("├"), chalk.keyword("aqua")("OS Version : "), chalk.whiteBright(samu330.user.phone.os_version))
        console.log(chalk.keyword("green")("├"), chalk.keyword("aqua")("Device : "), chalk.whiteBright(samu330.user.phone.device_manufacturer))
        console.log(chalk.keyword("green")("├"), chalk.keyword("aqua")("Model : "), chalk.whiteBright(samu330.user.phone.device_model))
        console.log(chalk.keyword("green")("├"), chalk.keyword("aqua")("OS Build Number : "), chalk.whiteBright(samu330.user.phone.os_build_number))
        console.log(chalk.keyword("green")("│"), chalk.keyword("red")('╭╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╮'))
        console.log(chalk.keyword("green")("│"), chalk.keyword("red")('│'), chalk.keyword("yellow")('       BIENVENIDO'))
        console.log(chalk.keyword("green")("│"), chalk.keyword("red")('│'), chalk.keyword("aqua")(' Creditos:'))
        console.log(chalk.keyword("green")("│"), chalk.keyword("red")('│'), chalk.keyword("magenta")(' Samu330 | MankBarBar'))
        console.log(chalk.keyword("green")("│"), chalk.keyword("red")('╰╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╼╯'))
        const authInfo = samu330.base64EncodedAuthInfo()
        fs.writeFileSync(auth, JSON.stringify(authInfo, null, '\t'))
    })*/
    //await samu330.connect({ timeoutMs: 30 * 1000 })
    let sm330 = {}

    samu330.osendMessage = (jid, text, type, srs = {}) => {
        let ctinfo = []
        //let tyype = Object.keys(text)[0]
        if (srs.contextInfo) ctinfo.push(srs.contextInfo)
        if (type == 'extendedTextMessage') {
            samu330.sendMessage(jid, {text : text, contextInfo: ctinfo}, {quoted: srs.quoted})
        } else
        if (type == 'conversation') {
            samu330.sendMessage(jid, {text : text, contextInfo: ctinfo}, {quoted: srs.quoted})
        } else
        if (type == 'imageMessage') {

            samu330.sendMessage(jid, {image : text, contextInfo: ctinfo, caption : srs.caption ? srs.caption : ""}, {quoted: srs.quoted})
        } else
        if (type == 'videoMessage') {
            samu330.sendMessage(jid, {video : text, contextInfo: ctinfo, caption : srs.caption ? srs.caption : ""}, {quoted: srs.quoted})
        } else
        if (type == 'audioMessage') {
            samu330.sendMessage(jid, {audio : text, contextInfo: ctinfo, caption : srs.caption ? srs.caption : ""}, {quoted: srs.quoted})
        }
        if (type == 'documentMessage') {
            samu330.sendMessage(jid, {document : text, contextInfo: ctinfo, caption : srs.caption ? srs.caption : ""}, {quoted: srs.quoted})
        } else
        if (type == 'stickerMessage') {
            samu330.sendMessage(jid, {sticker : text, contextInfo: ctinfo, caption : srs.caption ? srs.caption : ""}, {quoted: srs.quoted})
        } else
        if (type == 'locationMessage') {
            samu330.sendMessage(jid, {location : text, contextInfo: ctinfo, caption : srs.caption ? srs.caption : ""}, {quoted: srs.quoted})
        } else
        if (type == 'contactMessage') {
            samu330.sendMessage(jid, {contacts : text, contextInfo: ctinfo, caption : srs.caption ? srs.caption : ""}, {quoted: srs.quoted})
        } else
        if (type == 'buttonsMessage') {
            samu330.sendMessage(jid, {buttons : text, contextInfo: ctinfo, caption : srs.caption ? srs.caption : ""}, {quoted: srs.quoted})
        } else {
            console.log(type)
        }

        //samu330.sendMessage(jid, text, type)
    }
    sm330.ev = samu330.ev
    sm330.decodeJid = samu330.decodeJid
    samu330.prepareMessageFromContent = (jid, content, options) => {
        console.log(content)
        return generateWAMessageFromContent(jid, content, options)
    }
    samu330.prepareMessage = (jid, content, options) => {
        console.log(content)
        return generateWAMessage(jid, content, options)
    }
    samu330.relayWAMessage = samu330.relayMessage
    samu330.updatePresence = samu330.sendPresenceUpdate
    return samu330
}
