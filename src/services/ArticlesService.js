class ArticlesService {
  BaseURL = 'https://blog.kata.academy/api/';

  async getArticles() {
    const res = await fetch(`${this.BaseURL}articles`);
    if (!res.ok) {
      throw new Error(`Произошла ошибка в запросе, статус ${res.status}`);
    }
    const body = await res.json();
    return body;
  }
}
export default ArticlesService;
