-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `source` VARCHAR(191) NULL,
    `profilePhoto` VARCHAR(191) NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `wallet` INTEGER NOT NULL DEFAULT 0,
    `planId` INTEGER NULL,
    `stripeCustomerId` VARCHAR(191) NULL,
    `isAdmin` BOOLEAN NOT NULL DEFAULT false,
    `adminType` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `telephone` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,
    `ip` VARCHAR(191) NULL,
    `speciality` VARCHAR(191) NULL,
    `businessEmail` VARCHAR(191) NULL,
    `showEmail` BOOLEAN NOT NULL DEFAULT true,
    `showMobile` BOOLEAN NOT NULL DEFAULT true,
    `businessPhone` VARCHAR(191) NULL,
    `website` VARCHAR(191) NULL,
    `facebook` VARCHAR(191) NULL,
    `instagram` VARCHAR(191) NULL,
    `twitter` VARCHAR(191) NULL,
    `home` BOOLEAN NOT NULL DEFAULT true,
    `webContent` BOOLEAN NOT NULL DEFAULT true,
    `storage` BOOLEAN NOT NULL DEFAULT true,
    `smtp` BOOLEAN NOT NULL DEFAULT true,
    `payments` BOOLEAN NOT NULL DEFAULT true,
    `keys` BOOLEAN NOT NULL DEFAULT true,
    `analytics` BOOLEAN NOT NULL DEFAULT true,
    `uploads` BOOLEAN NOT NULL DEFAULT true,
    `manageCategories` BOOLEAN NOT NULL DEFAULT true,
    `theme` BOOLEAN NOT NULL DEFAULT true,
    `plans` BOOLEAN NOT NULL DEFAULT true,
    `trash` BOOLEAN NOT NULL DEFAULT true,
    `ads` BOOLEAN NOT NULL DEFAULT true,
    `memberType` VARCHAR(191) NOT NULL DEFAULT 'Individual',

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Card` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `cardNumber` VARCHAR(191) NOT NULL,
    `expiry` VARCHAR(191) NOT NULL,
    `cvc` VARCHAR(191) NOT NULL,
    `stripeCardId` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL,
    `type` ENUM('CHARGE', 'SUBSCRIPTION', 'UPGRADE', 'TOPUP') NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `senderId` INTEGER NOT NULL,
    `receiverId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StaticContent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `siteName` VARCHAR(191) NOT NULL,
    `siteSlogan` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NOT NULL,
    `maintainence` BOOLEAN NOT NULL DEFAULT false,
    `defaultLanguage` VARCHAR(191) NOT NULL DEFAULT 'English',
    `dateFormat` VARCHAR(191) NULL,
    `favicon` VARCHAR(191) NULL,
    `background` VARCHAR(191) NULL DEFAULT '#343537',

    UNIQUE INDEX `StaticContent_siteName_key`(`siteName`),
    UNIQUE INDEX `StaticContent_siteSlogan_key`(`siteSlogan`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `images` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `categoryId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `status` VARCHAR(191) NULL DEFAULT 'ACTIVE',
    `advertiserType` VARCHAR(191) NOT NULL DEFAULT 'Individual',
    `adType` VARCHAR(191) NOT NULL DEFAULT 'REGULAR',
    `adLanguage` VARCHAR(191) NOT NULL DEFAULT 'English',
    `adRegion` VARCHAR(191) NOT NULL DEFAULT 'All',
    `adCountry` VARCHAR(191) NOT NULL DEFAULT '',

    UNIQUE INDEX `Post_id_userId_key`(`id`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `subCategoryId` INTEGER NULL,
    `order` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Language` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Country` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Storage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `wasabiEnabled` BOOLEAN NOT NULL DEFAULT false,
    `wasabiBucketName` VARCHAR(191) NOT NULL DEFAULT 'bucket',
    `wasabiAccessKeyId` VARCHAR(191) NOT NULL DEFAULT 'OXNRE3JD1ZNYP72GA8LM',
    `wasabiAccessKeySecret` VARCHAR(191) NOT NULL DEFAULT 'szjzkDMz0FrKNiCr7AX0zDr6U3eHXVgAl3DX7d2J',
    `wasabiRegion` VARCHAR(191) NOT NULL DEFAULT 'us-west-1',
    `s3Enabled` BOOLEAN NOT NULL DEFAULT false,
    `s3BucketName` VARCHAR(191) NULL,
    `s3AccessKeyId` VARCHAR(191) NULL,
    `s3AccessKeySecret` VARCHAR(191) NULL,
    `s3Region` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SMTP` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `smtpHost` VARCHAR(191) NOT NULL DEFAULT 'mail.worldtalents.co',
    `smtpPort` VARCHAR(191) NOT NULL DEFAULT '587',
    `smtpUsername` VARCHAR(191) NOT NULL DEFAULT 'noreply@worldtalents.co',
    `smtpPassword` VARCHAR(191) NOT NULL DEFAULT 'My@2023Amirwo',
    `smtpSenderMail` VARCHAR(191) NOT NULL DEFAULT 'noreply@worldtalents.co',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stripeKey` VARCHAR(191) NOT NULL DEFAULT 'sk_test_51NCAJ6EqYI7ImjKtykijt5pbZzqql4oSJAG4uJBwHKbrBcIVupI3AQ3BgofBm7a3zW2QuhWJgOsuOJ5p7OlwbSwz00N4Ze1s5g',
    `stripePublicKey` VARCHAR(191) NULL DEFAULT 'sk_test_51NCAJ6EqYI7ImjKtykijt5pbZzqql4oSJAG4uJBwHKbrBcIVupI3AQ3BgofBm7a3zW2QuhWJgOsuOJ5p7OlwbSwz00N4Ze1s5g',
    `paypalClientId` VARCHAR(191) NOT NULL DEFAULT 'AQSJRx_yBxdf2m9nQXcMmM9G4vPRqSeTFp_PxWQIDn5Qbs4LpPL-V1ruQXW04YUA5WzK0a7Ftz5al_H6',
    `paypalSecretKey` VARCHAR(191) NOT NULL DEFAULT 'EOoO6XM2oSpx1r2LA-eIdFfMUrXrE9tzfOuSh3ie_mqSjEAao7ZLYtTyatcT5_DZLtOJuisNWwjblymC',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Analytics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `googleAnalyticCode` VARCHAR(191) NOT NULL DEFAULT 'dummy',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Keys` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `googleMapApiKey` VARCHAR(191) NULL,
    `youtubeApiKey` VARCHAR(191) NULL,
    `reCaptchaKey` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Uploads` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `allowedExtensions` TEXT NOT NULL DEFAULT 'jpg,png,jpeg,gif,mkv,docx,zip,rar,pdf,doc,mp3,mp4,flv,wav,txt,mov,avi,webm,wav,mpeg',
  `allowedMimeTypes` TEXT NOT NULL DEFAULT 'text/plain,video/mp4,video/mov,video/mpeg,video/flv,video/avi,video/webm,audio/wav,audio/mpeg,video/quicktime,audio/mp3,image/png,image/jpeg,image/gif,application/pdf,application/msword,application/zip,application/x-rar-compressed,text/pdf,application/x-pointplus,text/css',
  `maxUploadSize` TEXT NOT NULL DEFAULT '256',
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Theme` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Plan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `postNumber` INTEGER NOT NULL,
    `featuedPostNumber` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `browseAndSaveAds` BOOLEAN NULL DEFAULT false,
    `messageAdvertisers` BOOLEAN NULL DEFAULT false,
    `chatWithAdvertisers` BOOLEAN NULL DEFAULT false,
    `createGroupChats` BOOLEAN NULL DEFAULT false,
    `postVideoUrls` BOOLEAN NULL DEFAULT false,
    `uploadVideos` BOOLEAN NULL DEFAULT false,
    `featuredMember` BOOLEAN NULL DEFAULT false,
    `price90Days` DOUBLE NOT NULL DEFAULT 1.99,
    `priceAnnual` DOUBLE NOT NULL DEFAULT 5.99,
    `discountPercent` DOUBLE NOT NULL DEFAULT 0.0,
    `discountedPrice` DOUBLE NULL,

    UNIQUE INDEX `Plan_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `Plan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Card` ADD CONSTRAINT `Card_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_subCategoryId_fkey` FOREIGN KEY (`subCategoryId`) REFERENCES `Category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
