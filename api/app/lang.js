const lang = {}

const eng = {}
const pt = {}

// ENG DEFINED VARIABLES
eng.ERROR_REQUEST_FAILED = `Request failed.`
eng.ERROR_NOT_FOUND = `Not found.`

eng.SERVER_ALIVE = `Server is alive.`
eng.ALREADY_SUBSCRIBED = `The number is registered on the platform.`
eng.NOT_SUBSCRIBED = `The number is not registered on the platform.`
eng.SUBSCRIBED_SUCCESS = `was subscribed successfully.`
eng.SUBSCRIBED_FAILURE = `was not subscribed. Is not a Mozambican valid number.`
pt.UNSUBSCRIBED_SUCCESS = `was unsubscribed successfully.`

// PT DEFINED VARIABLES
pt.ERROR_REQUEST_FAILED = `Falha na Solicitação ao Servidor.`
pt.ERROR_NOT_FOUND = `Endereço não encontrado.`

pt.SERVER_ALIVE = `O servidor está activo.`
pt.ALREADY_SUBSCRIBED = `O Número já está registado na plataforma.`
pt.NOT_SUBSCRIBED = `O Número não está registado na plataforma.`
pt.SUBSCRIBED_SUCCESS = `foi subscrito com sucesso.`
pt.SUBSCRIBED_FAILURE = `não foi registado. Não é um número válido em Moçambique.`
pt.UNSUBSCRIBED_SUCCESS = `foi removida a subscrição com sucesso.`
pt.SMS_SEND_SUCCESS = `SMS foi enviada com sucesso para o número`
pt.SMS_SEND_FAILURE = `Falha no envio da SMS para para o número`
pt.COVID19_DATA = `Dados sobre Covid-19 em Moçambique`

lang.ENG = eng
lang.PT = pt

module.exports = lang
