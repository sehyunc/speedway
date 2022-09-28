// @generated by protobuf-ts 2.8.1 with parameter generate_dependencies,long_type_string
// @generated from protobuf file "bucket/where_is.proto" (package "sonrio.sonr.bucket", syntax proto3)
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
 * @generated from protobuf message sonrio.sonr.bucket.WhereIs
 */
export interface WhereIs {
    /**
     * DID of the created bucket.
     *
     * @generated from protobuf field: string did = 1;
     */
    did: string;
    /**
     * Creator of the new bucket
     *
     * @generated from protobuf field: string creator = 2;
     */
    creator: string;
    /**
     * Label of the new bucket.
     *
     * @generated from protobuf field: string label = 3;
     */
    label: string;
    /**
     * Visibility of the new bucket.
     *
     * @generated from protobuf field: sonrio.sonr.bucket.BucketVisibility visibility = 4;
     */
    visibility: BucketVisibility;
    /**
     * Role of the creator of the new bucket.
     *
     * @generated from protobuf field: sonrio.sonr.bucket.BucketRole role = 5;
     */
    role: BucketRole;
    /**
     * IsActive flag of the new bucket.
     *
     * @generated from protobuf field: bool is_active = 6;
     */
    isActive: boolean;
    /**
     * Content of the new bucket map of DIDs to CIDs.
     *
     * @generated from protobuf field: repeated sonrio.sonr.bucket.BucketItem content = 7;
     */
    content: BucketItem[];
    /**
     * JWKs of the new bucket.
     *
     * @generated from protobuf field: map<string, sonrio.sonr.bucket.AclJwks> content_acl = 8;
     */
    contentAcl: {
        [key: string]: AclJwks;
    };
    /**
     * Timestamp of the new bucket.
     *
     * @generated from protobuf field: int64 timestamp = 9;
     */
    timestamp: string;
}
/**
 * AclJwks is a map of JWKs for a given Schema
 *
 * @generated from protobuf message sonrio.sonr.bucket.AclJwks
 */
export interface AclJwks {
    /**
     * @generated from protobuf field: map<string, bytes> encrypted_jwks = 1;
     */
    encryptedJwks: {
        [key: string]: Uint8Array;
    };
}
/**
 * BucketItem is a pointer to a single piece of content in a bucket.
 *
 * @generated from protobuf message sonrio.sonr.bucket.BucketItem
 */
export interface BucketItem {
    /**
     * Name of the bucket item.
     *
     * @generated from protobuf field: string name = 1;
     */
    name: string;
    /**
     * DID of the item. If applicable // optional
     *
     * @generated from protobuf field: string uri = 2;
     */
    uri: string;
    /**
     * Timestamp of the last update. // optional
     *
     * @generated from protobuf field: int64 timestamp = 3;
     */
    timestamp: string;
    /**
     * Type of the resource
     *
     * @generated from protobuf field: sonrio.sonr.bucket.ResourceIdentifier type = 4;
     */
    type: ResourceIdentifier;
    /**
     * References the schema and item within the bucket is associated with.
     * Bucket items do not need to use the same schema if the bucket is "generic" // optional
     *
     * @generated from protobuf field: string schema_did = 5;
     */
    schemaDid: string;
}
/**
 * BucketRole is the role of the creator of the bucket.
 *
 * @generated from protobuf enum sonrio.sonr.bucket.BucketRole
 */
export enum BucketRole {
    /**
     * Bucket does not have role set.
     *
     * @generated from protobuf enum value: NONE = 0;
     */
    NONE = 0,
    /**
     * Bucket is visible to anyone.
     *
     * @generated from protobuf enum value: APPLICATION = 1;
     */
    APPLICATION = 1,
    /**
     * Bucket is visible to anyone who has access token.
     *
     * @generated from protobuf enum value: USER = 2;
     */
    USER = 2
}
/**
 * BucketVisibility is the visibility of the bucket to authorized users of an application
 *
 * @generated from protobuf enum sonrio.sonr.bucket.BucketVisibility
 */
export enum BucketVisibility {
    /**
     * Bucket does not have visibility set.
     *
     * @generated from protobuf enum value: UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Bucket is visible to anyone.
     *
     * @generated from protobuf enum value: PUBLIC = 1;
     */
    PUBLIC = 1,
    /**
     * Bucket is visible to anyone who has access token.
     *
     * @generated from protobuf enum value: PRIVATE = 2;
     */
    PRIVATE = 2
}
/**
 * @generated from protobuf enum sonrio.sonr.bucket.ResourceIdentifier
 */
export enum ResourceIdentifier {
    /**
     * @generated from protobuf enum value: None = 0;
     */
    None = 0,
    /**
     * @generated from protobuf enum value: DID = 1;
     */
    DID = 1,
    /**
     * @generated from protobuf enum value: CID = 2;
     */
    CID = 2
}
// @generated message type with reflection information, may provide speed optimized methods
class WhereIs$Type extends MessageType<WhereIs> {
    constructor() {
        super("sonrio.sonr.bucket.WhereIs", [
            { no: 1, name: "did", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "creator", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "label", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "visibility", kind: "enum", T: () => ["sonrio.sonr.bucket.BucketVisibility", BucketVisibility] },
            { no: 5, name: "role", kind: "enum", T: () => ["sonrio.sonr.bucket.BucketRole", BucketRole] },
            { no: 6, name: "is_active", kind: "scalar", T: 8 /*ScalarType.BOOL*/ },
            { no: 7, name: "content", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => BucketItem },
            { no: 8, name: "content_acl", kind: "map", K: 9 /*ScalarType.STRING*/, V: { kind: "message", T: () => AclJwks } },
            { no: 9, name: "timestamp", kind: "scalar", T: 3 /*ScalarType.INT64*/ }
        ]);
    }
    create(value?: PartialMessage<WhereIs>): WhereIs {
        const message = { did: "", creator: "", label: "", visibility: 0, role: 0, isActive: false, content: [], contentAcl: {}, timestamp: "0" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<WhereIs>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: WhereIs): WhereIs {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string did */ 1:
                    message.did = reader.string();
                    break;
                case /* string creator */ 2:
                    message.creator = reader.string();
                    break;
                case /* string label */ 3:
                    message.label = reader.string();
                    break;
                case /* sonrio.sonr.bucket.BucketVisibility visibility */ 4:
                    message.visibility = reader.int32();
                    break;
                case /* sonrio.sonr.bucket.BucketRole role */ 5:
                    message.role = reader.int32();
                    break;
                case /* bool is_active */ 6:
                    message.isActive = reader.bool();
                    break;
                case /* repeated sonrio.sonr.bucket.BucketItem content */ 7:
                    message.content.push(BucketItem.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* map<string, sonrio.sonr.bucket.AclJwks> content_acl */ 8:
                    this.binaryReadMap8(message.contentAcl, reader, options);
                    break;
                case /* int64 timestamp */ 9:
                    message.timestamp = reader.int64().toString();
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
    private binaryReadMap8(map: WhereIs["contentAcl"], reader: IBinaryReader, options: BinaryReadOptions): void {
        let len = reader.uint32(), end = reader.pos + len, key: keyof WhereIs["contentAcl"] | undefined, val: WhereIs["contentAcl"][any] | undefined;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case 1:
                    key = reader.string();
                    break;
                case 2:
                    val = AclJwks.internalBinaryRead(reader, reader.uint32(), options);
                    break;
                default: throw new globalThis.Error("unknown map entry field for field sonrio.sonr.bucket.WhereIs.content_acl");
            }
        }
        map[key ?? ""] = val ?? AclJwks.create();
    }
    internalBinaryWrite(message: WhereIs, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string did = 1; */
        if (message.did !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.did);
        /* string creator = 2; */
        if (message.creator !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.creator);
        /* string label = 3; */
        if (message.label !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.label);
        /* sonrio.sonr.bucket.BucketVisibility visibility = 4; */
        if (message.visibility !== 0)
            writer.tag(4, WireType.Varint).int32(message.visibility);
        /* sonrio.sonr.bucket.BucketRole role = 5; */
        if (message.role !== 0)
            writer.tag(5, WireType.Varint).int32(message.role);
        /* bool is_active = 6; */
        if (message.isActive !== false)
            writer.tag(6, WireType.Varint).bool(message.isActive);
        /* repeated sonrio.sonr.bucket.BucketItem content = 7; */
        for (let i = 0; i < message.content.length; i++)
            BucketItem.internalBinaryWrite(message.content[i], writer.tag(7, WireType.LengthDelimited).fork(), options).join();
        /* map<string, sonrio.sonr.bucket.AclJwks> content_acl = 8; */
        for (let k of Object.keys(message.contentAcl)) {
            writer.tag(8, WireType.LengthDelimited).fork().tag(1, WireType.LengthDelimited).string(k);
            writer.tag(2, WireType.LengthDelimited).fork();
            AclJwks.internalBinaryWrite(message.contentAcl[k], writer, options);
            writer.join().join();
        }
        /* int64 timestamp = 9; */
        if (message.timestamp !== "0")
            writer.tag(9, WireType.Varint).int64(message.timestamp);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message sonrio.sonr.bucket.WhereIs
 */
export const WhereIs = new WhereIs$Type();
// @generated message type with reflection information, may provide speed optimized methods
class AclJwks$Type extends MessageType<AclJwks> {
    constructor() {
        super("sonrio.sonr.bucket.AclJwks", [
            { no: 1, name: "encrypted_jwks", kind: "map", K: 9 /*ScalarType.STRING*/, V: { kind: "scalar", T: 12 /*ScalarType.BYTES*/ } }
        ]);
    }
    create(value?: PartialMessage<AclJwks>): AclJwks {
        const message = { encryptedJwks: {} };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<AclJwks>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: AclJwks): AclJwks {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* map<string, bytes> encrypted_jwks */ 1:
                    this.binaryReadMap1(message.encryptedJwks, reader, options);
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
    private binaryReadMap1(map: AclJwks["encryptedJwks"], reader: IBinaryReader, options: BinaryReadOptions): void {
        let len = reader.uint32(), end = reader.pos + len, key: keyof AclJwks["encryptedJwks"] | undefined, val: AclJwks["encryptedJwks"][any] | undefined;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case 1:
                    key = reader.string();
                    break;
                case 2:
                    val = reader.bytes();
                    break;
                default: throw new globalThis.Error("unknown map entry field for field sonrio.sonr.bucket.AclJwks.encrypted_jwks");
            }
        }
        map[key ?? ""] = val ?? new Uint8Array(0);
    }
    internalBinaryWrite(message: AclJwks, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* map<string, bytes> encrypted_jwks = 1; */
        for (let k of Object.keys(message.encryptedJwks))
            writer.tag(1, WireType.LengthDelimited).fork().tag(1, WireType.LengthDelimited).string(k).tag(2, WireType.LengthDelimited).bytes(message.encryptedJwks[k]).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message sonrio.sonr.bucket.AclJwks
 */
export const AclJwks = new AclJwks$Type();
// @generated message type with reflection information, may provide speed optimized methods
class BucketItem$Type extends MessageType<BucketItem> {
    constructor() {
        super("sonrio.sonr.bucket.BucketItem", [
            { no: 1, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "uri", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "timestamp", kind: "scalar", T: 3 /*ScalarType.INT64*/ },
            { no: 4, name: "type", kind: "enum", T: () => ["sonrio.sonr.bucket.ResourceIdentifier", ResourceIdentifier] },
            { no: 5, name: "schema_did", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<BucketItem>): BucketItem {
        const message = { name: "", uri: "", timestamp: "0", type: 0, schemaDid: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<BucketItem>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: BucketItem): BucketItem {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string name */ 1:
                    message.name = reader.string();
                    break;
                case /* string uri */ 2:
                    message.uri = reader.string();
                    break;
                case /* int64 timestamp */ 3:
                    message.timestamp = reader.int64().toString();
                    break;
                case /* sonrio.sonr.bucket.ResourceIdentifier type */ 4:
                    message.type = reader.int32();
                    break;
                case /* string schema_did */ 5:
                    message.schemaDid = reader.string();
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
    internalBinaryWrite(message: BucketItem, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string name = 1; */
        if (message.name !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.name);
        /* string uri = 2; */
        if (message.uri !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.uri);
        /* int64 timestamp = 3; */
        if (message.timestamp !== "0")
            writer.tag(3, WireType.Varint).int64(message.timestamp);
        /* sonrio.sonr.bucket.ResourceIdentifier type = 4; */
        if (message.type !== 0)
            writer.tag(4, WireType.Varint).int32(message.type);
        /* string schema_did = 5; */
        if (message.schemaDid !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.schemaDid);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message sonrio.sonr.bucket.BucketItem
 */
export const BucketItem = new BucketItem$Type();
