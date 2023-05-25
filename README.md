# MobyMask Extension

MobyMask is a lightweight, viral invite-based phishing report system with built-in accountability and revocation features. It's available at <https://mobymask.com>.

It is based on the [Delegatable Eth](https://github.com/danfinlay/delegatable-eth) framework, designed for making counterfactually mintable soulbound tokens (or off chain delegations).

This repository is dedicated to the Chrome Extension. For the UI repository, please visit: <https://github.com/delegatable/mobymask-ui>.

## How to develop locally?

1. `git clone` this repo.
2. Run `yarn install`.
3. Run `npm run build:dev` to create a development bundle and it connects to the backend API at `127.0.0.1`.
4. Run `npm run build` to create a production bundle.

After building the bundle, navigate to `chrome://extensions/`, turn on `Developer mode`, then click `Load unpacked` and choose the `./extensions` folder. Then you can start testing and using the extension locally.

## License

MIT

## Community

MobyMask Discord: <https://discord.gg/UBzChkFSUp>
