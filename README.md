# NodeJS API to convert Media Files

> Convert your multimedia in nodejs as easy as you like

## Description

By installing this application in your server you can easily convert media files to any format.

This module uses two other main modules that are referred to, at the end of this page. \
Besides, [**ffmpeg**](https://ffmpeg.org/) tools are utilized for having a better performance.

### Version 0.0.0

\>> The **conversion** could be applied to these extensions:

- Videos => (`all formats supported by` [ffmpeg](https://ffmpeg.org))
- Audios => (`all formats supported by` [ffmpeg](https://ffmpeg.org))

----

### Version 1.x.x

> In Progress ...

----
----
----

## Prerequisites

### 1. Install FFmpeg tools on your system

Its size is about 67.5M

You can find the installation solutions at their website here: **[ffmpeg](https://ffmpeg.org/)**

OR

You can do the following commands in preference to the first approach:

- Windows :  \
  first, you need to install a download package manager for windows (sth like apt for Linux). \
  I highly recommend you to download and install `choco` package manager from their website: **[chocolatey](https://chocolatey.org/)** \
  after the installation, just open up a **command line** (cmd or PowerShell) as **administrator** and then do the commands below:

  ```bash
  choco install ffmpeg
  ```

- Linux (Ubuntu) :

  ```bash
  sudo apt update
  sudo apt install ffmpeg
  ```

- Mac :

  ```bash
  brew install ffmpeg --force
  brew link ffmpeg
  ```

----
----

## References

As I said before, this module uses some other tools:

- [express](https://www.npmjs.com/package/express) module
- [uuid](https://www.npmjs.com/package/uuid) module
- [multer](https://www.npmjs.com/package/multer) module
- [ffmpeg](https://ffmpeg.org/) tools
- [fluent-ffmpeg](https://www.npmjs.com/package/fluent-ffmpeg) module