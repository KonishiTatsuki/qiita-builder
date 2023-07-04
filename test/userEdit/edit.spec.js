import { mount } from '@vue/test-utils'
import UserEdit from "../../pages/userEdit/[id].vue";

jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(() => ({
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockResolvedValue({
      data: [{
        username:"test-id",
        email:"test-id",
        detail:"test-id",
        qiitaToken:"test-id",
        occupation: {
          id: "test-id",
          occupationName: "test-id",
        },
        clubid: {
          id: "test-id",
          clubName: "test-id",
          display: "test-id",
        },
      }],
    }),
    channel: jest.fn().mockReturnThis(),
    on: jest.fn().mockReturnThis(),
    subscribe: jest.fn(),
    storage: {
      from: jest.fn().mockReturnThis(),
      upload: jest.fn(),
      getPublicUrl: jest.fn().mockResolvedValue({ data: { publicUrl: "test-url" } }),
    },
  })),
}));

describe('UserEdit', () => {
  it('calls edit method when the button is clicked', async () => {
    // ここでthis.$configのモックを設定する
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

    const wrapper = mount(UserEdit, {
      // Provide を使って $config を設定する
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

    // 必要に応じて次の行を追加
    await wrapper.vm.$nextTick();

    // ここではfalse
    console.log(wrapper.vm.editbool)

    wrapper.vm.edit();
    expect(wrapper.vm.editbool).toBe(true)
  })
})