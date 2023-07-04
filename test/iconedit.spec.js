import { mount } from '@vue/test-utils'
import UserEdit from "../pages/userEdit/[id].vue";

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
  it('calls iconedit method when the button is clicked', async () => {
    // ここでthis.$configのモックを設定する
    const $config = {
      public: {
        supabase: {
          // 適当なurlとkeyで行けるかも（早川）
          url: "https://niezwnppucjwhxwfaxyr.supabase.co",
          key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pZXp3bnBwdWNqd2h4d2ZheHlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ3MjkzNDAsImV4cCI6MjAwMDMwNTM0MH0.04tShAmtbz0zXhsyNQYo2fhcO2Tx0aQdI67Cg2f3BTo",
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
    console.log(wrapper.vm.iconeditbool)

    wrapper.vm.iconedit();
    expect(wrapper.vm.iconeditbool).toBe(true)
  })
})