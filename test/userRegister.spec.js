import { mount } from "@vue/test-utils";
import userRegister from "../pages/test/userRegisterCopy.vue";
import axios from "axios";

const credentials = {
  userName: "string",
  club: 1,
  detail: "string",
  email: "string",
  occupation: 1,
  image: "string",
  password: "string",
  password_confirm: "string",
  addClub: "string",
  file: [],
};

jest.mock("@supabase/supabase-js", () => {
  const mockUpload = jest.fn().mockResolvedValue({});
  const mockGetPublicUrl = jest
    .fn()
    .mockResolvedValue({ data: { publicUrl: "test-url" }, error: null });

  return {
    createClient: jest.fn(() => ({
      from: jest.fn().mockImplementation((tableName) => ({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        insert: jest.fn().mockReturnThis(),
        upsert: jest.fn().mockReturnThis(),
      })),
      auth: {
        signUp: jest.fn().mockResolvedValue({ data: { session: "あああ" } }), // 成功時の戻り値
      },
      storage: {
        from: jest.fn().mockReturnValue({
          upload: mockUpload,
          getPublicUrl: mockGetPublicUrl,
        }),
      },
    })),
  };
});

// vue-routerのmock
const mockPush = jest.fn();
jest.mock("vue-router", () => ({
  useRouter: () => {
    return {
      push: mockPush,
    };
  },
}));

jest.mock("axios");
describe("fetchData", () => {
  it("fetchData", async () => {
    // モックの作成
    const mockClubResponse = {
      data: [
        {
          id: 133,
          display: true,
          clubName: "バレー",
          count: 12,
          // label: "その他",
          // value: 0,
        },
        {
          id: 2,
          display: true,
          clubName: "サウナ",
          count: 6,
          // label: "その他",
          // value: 0,
        },
      ],
    };
    const mockOccupationResponse = {
      data: [
        { id: 2, occupationName: "PHP", count: 7 },
        { id: 3, occupationName: "Java", count: 4 },
      ],
    };

    axios.get.mockResolvedValueOnce(mockClubResponse); // axios.get("/api/club/get") のモックを設定
    axios.get.mockResolvedValueOnce(mockOccupationResponse); // axios.get("/api/occupation/get") のモックを設定

    const wrapper = mount(userRegister);
    await wrapper.vm.$nextTick();

    // fetchData メソッドを実行
    await wrapper.vm.fetchData();
    await wrapper.vm.$nextTick();

    // axios.get が2回呼ばれたことを確認
    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(axios.get).toHaveBeenCalledWith("/api/club/get");
    expect(axios.get).toHaveBeenCalledWith("/api/occupation/get");

    const mockClubResponseItem = [
      { label: "その他", value: 0 },
      { label: "バレー", value: 133 },
      { label: "サウナ", value: 2 },
    ];

    const mockOccupationResponseItem = [
      { label: "PHP", value: 2 },
      { label: "Java", value: 3 },
    ];
    //clubとoccupationの中身確認
    expect(wrapper.vm.club).toEqual(mockClubResponseItem);
    expect(wrapper.vm.occupation).toEqual(mockOccupationResponseItem);
  });
});

describe("selectClub", () => {
  it("selectClub", async () => {
    const wrapper = mount(userRegister);
    const credential = 0;

    await wrapper.vm.$nextTick();
    await wrapper.vm.selectClub(credential);
    expect(wrapper.vm.othersClub).toEqual(true);
  });
});

describe("submitRegister", () => {
  it("submitRegister", async () => {
    const wrapper = mount(userRegister);
    wrapper.vm.succes = true;

    await wrapper.vm.$nextTick();
    await wrapper.vm.submitRegister();
    expect(mockPush).toBeCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith("/");
  });
});

describe("connectQitta", () => {
  it("connectQitta", async () => {
    const wrapper = mount(userRegister);
    wrapper.vm.succes = true;

    await wrapper.vm.$nextTick();
    await wrapper.vm.connectQitta();
    expect(mockPush).toBeCalledTimes(2);
    expect(mockPush).toHaveBeenCalledWith("/qiitaCoordination");
  });
});

// describe("submitHandler", () => {
//   it("submitHandler", async () => {
//     const wrapper = mount(userRegister);
//     await wrapper.vm.$nextTick();

//     await wrapper.vm.submitHandler(credentials);
//     console.log(wrapper.vm.errormesssage);
//   });
// });
