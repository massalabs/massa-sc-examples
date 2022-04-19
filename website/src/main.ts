import { include_base64, print, Storage } from "massa-sc-std";

function createWebsite(): void {
    const bytes = include_base64('./site.zip');
    Storage.set_data("massa_web", bytes);
}

export function main(_args: string): i32 {
    createWebsite();
    print("Uploaded site");
    return 0;
}
