/** Wainting for @protobuf-ts/plugin
 * Massa Proto CLI can generate a method to call "sum" function.
 */
export async function sum(
    num1: number,
    num2: number,
    coins: number
): Promise<string> {
    return num1 + " + " + num2;
}
