export function getWaitingList(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['waitingList'], (data) => {
      if (data.waitingList) {
        resolve(data.waitingList as string[]);
      } else {
        resolve([]);
      }
    });
  });
}

export function setWaitingList(list: string[]) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ waitingList: list }, () => {
      resolve(true);
    });
  });
}

export function addToWaitList(identifier: string) {
  return new Promise(async (resolve, reject) => {
    const list = await getWaitingList();
    list.push(identifier);
    await setWaitingList(list);
    resolve(true);
  });
}

export function removeFromWaitList(identifier: string) {
  return new Promise(async (resolve, reject) => {
    const list = await getWaitingList();
    const newList = list.filter((item) => item !== identifier);
    await setWaitingList(newList);
    resolve(true);
  });
}
