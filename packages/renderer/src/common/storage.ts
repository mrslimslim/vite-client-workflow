
export const removeStorage = (name: string) => {
  try {
    localStorage.removeItem(name);
  } catch (e) {
    console.log(`removeStorage: Error removing key [${
      name
    }] from localStorage: ${
      JSON.stringify(e)}`);
    return false;
  }
  return true;
};
/*  getStorage: retrieves a key from localStorage previously set with setStorage().
  params:
      key <string> : localStorage key
  returns:
      <string> : value of localStorage key
      null : in case of expired key or failure
*/
export const getStorage = (key: string) : any => {
//   var now = Date.now(); //epoch time, lets deal only with integer
  // set expiration for storage
  if (key.includes('_expiresIn')) {
    try {
      const value = localStorage.getItem(key);
      return value;
    } catch (e) {
      return null;
    }
  }
  //   var expiresIn = Taro.getStorageSync(key + "_expiresIn");
  //   if (expiresIn === undefined || expiresIn === null) {
  //     expiresIn = 0;
  //   }
  try {
    const value = localStorage.getItem(key);
    return value;
  } catch (e) {
    console.log(`getStorage: Error reading key [${
      key
    }] from localStorage: ${
      JSON.stringify(e)}`);
    return null;
  }
  // if (expiresIn < now) {// Expired
  //     removeStorage(key);
  //     return null;
  // } else {
  //     try {
  //         var value = Taro.getStorageSync(key);
  //         return value;
  //     } catch(e) {
  //         console.log('getStorage: Error reading key ['+ key + '] from localStorage: ' + JSON.stringify(e) );
  //         return null;
  //     }
  // }
};

export const setStorage = (key: string, value: any) : boolean => {
//   if (expires === undefined || expires === null) {
//     expires = 24 * 60 * 60; // default: seconds for 1 day
//   } else {
//     expires = Math.abs(expires); //make sure it's positive
//   }

  //   var now = Date.now(); //millisecs since epoch time, lets deal only with integer
  //   var schedule = now + expires * 1000;
  try {
    localStorage.setItem(key, value);
    // Taro.setStorageSync(key + "_expiresIn", schedule);
  } catch (e) {
    console.log(`setStorage: Error setting key [${
      key
    }] in localStorage: ${
      JSON.stringify(e)}`);
    return false;
  }
  return true;
};
