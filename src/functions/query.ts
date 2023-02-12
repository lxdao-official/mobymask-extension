import { config } from '../config';
const queryCache = new Map();
async function lastBlock() {
  const res = await fetch(config.queryBaseUrl + '/graphql', {
    headers: {
      accept: '*/*',
      'content-type': 'application/json',
    },
    body: '{"variables":{},"query":"{\\n  latestBlock {\\n    hash\\n    number\\n    __typename\\n  }\\n}"}',
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
  });
  const data = await res.json();
  return data?.data?.latestBlock?.hash;
}
export async function checkPhisher(userId: string) {
  // return true;
  if (queryCache.has(userId)) {
    return queryCache.get(userId);
  }

  const blockHash = await lastBlock();
  const res = await fetch(config.queryBaseUrl + '/graphql', {
    headers: {
      accept: '*/*',
      'content-type': 'application/json',
    },
    body: `{"query":"query {\\n    isPhisher(\\n      blockHash: \\"${blockHash}\\"\\n      contractAddress: \\"0x1ca7c995f8eF0A2989BbcE08D5B7Efe50A584aa1\\"\\n      key0: \\"TWT:${userId}\\"\\n    ) {\\n      value\\n      proof {\\n        data\\n      }\\n    }}","variables":{}}`,
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
  });
  const data = await res.json();
  const result = data?.data?.isPhisher?.value || false;
  queryCache.set(userId, result);
  return result;
}
