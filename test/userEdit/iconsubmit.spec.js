import { mount } from '@vue/test-utils'
import UserEdit from "../../pages/userEdit/[id].vue";
import axios from 'axios';

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

  it('iconsubmitが正しく動作し、画像がアップロードされ、URLが取得され、データベースがアップデートされることを確認する', async () => {
    const mockFile = new File(["something"], "chill.png", { type: "image/png" });
    const credentials = { file: [{ file: mockFile }] };
    await wrapper.vm.iconsubmit(credentials);
    
    // jest.mockを呼び出した後でこの行を追加
    const { createClient } = require("@supabase/supabase-js");
    const client = createClient();
    // それからテスト内で以下のように呼び出す
    expect(wrapper.vm.iconeditbool).toBe(true);
    // 最初にupload()が呼び出されたときの引数を取得
    const firstCallArgs = client.storage.from().upload.mock.calls[0];
    // 最初の引数（filePath）が期待した値で始まっていることを検証
    expect(firstCallArgs[0]).toMatch(new RegExp('^' + $route.params.id));
    // 残りの引数が期待通りであることを検証
    expect(firstCallArgs.slice(1)).toEqual([mockFile]);
    expect(createClient().storage.from().getPublicUrl).toHaveBeenCalled();
    // upsertが呼び出されたことと、引数が正しいことを検証
    expect(client.from().upsert).toHaveBeenCalled();
    expect(client.from().upsert.mock.calls[0][0]).toEqual({
      id: $route.params.id,
      image: "test-url", // getPublicUrlのモックから返される値
    });
  });
});