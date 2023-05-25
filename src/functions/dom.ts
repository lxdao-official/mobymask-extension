import { checkPhisher } from './query';

export function checkMenuDom() {
  const reportDom = document.querySelector(
    'div[data-testid="report"][role="menuitem"]',
  );
  if (reportDom) {
    return reportDom as HTMLElement;
  }
}

export function getMenuUserId(twitterReportDOM: HTMLElement) {
  const twitterUserName = (
    twitterReportDOM.parentNode as HTMLElement
  ).innerHTML.match(/@([a-zA-Z0-9_-]+)/)?.[1];
  return twitterUserName;
}

export function insertReportDOM(twitterReportDOM: HTMLElement) {
  const hasInjected =
    !!twitterReportDOM.parentNode?.querySelector('.moby-report-btn');
  if (hasInjected) return;

  const mobyReportDOM = twitterReportDOM.cloneNode(true) as HTMLElement;
  mobyReportDOM.className += ' moby-report-btn';
  const reportTextDOM = mobyReportDOM
    .querySelectorAll('div')[1]
    .querySelector('span');
  reportTextDOM && (reportTextDOM.innerHTML = 'Report as Scam');
  const reportIconDOM = mobyReportDOM.querySelectorAll('div')[0];
  const svgClass = reportIconDOM.querySelector('svg')?.getAttribute('class');
  reportIconDOM.innerHTML = `
 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="${svgClass}">
<circle cx="8" cy="8" r="7.25" fill="white" stroke="black" stroke-width="1.5"/>
<path d="M7.11108 10.6667H8.88886V12.4444H7.11108V10.6667ZM7.11108 3.55554H8.88886V8.88888H7.11108V3.55554Z" fill="#0F1419"/>
</svg>

`;

  twitterReportDOM.parentNode?.appendChild(mobyReportDOM);

  return mobyReportDOM;
}

export function getUserNameDOMs() {
  const userNamesDOMs = document.querySelectorAll(
    'div[data-testid="User-Name"]:not([data-phisher-checked="1"])',
  );
  const userNameDOM = document.querySelectorAll(
    'div[data-testid="UserName"]:not([data-phisher-checked="1"])',
  );
  return [...userNamesDOMs, ...userNameDOM];
}

export function getUserId(userNameDOM: HTMLElement) {
  const userId = userNameDOM.innerHTML.match(/@([a-zA-Z0-9_-]+)/)?.[1];
  return userId;
}
const phisherIcon = `<svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align:-2px;">
<path d="M0.817905 15C0.500406 15 0.265733 14.8611 0.113886 14.5833C-0.0379618 14.3056 -0.0379618 14.0278 0.113886 13.75L7.77527 0.416667C7.92712 0.138889 8.1687 0 8.5 0C8.8313 0 9.07288 0.138889 9.22473 0.416667L16.8861 13.75C17.038 14.0278 17.038 14.3056 16.8861 14.5833C16.7343 14.8611 16.4996 15 16.1821 15H0.817905ZM8.5 5.83333C8.26533 5.83333 8.06875 5.91306 7.91028 6.0725C7.75125 6.2325 7.67174 6.43056 7.67174 6.66667V9.16667C7.67174 9.40278 7.75125 9.60055 7.91028 9.76C8.06875 9.92 8.26533 10 8.5 10C8.73467 10 8.93152 9.92 9.09055 9.76C9.24902 9.60055 9.32826 9.40278 9.32826 9.16667V6.66667C9.32826 6.43056 9.24902 6.2325 9.09055 6.0725C8.93152 5.91306 8.73467 5.83333 8.5 5.83333ZM8.5 12.5C8.73467 12.5 8.93152 12.42 9.09055 12.26C9.24902 12.1006 9.32826 11.9028 9.32826 11.6667C9.32826 11.4306 9.24902 11.2328 9.09055 11.0733C8.93152 10.9133 8.73467 10.8333 8.5 10.8333C8.26533 10.8333 8.06875 10.9133 7.91028 11.0733C7.75125 11.2328 7.67174 11.4306 7.67174 11.6667C7.67174 11.9028 7.75125 12.1006 7.91028 12.26C8.06875 12.42 8.26533 12.5 8.5 12.5ZM2 13.5H15L8.5 2L2 13.5Z" fill="red"/>
</svg>
`;
export async function checkUserIds() {
  const userNameDOMs = getUserNameDOMs();
  for (let i = 0; i < userNameDOMs.length; i++) {
    const userNameDOM = userNameDOMs[i] as HTMLElement;
    const userId = getUserId(userNameDOM);
    if (userId) {
      const isPhisher = await checkPhisher(userId);
      if (isPhisher) {
        userNameDOM.style.color = 'red';
        const iconContainer = document.createElement('div');
        iconContainer.style.display = 'inline-block';
        iconContainer.style.marginLeft = '5px';
        iconContainer.innerHTML = phisherIcon;
        iconContainer.title = 'This user is reported as phisher by Mobymask';
        userNameDOM.appendChild(iconContainer);

        userNameDOM.setAttribute('data-phisher', 'true');
      }
      userNameDOM.setAttribute('data-phisher-checked', '1');
    }
  }
}
