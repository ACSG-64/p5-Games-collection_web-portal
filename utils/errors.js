const errorMessages = {
    userName: 'Your username must have alphanumeric characters and a minimum of 3 characters with a maximum of 15 characters.',
    realName: 'Your name must be in the Latin alphabet.',
    realLastname: 'Your lastname must be in the Latin alphabet.',
    password: 'Your password must be at least 8 characters long and no longer than 30 characters.',
    email: 'Use your valid student email ending in @student.london.ac.uk',
    existingUser: 'The chosen user name already exists, please try another one.',
    imageFormat: 'Incorrect image file. Make sure you are uploading an image in .png or .jpg format.',
    gameName: 'Enter a name for your game in English.',
    publicationDate: 'Enter a valid publication date.',
    gameLink: 'Enter a valid link to your game.',
    inactiveAccount: 'This account is not active. If this is your account, please activate it through the link that was sent to your email.',
    invalidActivationCode: 'Invalid activation code. This account may have already been activated.',
    invalidCredentials: 'The user name or the password is incorrect',
    unknownError: 'We have an error, please try again'
}

function errorFormat() {
    return Object.seal({
        isError: true,
        statusCode: 422,
        msg: errorMessages.unknownError
    })
}

module.exports = {errorMessages, errorFormat}
