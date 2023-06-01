type Article = {
  id: number;
  date: string;
  title: string;
  clubId: number;
  occupationId: number;
  body: string;
  qiitaPost: boolean;
  publishDate: string;
  bannerId: number;
  userId: string;
  goalLike: string;
  adventDate: Date;
};

type Tagging = {
  id: number;
  articleId: number;
  tagId: number;
  //　外部キー結合のカラムも必要。
  tag: Tag;
};

type Tag = {
  id: number;
  name: string;
  display: boolean;
};

type Banner = {
  id: number;
  adventName: string;
  description: string;
  startDate: string;
  endDate: string;
  display: boolean;
  userId: string;
  image: string;
};

type Club = {
  id: number;
  display: boolean;
  clubName: string;
};

type Comment = {
  id: number;
  date: Date;
  comment: string;
  articleId: number;
  userId: string;
};

type Like = {
  id: number;
  userId: string;
  articleId: number;
};

type Occupation = {
  id: number;
  occupationName: string;
};

type Profile = {
  id: string;
  username: string;
  clubid: number;
  qiitaToken: string;
  detail: string;
  email: string;
  occupation: number;
  image: string;
  authority: boolean;
};

type Recommend = {
  id: number;
  userId: string;
  articleId: number;
};

export type {
  Article,
  Tagging,
  Tag,
  Banner,
  Club,
  Comment,
  Like,
  Occupation,
  Profile,
  Recommend,
};
