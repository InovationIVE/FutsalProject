-- CreateTable
CREATE TABLE `Player` (
    `playerId` INTEGER NOT NULL AUTO_INCREMENT,
    `soccerPlayerId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `speed` INTEGER NOT NULL,
    `attack` INTEGER NOT NULL,
    `defence` INTEGER NOT NULL,
    `profileImage` VARCHAR(191) NULL,
    `rarity` VARCHAR(191) NOT NULL,
    `probability` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Player_soccerPlayerId_key`(`soccerPlayerId`),
    PRIMARY KEY (`playerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Goods` (
    `goodsId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `cash_amount` INTEGER NOT NULL,

    UNIQUE INDEX `Goods_name_key`(`name`),
    PRIMARY KEY (`goodsId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Gacha` (
    `gachaId` INTEGER NOT NULL AUTO_INCREMENT,
    `cardName` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Gacha_cardName_key`(`cardName`),
    PRIMARY KEY (`gachaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
