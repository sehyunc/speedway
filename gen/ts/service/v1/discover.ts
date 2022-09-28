// @generated by protobuf-ts 2.8.1 with parameter generate_dependencies,long_type_string
// @generated from protobuf file "service/v1/discover.proto" (package "sonrio.motor.service.v1", syntax proto3)
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
import { Peer } from "../../common/v1/info";
/**
 * LobbyMessage is message passed from Peer in Lobby
 *
 * @generated from protobuf message sonrio.motor.service.v1.LobbyMessage
 */
export interface LobbyMessage {
    /**
     * @generated from protobuf field: sonrio.common.v1.Peer from = 1;
     */
    from?: Peer; // Users Peer Data
    /**
     * @generated from protobuf field: bytes body = 2;
     */
    body: Uint8Array; // Payload is the message data
    /**
     * @generated from protobuf field: bytes signature = 3;
     */
    signature: Uint8Array; // Signature of the Attached Data
    /**
     * @generated from protobuf field: int64 created_at = 4;
     */
    createdAt: string; // Timestamp
}
/**
 * @generated from protobuf message sonrio.motor.service.v1.RefreshEvent
 */
export interface RefreshEvent {
    /**
     * @generated from protobuf field: string topic_name = 1;
     */
    topicName: string;
    /**
     * @generated from protobuf field: repeated sonrio.common.v1.Peer peers = 2;
     */
    peers: Peer[];
    /**
     * @generated from protobuf field: int64 received_at = 3;
     */
    receivedAt: string;
}
// @generated message type with reflection information, may provide speed optimized methods
class LobbyMessage$Type extends MessageType<LobbyMessage> {
    constructor() {
        super("sonrio.motor.service.v1.LobbyMessage", [
            { no: 1, name: "from", kind: "message", T: () => Peer },
            { no: 2, name: "body", kind: "scalar", T: 12 /*ScalarType.BYTES*/ },
            { no: 3, name: "signature", kind: "scalar", T: 12 /*ScalarType.BYTES*/ },
            { no: 4, name: "created_at", kind: "scalar", T: 3 /*ScalarType.INT64*/ }
        ]);
    }
    create(value?: PartialMessage<LobbyMessage>): LobbyMessage {
        const message = { body: new Uint8Array(0), signature: new Uint8Array(0), createdAt: "0" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<LobbyMessage>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: LobbyMessage): LobbyMessage {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* sonrio.common.v1.Peer from */ 1:
                    message.from = Peer.internalBinaryRead(reader, reader.uint32(), options, message.from);
                    break;
                case /* bytes body */ 2:
                    message.body = reader.bytes();
                    break;
                case /* bytes signature */ 3:
                    message.signature = reader.bytes();
                    break;
                case /* int64 created_at */ 4:
                    message.createdAt = reader.int64().toString();
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
    internalBinaryWrite(message: LobbyMessage, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* sonrio.common.v1.Peer from = 1; */
        if (message.from)
            Peer.internalBinaryWrite(message.from, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* bytes body = 2; */
        if (message.body.length)
            writer.tag(2, WireType.LengthDelimited).bytes(message.body);
        /* bytes signature = 3; */
        if (message.signature.length)
            writer.tag(3, WireType.LengthDelimited).bytes(message.signature);
        /* int64 created_at = 4; */
        if (message.createdAt !== "0")
            writer.tag(4, WireType.Varint).int64(message.createdAt);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message sonrio.motor.service.v1.LobbyMessage
 */
export const LobbyMessage = new LobbyMessage$Type();
// @generated message type with reflection information, may provide speed optimized methods
class RefreshEvent$Type extends MessageType<RefreshEvent> {
    constructor() {
        super("sonrio.motor.service.v1.RefreshEvent", [
            { no: 1, name: "topic_name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "peers", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Peer },
            { no: 3, name: "received_at", kind: "scalar", T: 3 /*ScalarType.INT64*/ }
        ]);
    }
    create(value?: PartialMessage<RefreshEvent>): RefreshEvent {
        const message = { topicName: "", peers: [], receivedAt: "0" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<RefreshEvent>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: RefreshEvent): RefreshEvent {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string topic_name */ 1:
                    message.topicName = reader.string();
                    break;
                case /* repeated sonrio.common.v1.Peer peers */ 2:
                    message.peers.push(Peer.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case /* int64 received_at */ 3:
                    message.receivedAt = reader.int64().toString();
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
    internalBinaryWrite(message: RefreshEvent, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string topic_name = 1; */
        if (message.topicName !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.topicName);
        /* repeated sonrio.common.v1.Peer peers = 2; */
        for (let i = 0; i < message.peers.length; i++)
            Peer.internalBinaryWrite(message.peers[i], writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        /* int64 received_at = 3; */
        if (message.receivedAt !== "0")
            writer.tag(3, WireType.Varint).int64(message.receivedAt);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message sonrio.motor.service.v1.RefreshEvent
 */
export const RefreshEvent = new RefreshEvent$Type();
