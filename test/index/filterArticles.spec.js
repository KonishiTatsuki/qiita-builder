import { shallowMount } from "@vue/test-utils";
import Index from "../../pages/index.vue";

jest.mock("../../pages/index.vue", () => ({
  __esModule: true,
  default: {
    setup() {
      const filterArticles = (searchParam) => {
        // 全ての記事を表示する場合はフィルタリングをスキップ
        if (!searchParam) {
          articleData.forEach((article) => (article.hide = false));
          return;
        }

        // 検索クエリを小文字に変換して、記事のタイトルや本文と照合する
        const query = searchParam.toLowerCase();

        articleData.forEach((article) => {
          const titleMatch = article.title.toLowerCase().includes(query);
          const bodyMatch = article.body.toLowerCase().includes(query);
          article.hide = !(titleMatch || bodyMatch);
        });
      };

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
          occupationTagId: 8,
          tags: [42],
          title: "エンジニアが朝起きて一番にすべきこと",
          userId: "44544c87-e8d9-4157-955d-a589a160501d",
          username: "もりき",
        },
      ];

      const searchParam = "エンジニア";

      return {
        filterArticles,
        articleData,
        searchParam,
      };
    },
  },
}));

describe("filterArticles", () => {
  // コンポーネントのマウント
  const wrapper = shallowMount(Index);
  it("検索されない場合は全記事表示", () => {
    const articleData = wrapper.vm.articleData;
    const filterArticles = wrapper.vm.filterArticles;
    filterArticles("");
    expect(articleData[0].hide).toBe(false);
    expect(articleData[1].hide).toBe(false);
    expect(articleData[2].hide).toBe(false);
  });

  it("検索された場合、Param内容を基に記事表示", () => {
    const articleData = wrapper.vm.articleData;
    const searchParam = wrapper.vm.searchParam;
    const filterArticles = wrapper.vm.filterArticles;
    filterArticles(searchParam);
    expect(articleData[0].hide).toBe(true);
    expect(articleData[1].hide).toBe(true);
    expect(articleData[2].hide).toBe(false);
  });
});
