-- AlterTable
ALTER TABLE `uploads` MODIFY `allowedExtensions` VARCHAR(191) NOT NULL DEFAULT 'jpg,png,jpeg,gif,mkv,docx,zip,rar,pdf,doc,mp3,mp4,flv,wav,txt,mov,avi,webm,wav,mpeg',
    MODIFY `allowedMimeTypes` VARCHAR(191) NOT NULL DEFAULT 'image/jpeg',
    MODIFY `maxUploadSize` VARCHAR(191) NOT NULL DEFAULT '256';
