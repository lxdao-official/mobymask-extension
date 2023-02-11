const queryCache = new Map();

export async function checkPhisher(userId: string) {
  return true;
  if (queryCache.has(userId)) {
    return queryCache.get(userId);
  }
  const res = await fetch('http://127.0.0.1:3001/graphql', {
    headers: {
      accept: '*/*',
      'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,fr;q=0.7,ja;q=0.6',
      'content-type': 'application/json',
      'sec-ch-ua':
        '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
    },
    referrer: 'http://127.0.0.1:3001/graphql',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: `{"query":"query {\\n    isPhisher(\\n      blockHash: \\"0x3e76a557da6cc05ad9f07dce5dbb4f0324a3f119378345935e02afe9a69352f3\\"\\n      contractAddress: \\"0x1ca7c995f8eF0A2989BbcE08D5B7Efe50A584aa1\\"\\n      key0: \\"TWT:${userId}\\"\\n    ) {\\n      value\\n      proof {\\n        data\\n      }\\n    }}","variables":{}}`,
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
  });
  const data = await res.json();
  const result = data?.data?.isPhisher?.value || false;
  queryCache.set(userId, result);
  return result;
}
