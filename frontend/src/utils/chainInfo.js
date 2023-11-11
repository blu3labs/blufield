export const chainControl = (chain) => {
  try {
    let chainList = [97, undefined];

    if (chainList.includes(chain?.id)) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};




