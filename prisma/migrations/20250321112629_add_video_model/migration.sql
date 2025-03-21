-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "imageStyle" TEXT NOT NULL,
    "voiceName" TEXT NOT NULL,
    "voiceSpeed" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
