import { execSync } from "child_process";
import { exit } from "process";

const TESTER_RELEASE_URL =
    "https://github.com/massalabs/massa-sc-tester/releases/download";
const VERSION = "v0.3.2";

if (process.argv[2] && process.argv[2] === "--install") {
    let fileName = "release_";
    switch (process.platform) {
        case "win32":
            fileName += "windows.zip";
            break;
        case "darwin":
            if(process.arch === "amd64") {
                fileName += "macos-amd64.tar.gz";
            } else {
                fileName += "macos-arm64.tar.gz";
            }
            break;
        case "linux":
            fileName += "linux.tar.gz";
            break;
        default:
            console.error(`OS not supported`);
            exit(1);
    }

    const url = `${TESTER_RELEASE_URL}/${VERSION}/${fileName}`;

    let cmd;
    if (process.platform === "win32") {
        cmd = `curl ${url} -Lo ${fileName} && tar -xzf ${fileName} -C ./simulator --strip-components=1 && del ${fileName}`;
    } else {
        cmd = `curl ${url} -sL | tar xz -C ./simulator --strip-components 1`;
    }

    execSync(cmd);

    exit(0);
}

let cmd;
switch (process.platform) {
    case "win32":
        cmd = "cd simulator && massa-sc-tester.exe execution_config.json";
        break;
    case "darwin":
    case "linux":
        cmd = "cd simulator && ./massa-sc-tester execution_config.json";
        break;
    default:
        console.error(`OS not supported`);
        exit(1);
}
execSync(cmd);

console.log("Simulation successfully executed");
