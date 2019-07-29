module.exports.auth = function(error){
	switch (error.code){
        case 'auth/email-already-exists':
            error.message = 'O endereço de e-mail já está sendo usado por outra conta.'
            break;
        case 'auth/invalid-password':
            error.message = 'A senha deve ser uma string com pelo menos 6 caracteres.'
            break;
        case 'auth/invalid-email':
            error.message = 'O endereço de email está mal formatado.'
            break;
        case 'auth/invalid-phone-number':
            error.message = 'O número de telefone deve ser uma string de identificador compatível com padrão E.164 não vazia.'
            break;
        case 'auth/phone-number-already-exists':
            error.message = 'O usuário com o número de telefone fornecido já existe.'
            break;
        case 'auth/invalid-photo-url':
            error.message = 'O campo foto url deve ser um URL válido.'
            break;
        case 'auth/invalid-uid':
            error.message = 'O uid deve ser uma string não vazia com no máximo 128 caracteres.'
            break;
        case 'auth/user-not-found':
            error.message = 'Não há registro de usuário correspondente ao identificador fornecido.'
            break;   
        case 'auth/wrong-password':
            error.message = 'A senha ou o usuário inválido.'
            break;    
        default:
            console.log('default')
    }
    return error;
}