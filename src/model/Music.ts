export class Music {
    constructor(
        private id: string,
        private title: string,
        private author: string,
        private date: Date,
        private file: string,
        private genre: string[],
        private album: string,
        private author_name: string
    ) { }

    getId(): string { return this.id; }

    getTitle(): string { return this.title; }

    getAuthor(): string { return this.author; }

    getDate(): Date { return this.date; }

    getFile(): string { return this.file; }

    getGenre(): string[] { return this.genre; }

    getAlbum(): string { return this.album; }

    getAuthor_name(): string { return this.author_name; }

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

    setAuthor_name(author_name: string) {
        this.author_name = author_name;
    }

    static toMusicModel(music: any): Music {
        return new Music(music.id, music.title, music.author, music.date, music.file, music.genre, music.album, music.author_name);
    }
}

export interface MusicInputDTO {
    title: string,
    file: string,
    genre: string[],
    album: string,
    author_name: string
}