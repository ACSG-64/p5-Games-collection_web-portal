const sharp = require("sharp");
const errorsUtil = require('../../../utils/errors');
const {createHash} = require('crypto');
const {unlink} = require('fs');
const {promisify} = require('util');
const {publishGame, updateGameDetails, getImageName} = require('../../../models/games/gamesModel');

const rmFile = promisify(unlink)

async function gameUploader(reqBody, userId, imageField) {
    let imageName;

    // By default we will upload the game for the first time
    let uploadGame = publishGame
    try {
        // Process the image and get its new name
        imageName = await processImage(imageField, reqBody.userName);
    } catch (e) {
        const error = errorsUtil.errorFormat()
        error.msg = errorsUtil.errorMessages.imageFormat
        throw(error)
    }
    // Get the old image name if any
    const oldImageName = await getImageName(userId)
    if (oldImageName !== undefined) {
        // Remove old image from the disk
        await removeOldImage(oldImageName)
        // Since there is an existing record, the action will be update that record
        uploadGame = updateGameDetails
    }

    try {
        return await uploadGame(reqBody, userId, imageName) // The function return the id of the game
    } catch (e) {
        throw(errorsUtil.errorFormat())
    }
}

async function removeOldImage(imageName) {
    try {
        await Promise.all([
            rmFile('public/images/games/covers/' + imageName),
            rmFile('public/images/games/thumbnails/' + imageName)])
    } catch (e) {}
}

async function processImage(imageField, userName) {
    // Get the buffer and the original name of the file
    const {buffer, originalName} = imageField;

    // Create a 'unique' name for the file
    const imageNameHash = createHash('md5')
        .update(`${userName}${originalName}${Date.now()}${Math.random()}`)
        .digest('hex');
    // Set the final image name in webp format
    const imageName = `${imageNameHash}.webp`

    // Two images will be created from the original image:
    // - The cover image
    let createCoverImage = sharp(buffer)
        .webp({quality: 80})
        .resize(1024, 576)
        .toFile('public/images/games/covers/' + imageName);
    // - The thumbnail image
    let createThumbnailImage = sharp(buffer)
        .webp({quality: 80})
        .resize(341, 192)
        .toFile('public/images/games/thumbnails/' + imageName);
    await Promise.all([createCoverImage, createThumbnailImage]);

    return imageName
}

module.exports = {gameUploader}
