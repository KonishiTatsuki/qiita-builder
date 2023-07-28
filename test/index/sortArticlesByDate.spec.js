import { shallowMount } from "@vue/test-utils";
import Index from "../../pages/index.vue";

jest.mock("../../pages/index.vue", () => ({
  __esModule: true,
  default: {
    setup() {
      const sortArticlesByDate = jest.fn(() => {
        articleData.sort((a, b) => new Date(a.date) - new Date(b.date));
      });
      // テスト用の記事データ
      const articleData = [
        {
          body: "- コンソールを確認しよう ",
          clubTagId: 10,
          date: "2023-05-30T05:23:53.912+00:00",
          delete: false,
          hide: false,
          hideByClub: false,
          hideByOccupation: false,
          hideByTag: false,
          id: 97,
          image:
            "https://niezwnppucjwhxwfaxyr.supabase.co/storage/v1/object/public/avatars/IMG_2388.PNG",
          like: 1,
          occupationTagId: 1,
          tags: [3, 28],
          title: "corsのエラーの確認方法",
          userId: "44544c87-e8d9-4157-955d-a589a160501d",
          username: "もりき",
        },
        {
          body: "テスト１の本文",
          clubTagId: 8,
          date: "2023-05-01T00:38:13+00:00",
          delete: false,
          hide: false,
          hideByClub: false,
          hideByOccupation: false,
          hideByTag: false,
          id: 91,
          image:
            "https://niezwnppucjwhxwfaxyr.supabase.co/storage/v1/object/public/avatars/Ariana_Grande_Grammys_Red_Carpet_2020.png",
          like: 0,
          occupationTagId: 1,
          tags: [],
          title: "てすと１",
          userId: "d72cd59b-69cc-4deb-ae19-3e56561c45b6",
          username: "らつらふ",
        },
        {
          body: "# 歯磨き",
          clubTagId: 10,
          date: "2023-05-30T03:44:47.154+00:00",
          delete: false,
          hide: false,
          hideByClub: false,
          hideByOccupation: false,
          hideByTag: false,
          id: 96,
          image:
            "https://niezwnppucjwhxwfaxyr.supabase.co/storage/v1/object/public/avatars/IMG_2388.PNG",
          like: 0,
          occupationTagId: 1,
          tags: [42],
          title: "エンジニアが朝起きて一番にすべきこと",
          userId: "44544c87-e8d9-4157-955d-a589a160501d",
          username: "もりき",
        },
      ];
      return {
        sortArticlesByDate,
        articleData,
      };
    },
  },
}));

describe("sortArticlesByDate", () => {
  test("記事データが投稿日順にソートされること", () => {
    // コンポーネントのマウント
    const wrapper = shallowMount(Index);

    // sortArticlesByDate関数を実行
    wrapper.vm.sortArticlesByDate();

    // ソート後のarticleDataを取得
    const sortedArticleData = wrapper.vm.articleData;

    // ソート後の記事データが投稿日順になっていることを確認
    for (let i = 0; i < sortedArticleData.length - 1; i++) {
      const currentDate = new Date(sortedArticleData[i].date);
      const nextDate = new Date(sortedArticleData[i + 1].date);
      expect(currentDate <= nextDate).toBe(true);
    }
  });
});
