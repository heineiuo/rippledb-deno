/**
 * Copyright (c) 2018-present, heineiuo.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { varint } from "./DBHelper.ts";
import Slice from "./Slice.ts";
import { ValueType } from "./Format.ts";
import { Buffer } from "./Buffer.ts";
export default class LogRecord {
    static add(key: Slice, value: Slice): Slice {
        return new Slice(Buffer.concat([
            Buffer.fromUnknown([ValueType.kTypeValue]),
            Buffer.fromUnknown(varint.encode(key.length)),
            key.buffer,
            Buffer.fromUnknown(varint.encode(value.length)),
            value.buffer,
        ]));
    }
    static del(key: Slice): Slice {
        return new Slice(Buffer.concat([
            Buffer.fromUnknown([ValueType.kTypeDeletion]),
            Buffer.fromUnknown(varint.encode(key.length)),
            key.buffer,
        ]));
    }
}
