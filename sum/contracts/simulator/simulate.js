import { execSync } from "child_process";
import { exit } from "process";

const TESTER_RELEASE_URL =
    "https://github.com/massalabs/massa-sc-tester/releases/download";
const VERSION = "v0.3.1";
let cmd;

if (process.argv[2] && process.argv[2] === "--install") {
    let fileName;
    switch (process.platform) {
        case "win32":
            fileName = "release_windows.zip";
            break;
        case "darwin":
            fileName = "release_macos.tar.gz";
            break;
        case "linux":
            fileName = "release_linux.tar.gz";
            break;
        default:
            console.error(`OS not supported`);
            exit(1);
    }

    const url = `${TESTER_RELEASE_URL}/${VERSION}/${fileName}`;

    let cmd;
    if (process.platform === "win32") {
        cmd = `powershell -Command "Invoke-WebRequest -Uri ${url} -OutFile ${fileName}"| Expand-Archive -Path ${fileName} -DestinationPath ./simulator`;
    } else {
        cmd = `wget -qO- ${url} | tar xz -C ./simulator --strip-components 1`;
    }

    execSync(cmd);

    exit(0);
}

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
