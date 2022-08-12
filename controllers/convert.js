const fs = require('fs')
const ffmpeg = require('fluent-ffmpeg')

const IS_DELETE_ORIGINAL_FILE = true
const FFMPEG_BINARY_DESTINATION = './lib/ffmpeg-master-latest-win64-gpl/bin/ffmpeg.exe'

ffmpeg.setFfmpegPath(FFMPEG_BINARY_DESTINATION)

const convert = (req, res) => {

    const { formatTo } = req.body

    ffmpeg({ source: req.fileDestination })
        .toFormat(formatTo)
        .on('end', () => {
            console.log('processing done')
            // delete file from temp folder
            if (IS_DELETE_ORIGINAL_FILE) {
                fs.unlink(req.fileDestination, (err) => {
                    if (!err) {
                        console.log('file deleted')
                    }
                })
            }
        })
        .on('error', (error) => {
            console.log(error)
            console.log('some error occured')
        })
        .saveToFile('./converted_files/' + req.fileName + '.' + formatTo)

    res.send('converting')
}



module.exports = {
    convert
}