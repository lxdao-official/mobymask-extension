import { clearWaitList, getWaitingList } from '../functions/storage';
import _ from 'lodash';
const phishers_key = 'pendingPhishers';

async function initPhishers() {
  const dapp_phishers_str = localStorage.getItem(phishers_key);
  const dapp_phishers = dapp_phishers_str ? JSON.parse(dapp_phishers_str) : [];

  const extension_phishers = await getWaitingList();
  const phishers = [
    ...dapp_phishers,
    ...extension_phishers.map((item) => {
      return { type: 'Twitter', name: item, status: 'Phisher' };
    }),
  ];

  localStorage.setItem(
    phishers_key,
    JSON.stringify(
      _.uniqBy(phishers, function (e) {
        return e.type + e.name + e.status;
      }),
    ),
  );
}

initPhishers();

document.addEventListener('clear_pendingPhishers', function () {
  clearWaitList();
});
