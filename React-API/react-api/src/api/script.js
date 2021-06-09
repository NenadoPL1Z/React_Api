export default class GotService {
  constructor() {
    this._apiBase = "https://www.anapioficeandfire.com/api";
  }

  //? Сетевой запрос который возвращает нам определённый ответ взависимости от url

  getResours = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Fetch ${url} no information; Status ${res.status}`);
    }
    return await res.json();
  };

  //! Получаем всех персонажей
  getAllCharacters = async () => {
    const res = await this.getResours(`/characters?page=5&pageSize=10`);
    return res.map((item) => this._transformCharacter(item));
  };

  //! Получаем определённого персонажа
  getCharacters = async (id) => {
    const characters = await this.getResours(`/characters/${id}`);
    return this._transformCharacter(characters);
  };

  //! Получаем все книги
  getAllBook = async () => {
    const book = await this.getResours("/books");
    return book.map((item) => this._trnasformBook(item));
  };
  //! Получаем книгу по id
  getBook = async (id) => {
    const book = await this.getResours(`/books/${id}`);
    return this._trnasformBook(book);
  };

  //! Получаем все дома
  getAllHouse = async () => {
    return this.getResours(`/houses`);
  };
  //! Получаем дом по id
  getHouse = async (id) => {
    return this.getResours(`/houses/${id}`);
  };

  //! Возвращаем транформированные данные
  _transformCharacter = (char) => {
    return {
      name: char.name ? char.name : "No informations",
      gender: char.gender ? char.gender : "No informations",
      born: char.born ? char.born : "No informations",
      death: char.death ? char.death : "No informations",
      culture: char.culture ? char.culture : "No informations",
    };
  };

  _trnasformHouse = (house) => {
    return {
      name: house.name,
      region: house.region,
      words: house.words,
      titles: house.titles,
      overlord: house.overlord,
      ancestralWeapons: house.ancestralWeapons,
    };
  };
  _trnasformBook = (book) => {
    return {
      name: book.name,
      numberOfPages: book.numberOfPages,
      publiser: book.publiser,
      released: book.released,
    };
  };
}
