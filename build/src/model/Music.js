"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Music = void 0;
class Music {
    constructor(id, title, author, date, file, genre, album) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.date = date;
        this.file = file;
        this.genre = genre;
        this.album = album;
    }
    getId() { return this.id; }
    getTitle() { return this.title; }
    getAuthor() { return this.author; }
    getDate() { return this.date; }
    getFile() { return this.file; }
    getGenre() { return this.genre; }
    getAlbum() { return this.album; }
    setId(id) {
        this.id = id;
    }
    setTitle(title) {
        this.title = title;
    }
    setAuthor(author) {
        this.author = author;
    }
    setDate(date) {
        this.date = date;
    }
    setFile(file) {
        this.file = file;
    }
    setGenre(genre) {
        this.genre = genre;
    }
    setAlbum(album) {
        this.album = album;
    }
    static toMusicModel(music) {
        return new Music(music.id, music.title, music.author, music.date, music.file, music.genre, music.album);
    }
}
exports.Music = Music;
//# sourceMappingURL=Music.js.map