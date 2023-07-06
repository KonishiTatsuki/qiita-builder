import { mount } from '@vue/test-utils'
import UserEdit from "../../pages/userEdit/[id].vue";

jest.mock("@supabase/supabase-js", () => {
  const mockUpload = jest.fn().mockResolvedValue({});
  const mockGetPublicUrl = jest.fn().mockResolvedValue({ data: { publicUrl: "test-url" }, error: null });
  const mockUpsert = jest.fn().mockResolvedValue({});

  return {
    createClient: jest.fn(() => ({
      from: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({
          data: [{
            username:"test-id",
            email:"test-id",
            detail:"test-id",
            qiitaToken:"test-id",
            occupation: {
              id: 1,
              occupationName: "test-id",
            },
            clubid: {
              id: 1,
              clubName: "test-id",
              display: true,
            },
          }],
        }),
        upsert: mockUpsert,
      }),
      channel: jest.fn().mockReturnValue({
        on: jest.fn().mockReturnThis(),
        subscribe: jest.fn(),
      }),
      storage: {
        from: jest.fn().mockReturnValue({
          upload: mockUpload,
          getPublicUrl: mockGetPublicUrl,
        }),
      },
    })),
  };
});

jest.mock('axios', () => ({
    default: {
        get: jest.fn()
            .mockResolvedValueOnce({ data: [{ clubName:"バレー",count:12,display:true,id:133 }] })
            .mockResolvedValueOnce({ data: [{ count:6,id:3,occupationName:"Java" }] }),
        post: jest.fn().mockResolvedValue({}),    
  }
}));

jest.mock("@formkit/core", () => ({
  submitForm: jest.fn(),
}));

describe('UserEdit', () => {
  const $config = {
    public: {
      supabase: {
        url: "test-url",
        key: "test-key",
      },
    },
  };
  const $route = {
    params: {
      id: "test-id",
    },
  };

  let wrapper = mount(UserEdit, {
      global: {
        plugins: [
          {
            install: (app) => {
              app.config.globalProperties.$config = $config;
              app.config.globalProperties.$route = $route;
            },
          },
        ],
      },
    });

    it('calls initialFetch on created lifecycle hook', () => {
    // Supabaseからの期待されるレスポンスデータ
    const expectedSupabaseData = [{
        username:"test-id",
        email:"test-id",
        detail:"test-id",
        qiitaToken:"test-id",
        occupation: {
        id: 1,
        occupationName: "test-id",
        },
        clubid: {
        id: 1,
        clubName: "test-id",
        display: true,
        },
    }];

    const { get } = require('axios').default;

    // Axiosからの期待されるレスポンスデータ
    const expectedClubData = [{ label: "その他", value: 0 },{ label:"バレー",value:133 }];
    const expectedOccupationData = [{ value:3,label:"Java" }];

    expect(wrapper.vm.data).toEqual(expectedSupabaseData);
    expect(wrapper.vm.club).toEqual(expectedClubData);
    expect(wrapper.vm.occupation).toEqual(expectedOccupationData);

    // axios.getが期待通りに呼び出されたことを確認
    expect(get).toHaveBeenCalledWith('/api/club/get');
    expect(get).toHaveBeenCalledWith('/api/occupation/get');
    });
});