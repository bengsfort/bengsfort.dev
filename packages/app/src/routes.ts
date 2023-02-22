export enum Routes {
  Portfolio = `/`,
  Resume = `/cv`,
  ArticleList = `/articles`,
  Article = `/articles/:id`,
  NotFound = `/404`,
}

export function makeArticlePath(articleId: string) {
  return Routes.Article.replace(`:id`, articleId);
}
