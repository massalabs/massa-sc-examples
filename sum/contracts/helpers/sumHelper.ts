// @generated by protobuf-ts 2.9.0
// @generated from protobuf file "sum.proto" (syntax proto3)
// tslint:disable
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message sumHelper
 */
export interface sumHelper {
    /**
     * @generated from protobuf field: int64 a = 1;
     */
    a: bigint;
    /**
     * @generated from protobuf field: int64 b = 2;
     */
    b: bigint;
}
/**
 * @generated from protobuf message sumRHelper
 */
export interface sumRHelper {
    /**
     * @generated from protobuf field: int64 value = 1;
     */
    value: bigint;
}
// @generated message type with reflection information, may provide speed optimized methods
class sumHelper$Type extends MessageType<sumHelper> {
    constructor() {
        super("sumHelper", [
            { no: 1, name: "a", kind: "scalar", T: 3 /*ScalarType.INT64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 2, name: "b", kind: "scalar", T: 3 /*ScalarType.INT64*/, L: 0 /*LongType.BIGINT*/ }
        ]);
    }
    create(value?: PartialMessage<sumHelper>): sumHelper {
        const message = { a: 0n, b: 0n };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<sumHelper>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: sumHelper): sumHelper {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* int64 a */ 1:
                    message.a = reader.int64().toBigInt();
                    break;
                case /* int64 b */ 2:
                    message.b = reader.int64().toBigInt();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: sumHelper, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* int64 a = 1; */
        if (message.a !== 0n)
            writer.tag(1, WireType.Varint).int64(message.a);
        /* int64 b = 2; */
        if (message.b !== 0n)
            writer.tag(2, WireType.Varint).int64(message.b);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message sumHelper
 */
export const sumHelper = new sumHelper$Type();
// @generated message type with reflection information, may provide speed optimized methods
class sumRHelper$Type extends MessageType<sumRHelper> {
    constructor() {
        super("sumRHelper", [
            { no: 1, name: "value", kind: "scalar", T: 3 /*ScalarType.INT64*/, L: 0 /*LongType.BIGINT*/ }
        ]);
    }
    create(value?: PartialMessage<sumRHelper>): sumRHelper {
        const message = { value: 0n };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<sumRHelper>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: sumRHelper): sumRHelper {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* int64 value */ 1:
                    message.value = reader.int64().toBigInt();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: sumRHelper, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* int64 value = 1; */
        if (message.value !== 0n)
            writer.tag(1, WireType.Varint).int64(message.value);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message sumRHelper
 */
export const sumRHelper = new sumRHelper$Type();
