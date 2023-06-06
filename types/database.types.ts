export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      article: {
        Row: {
          id?: number | null;
          userId?: string | null;
          date?: string | null;
          title?: string | null;
          clubTagId?: number | null;
          occupationTagId?: number | null;
          body?: string | null;
          goalLike?: string | null;
          qiitaPost?: boolean | null;
          publishDate?: string | null;
          publish?: boolean | null;
          bannerId?: number | null;
          delete?: boolean | null;
        };
        Insert: {
          id?: number | null;
          userId?: string | null;
          date?: string | null;
          title?: string | null;
          clubTagId?: number | null;
          occupationTagId?: number | null;
          body?: string | null;
          goalLike?: string | null;
          qiitaPost?: boolean | null;
          publishDate?: string | null;
          publish?: boolean | null;
          bannerId?: number | null;
          delete?: boolean | null;
        };
      };
      club: {
        Row: {
          id: number;
          display: boolean;
          clubName: string;
        };
        Insert: {
          id: number;
          display: boolean;
          clubName: string;
        };
      };
      comment: {
        Row: {
          id?: number | null;
          date?: string | null;
          comment?: number | null;
          articleId?: number | null;
          userId?: number | null;
        };
        Insert: {
          id?: number | null;
          date?: string | null;
          comment?: number | null;
          articleId?: number | null;
          userId?: number | null;
        };
      };
      like: {
        Row: {
          id?: number | null;
          userId?: number | null;
          articleId?: number | null;
        };
      };
      profiles: {
        Row: {
          id?: string | null;
          username?: string | null;
          clubid?: number | null;
          qiitaToken?: string | null;
          detail?: string | null;
          email?: string | null;
          occupation?: number | null;
          image?: string | null;
          authority?: boolean | null;
        };
      };
      recommend: {
        Row: {
          id?: number | null;
          userId?: number | null;
          articleId?: number | null;
        };
      };
      tag: {
        Row: {
          id?: number | null;
          name?: string | null;
          display?: boolean | null;
        };
        Insert: {
          name?: string | null;
          display?: boolean | null;
        };
      };
      tagging: {
        Row: {
          id?: number | null;
          articleId?: number | null;
          tagId?: number | null;
        };
        Insert: {
          articleId?: number | null;
          tagId?: number | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
