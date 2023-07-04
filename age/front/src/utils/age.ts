/** Wainting for @protobuf-ts/plugin
 * Massa Proto CLI can generate a method to call "sum" function.
 */
export async function changeAge(name: string, age: number): Promise<string> {
    return "age set in blockchain";
}

export async function getAge(name: string): Promise<string> {
    return "age get in blockchain";
}
