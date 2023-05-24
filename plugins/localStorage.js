// plugins/localStorage.js

export default (context, inject) => {
  // ローカルストレージに値を設定するメソッド
  // const setItem = (key, value) => {
  //   if (process.client) {
  //     localStorage.setItem(key, JSON.stringify(value))
  //   }
  // }

  // ローカルストレージから値を取得するメソッド
  const getItem = (key) => {
    if (process.client) {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    }
    return null;
  };

  // インジェクトしてコンテキスト内で使用できるようにする
  inject("localStorage", {
    //   setItem,
    getItem,
  });
};
