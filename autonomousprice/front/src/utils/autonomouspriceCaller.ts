/** Wainting for @protobuf-ts/plugin
 * Massa Proto CLI can generate a method to call "play" function.
 */
export async function getPrice(): Promise<string> {
    return "current price is  000";
}

export async function setPrice(): Promise<string> {
    return "set new price : 111";
}

export async function getCurrentPrice(): Promise<string> {
    const random = Math.floor(Math.random() * 1000); //NOSONAR
    return `${random}`;
}
