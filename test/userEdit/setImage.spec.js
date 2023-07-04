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

global.URL.createObjectURL = jest.fn();

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

    it('setImageが呼び出されると、avatarImageが適切にセットされることをテスト', () => {
        const mockFile = new File([""], "filename", { type: "image/png" });
        global.URL.createObjectURL.mockReturnValue("mock-file-url");
        console.log("1st",wrapper.vm.avatarImage)
        wrapper.vm.setImage([{ file: mockFile }]);
        console.log("2st",wrapper.vm.avatarImage)
        expect(global.URL.createObjectURL).toHaveBeenCalledWith(mockFile);
        expect(wrapper.vm.avatarImage).toBe("mock-file-url");
      });
});