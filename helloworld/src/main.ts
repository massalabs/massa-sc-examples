import { generate_event } from "massa-sc-std";

export function main(_args: string): void {
    generate_event("Hello world!");
}
