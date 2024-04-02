import { Args, stringToBytes } from "@massalabs/as-types";
import {
  Address,
  Storage,
  Context,
  caller,
} from "@massalabs/massa-as-sdk";
import { AccessControl } from "@massalabs/massa-as-sdk/assembly/security";

const controller = new AccessControl<u8>(1);

const ADMIN = controller.newPermission("admin");
const USER = controller.newPermission("user");

export function constructor(argsSer: StaticArray<u8>): void {
  if (!Context.isDeployingContract()) {
    return;
  }

  const args = new Args(argsSer);
  const admin = new Address(args.nextString().unwrap());
  const user = new Address(args.nextString().unwrap());
  controller.grantPermission(ADMIN, admin);
  controller.grantPermission(USER, admin);
  controller.grantPermission(USER, user);
  Storage.set("admin", admin.toString());
}

export function changeAdmin(argsSer: StaticArray<u8>): void {
  const args = new Args(argsSer);
  const newAdmin = new Address(args.nextString().unwrap());
  controller.mustHavePermission(ADMIN, caller());
  controller.grantPermission(ADMIN, newAdmin);
  controller.revokePermission(ADMIN, caller());
  Storage.set("admin", newAdmin.toString());
}


export function getAdmin(): StaticArray<u8> {
  controller.mustHaveAnyPermission(USER | ADMIN, caller());
  return stringToBytes(Storage.get("admin"));
}
