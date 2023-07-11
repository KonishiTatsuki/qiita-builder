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

jest.mock("@formkit/core", () => ({
  submitForm: jest.fn(),
}));

describe('UserEdit', () => {
    let wrapper;
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

    beforeEach(() => {
        wrapper = mount(UserEdit, {
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
      });
      
      it('selectClubが0という引数で呼び出されると、othersClubがtrueになることをテスト', async () => {
        await wrapper.vm.$nextTick();
        wrapper.vm.selectClub(0);
        expect(wrapper.vm.othersClub).toBe(true);
      });
    
      it('selectClubが0以外の引数で呼び出されると、othersClubがfalseになることをテスト', async () => {
        await wrapper.vm.$nextTick();
        wrapper.vm.selectClub(1);
        expect(wrapper.vm.othersClub).toBe(false);
      });
})

