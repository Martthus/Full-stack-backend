export class Music {
    constructor(
        private id: string,
        private title: string,
        private author: string,
        private date: Date,
        private file: string,
        private genre: string[],
        private album: string
    ) { }

    getId(): string { return this.id; }

    getTitle(): string { return this.title; }

    getAuthor(): string { return this.author; }

    getDate(): Date { return this.date; }

    getFile(): string { return this.file; }

    getGenre(): string[] { return this.genre; }

    getAlbum(): string { return this.album; }

    setId(id: string) {
        this.id = id;
    }

    setTitle(title: string) {
        this.title = title;
    }

    setAuthor(author: string) {
        this.author = author;
    }

    setDate(date: Date) {
        this.date = date;
    }

    setFile(file: string) {
        this.file = file;
    }

    setGenre(genre: string[],) {
        this.genre = genre;
    }

    setAlbum(album: string) {
        this.album = album;
    }

    static toMusicModel(music: any): Music {
        return new Music(music.id, music.title, music.author, music.date, music.file, music.genre, music.album);
    }
}

export interface MusicInputDTO {
    title: string,
    file: string,
    genre: string[],
    album: string
}