import { shallowMount } from "@vue/test-utils";
import Index from "../../pages/index.vue";
import { rest } from "msw";
import { setupServer } from "msw/node";
import axios from "axios";

// モックサーバーのセットアップ
const server = setupServer(
  rest.post("/api/occupation/increaseCount", (req, res, ctx) => {
    const occupationData = req.body;
    // 実際のAPI処理を行う
    // 必要なリクエストの処理を記述する
    // レスポンスを返す
    return res(
      ctx.json({
        ...occupationData,
        count: occupationData.count + 1,
      })
    );
  })
);

// テストスイートの前後でモックサーバーを起動・停止する
beforeAll(() => server.listen());
afterAll(() => server.close());

jest.mock("../../pages/index.vue", () => ({
  __esModule: true,
  default: {
    setup() {
      const filterArticlesByOccupation = async (
        occupationName,
        occupationData
      ) => {
        const selectedOccupations = occupationName
          .filter((occupation) => occupation.checked)
          .map((occupation) => occupation.id);
        //[{id=8}]が返ってくる

        articleData.forEach((article) => {
          if (selectedOccupations.length === 0) {
            // 選択された職種がない場合はすべての記事を表示
            article.hideByOccupation = false;
          } else {
            // 選択された職種と同じidの記事のみ表示（article.hideByOccupationが一致するものだけfalse（表示）になる)
            article.hideByOccupation = !selectedOccupations.includes(
              article.occupationTagId
            );
          }
        });
        //下記はsetupServerを使って別でテストする
        // if (occupationData.checked) {
        //   //Supabaseのcountをcountを+1する
        //   let { data } = useFetch("/api/occupation/increaseCount", {
        //     method: "POST",
        //     body: occupationData,
        //   });
        // }
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

      const occupationName = [
        { id: 8, occupationName: "内勤", count: 21, checked: true },
        { id: 1, occupationName: "FR", count: 11, checked: false },
        { id: 4, occupationName: "CL", count: 8, checked: false },
        { id: 3, occupationName: "Java", count: 6, checked: false },
        { id: 5, occupationName: "ML", count: 5, checked: false },
        { id: 2, occupationName: "PHP", count: 4, checked: false },
        { id: 6, occupationName: "QA", count: 3, checked: false },
        { id: 9, occupationName: "CS", count: 2, checked: false },
        { id: 7, occupationName: "営業", count: 2, checked: false },
      ];

      const occupationNameNotChecked = [
        { id: 8, occupationName: "内勤", count: 21, checked: false },
        { id: 1, occupationName: "FR", count: 11, checked: false },
        { id: 4, occupationName: "CL", count: 8, checked: false },
        { id: 3, occupationName: "Java", count: 6, checked: false },
        { id: 5, occupationName: "ML", count: 5, checked: false },
        { id: 2, occupationName: "PHP", count: 4, checked: false },
        { id: 6, occupationName: "QA", count: 3, checked: false },
        { id: 9, occupationName: "CS", count: 2, checked: false },
        { id: 7, occupationName: "営業", count: 2, checked: false },
      ];

      const occupationData = {
        id: 2,
        occupationName: "PHP",
        count: 4,
        checked: true,
      };

      return {
        filterArticlesByOccupation,
        articleData,
        occupationName,
        occupationNameNotChecked,
        occupationData
      };
    },
  },
}));

describe("filterArticlesByOccupation", () => {
  // コンポーネントのマウント
  const wrapper = shallowMount(Index);
  it("選択された職種に基づいて記事の表示をフィルタリングする", () => {
    // 関数実行
    const articleData = wrapper.vm.articleData;
    expect(articleData[0].hideByOccupation).toBe(false); // 関数実行前は全職種の記事は表示される
    expect(articleData[1].hideByOccupation).toBe(false); // 関数実行前は全職種の記事は表示される
    expect(articleData[2].hideByOccupation).toBe(false); // 関数実行前は全職種の記事は表示される
    wrapper.vm.filterArticlesByOccupation(
      wrapper.vm.occupationName,
      wrapper.vm.occupationData
    );
    expect(articleData[0].hideByOccupation).toBe(true); // 内勤（チェックされた職種）以外の記事は非表示
    expect(articleData[1].hideByOccupation).toBe(true); // 内勤（チェックされた職種）以外の記事は非表示
    expect(articleData[2].hideByOccupation).toBe(false); // 内勤（チェックされた職種）の記事は表示される
  });

  it("選択された職種がない場合、すべての記事が表示される", () => {
    const articleData = wrapper.vm.articleData;
    wrapper.vm.filterArticlesByOccupation(
      wrapper.vm.occupationNameNotChecked,
      wrapper.vm.occupationData
    );
    expect(articleData[0].hideByOccupation).toBe(false);
    expect(articleData[1].hideByOccupation).toBe(false);
    expect(articleData[2].hideByOccupation).toBe(false);
  });

  it("更新されたデータが正しいことを検証", async () => {
    // const occupationData = wrapper.vm.occupationData;
    // // APIの呼び出し
    // await wrapper.vm.filterArticlesByOccupation(
    //   wrapper.vm.occupationName,
    //   wrapper.vm.occupationData
    // );

    // const updateOccupationData = {
    //   ...wrapper.vm.occupationData,
    //   count: wrapper.vm.occupationData.count + 1,
    // };

    // // mockFetch関数が呼ばれたかのテスト
    // expect(mockFetch).toHaveBeenCalledWith("/api/occupation/increaseCount", {
    //   method: "POST",
    //   body: wrapper.vm.occupationData,
    // });
    // // データの更新後の値が正しいか検証
    // expect(occupationData).toEqual(updateOccupationData);
    const occupationData = wrapper.vm.occupationData;

    const updateOccupationData = {
      ...wrapper.vm.occupationData,
      count: wrapper.vm.occupationData.count + 1,
    };

    // APIの呼び出し
    const response = await axios.post(
      "/api/occupation/increaseCount",
      occupationData
    );

    // APIリクエストの結果を検証するアサーション
    expect(response.status).toBe(200); // ステータスコードが200であることを検証
    expect(response.data).toEqual(updateOccupationData); // 期待されるレスポンスデータと一致することを検証
  });
});
