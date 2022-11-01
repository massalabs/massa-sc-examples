import { generateEvent } from "massa-sc-std";

export function main(_args: string): void {
    generateEvent("Hello world!");
}
