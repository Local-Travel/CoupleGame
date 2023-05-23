/**
 * 设置具备有效期的数据
 * @param key
 * @param data 数据
 * @param ms 毫秒数，默认1天
 */
export const setExpireData = (key, data, ms = 24 * 3600 * 1000) => {
  try {
    if (key) {
      const sData = {
        expire: Date.now() + ms,
        data,
      };
      const dataStr = JSON.stringify(sData);
	  uni.setStorageSync(key, dataStr);
    }
  } catch (e) {
    console.error(e);
  }
};

/**
 * 获取有效期数据
 * @param key
 * @returns
 */
export const getExpireData = (key) => {
  try {
    const dataStr = uni.getStorageSync(key);
	if (!dataStr) return dataStr;
	// console.log('dataStr', dataStr);
    const sData = JSON.parse(dataStr);
    const current = Date.now();
    if (sData && sData.expire) {
      if (current <= sData.expire) {
        return sData.data;
      }
	  uni.removeStorageSync(key);
    }
  } catch (e) {
    console.error(e);
  }
};