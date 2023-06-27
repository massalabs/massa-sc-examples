/** Wainting for @protobuf-ts/plugin
 * Massa Proto CLI can generate a method to call "sum" function.
 */
export async function sum(
    num1: bigint,
    num2: bigint,
    coins: bigint
): Promise<string> {
    return num1 + " + " + num2;
}
