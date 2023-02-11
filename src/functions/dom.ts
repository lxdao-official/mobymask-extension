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
 <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="${svgClass}">
<path d="M0.817905 15C0.500406 15 0.265733 14.8611 0.113886 14.5833C-0.0379618 14.3056 -0.0379618 14.0278 0.113886 13.75L7.77527 0.416667C7.92712 0.138889 8.1687 0 8.5 0C8.8313 0 9.07288 0.138889 9.22473 0.416667L16.8861 13.75C17.038 14.0278 17.038 14.3056 16.8861 14.5833C16.7343 14.8611 16.4996 15 16.1821 15H0.817905ZM8.5 5.83333C8.26533 5.83333 8.06875 5.91306 7.91028 6.0725C7.75125 6.2325 7.67174 6.43056 7.67174 6.66667V9.16667C7.67174 9.40278 7.75125 9.60056 7.91028 9.76C8.06875 9.92 8.26533 10 8.5 10C8.73467 10 8.93152 9.92 9.09055 9.76C9.24902 9.60056 9.32826 9.40278 9.32826 9.16667V6.66667C9.32826 6.43056 9.24902 6.2325 9.09055 6.0725C8.93152 5.91306 8.73467 5.83333 8.5 5.83333ZM8.5 12.5C8.73467 12.5 8.93152 12.42 9.09055 12.26C9.24902 12.1006 9.32826 11.9028 9.32826 11.6667C9.32826 11.4306 9.24902 11.2328 9.09055 11.0733C8.93152 10.9133 8.73467 10.8333 8.5 10.8333C8.26533 10.8333 8.06875 10.9133 7.91028 11.0733C7.75125 11.2328 7.67174 11.4306 7.67174 11.6667C7.67174 11.9028 7.75125 12.1006 7.91028 12.26C8.06875 12.42 8.26533 12.5 8.5 12.5ZM2.24665 13.3333H14.7533L8.5 2.5L2.24665 13.3333Z" fill="black"/>
</svg>
`;

  twitterReportDOM.parentNode?.appendChild(mobyReportDOM);

  return mobyReportDOM;
}

export function getUserNameDOMs() {
  const userNameDOMs = document.querySelectorAll(
    'div[data-testid="User-Names"]:not([data-phisher-checked="1"])',
  );
  console.log('userNameDOMs', userNameDOMs);
  return userNameDOMs;
}

export function getUserId(userNameDOM: HTMLElement) {
  const userId = userNameDOM.innerHTML.match(/@([a-zA-Z0-9_-]+)/)?.[1];
  return userId;
}
const phisherIcon = `<svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="21" height="19" fill="url(#pattern0)"/>
<defs>
<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_65_9725" transform="matrix(0.0078125 0 0 0.00863487 0 -0.0526316)"/>
</pattern>
<image id="image0_65_9725" width="128" height="128" xlink:href="data:image/png;base64,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"/>
</defs>
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
        iconContainer.title = 'This user is a reported as phisher';
        userNameDOM.appendChild(iconContainer);

        userNameDOM.setAttribute('data-phisher', 'true');
      }
      userNameDOM.setAttribute('data-phisher-checked', '1');
    }
  }
}
