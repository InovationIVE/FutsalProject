
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Player
 * 
 */
export type Player = $Result.DefaultSelection<Prisma.$PlayerPayload>
/**
 * Model Goods
 * 
 */
export type Goods = $Result.DefaultSelection<Prisma.$GoodsPayload>
/**
 * Model Gacha
 * 
 */
export type Gacha = $Result.DefaultSelection<Prisma.$GachaPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Players
 * const players = await prisma.player.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Players
   * const players = await prisma.player.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.player`: Exposes CRUD operations for the **Player** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Players
    * const players = await prisma.player.findMany()
    * ```
    */
  get player(): Prisma.PlayerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.goods`: Exposes CRUD operations for the **Goods** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Goods
    * const goods = await prisma.goods.findMany()
    * ```
    */
  get goods(): Prisma.GoodsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.gacha`: Exposes CRUD operations for the **Gacha** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Gachas
    * const gachas = await prisma.gacha.findMany()
    * ```
    */
  get gacha(): Prisma.GachaDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.13.0
   * Query Engine version: 361e86d0ea4987e9f53a565309b3eed797a6bcbd
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Player: 'Player',
    Goods: 'Goods',
    Gacha: 'Gacha'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "player" | "goods" | "gacha"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Player: {
        payload: Prisma.$PlayerPayload<ExtArgs>
        fields: Prisma.PlayerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlayerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlayerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          findFirst: {
            args: Prisma.PlayerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlayerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          findMany: {
            args: Prisma.PlayerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          create: {
            args: Prisma.PlayerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          createMany: {
            args: Prisma.PlayerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PlayerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          update: {
            args: Prisma.PlayerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          deleteMany: {
            args: Prisma.PlayerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlayerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PlayerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          aggregate: {
            args: Prisma.PlayerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlayer>
          }
          groupBy: {
            args: Prisma.PlayerGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlayerGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlayerCountArgs<ExtArgs>
            result: $Utils.Optional<PlayerCountAggregateOutputType> | number
          }
        }
      }
      Goods: {
        payload: Prisma.$GoodsPayload<ExtArgs>
        fields: Prisma.GoodsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GoodsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GoodsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsPayload>
          }
          findFirst: {
            args: Prisma.GoodsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GoodsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsPayload>
          }
          findMany: {
            args: Prisma.GoodsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsPayload>[]
          }
          create: {
            args: Prisma.GoodsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsPayload>
          }
          createMany: {
            args: Prisma.GoodsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.GoodsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsPayload>
          }
          update: {
            args: Prisma.GoodsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsPayload>
          }
          deleteMany: {
            args: Prisma.GoodsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GoodsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GoodsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoodsPayload>
          }
          aggregate: {
            args: Prisma.GoodsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGoods>
          }
          groupBy: {
            args: Prisma.GoodsGroupByArgs<ExtArgs>
            result: $Utils.Optional<GoodsGroupByOutputType>[]
          }
          count: {
            args: Prisma.GoodsCountArgs<ExtArgs>
            result: $Utils.Optional<GoodsCountAggregateOutputType> | number
          }
        }
      }
      Gacha: {
        payload: Prisma.$GachaPayload<ExtArgs>
        fields: Prisma.GachaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GachaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GachaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GachaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GachaPayload>
          }
          findFirst: {
            args: Prisma.GachaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GachaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GachaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GachaPayload>
          }
          findMany: {
            args: Prisma.GachaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GachaPayload>[]
          }
          create: {
            args: Prisma.GachaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GachaPayload>
          }
          createMany: {
            args: Prisma.GachaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.GachaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GachaPayload>
          }
          update: {
            args: Prisma.GachaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GachaPayload>
          }
          deleteMany: {
            args: Prisma.GachaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GachaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GachaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GachaPayload>
          }
          aggregate: {
            args: Prisma.GachaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGacha>
          }
          groupBy: {
            args: Prisma.GachaGroupByArgs<ExtArgs>
            result: $Utils.Optional<GachaGroupByOutputType>[]
          }
          count: {
            args: Prisma.GachaCountArgs<ExtArgs>
            result: $Utils.Optional<GachaCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    player?: PlayerOmit
    goods?: GoodsOmit
    gacha?: GachaOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Player
   */

  export type AggregatePlayer = {
    _count: PlayerCountAggregateOutputType | null
    _avg: PlayerAvgAggregateOutputType | null
    _sum: PlayerSumAggregateOutputType | null
    _min: PlayerMinAggregateOutputType | null
    _max: PlayerMaxAggregateOutputType | null
  }

  export type PlayerAvgAggregateOutputType = {
    playerId: number | null
    speed: number | null
    attack: number | null
    defence: number | null
  }

  export type PlayerSumAggregateOutputType = {
    playerId: number | null
    speed: number | null
    attack: number | null
    defence: number | null
  }

  export type PlayerMinAggregateOutputType = {
    playerId: number | null
    soccerPlayerId: string | null
    name: string | null
    speed: number | null
    attack: number | null
    defence: number | null
    profileImage: string | null
    rarity: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlayerMaxAggregateOutputType = {
    playerId: number | null
    soccerPlayerId: string | null
    name: string | null
    speed: number | null
    attack: number | null
    defence: number | null
    profileImage: string | null
    rarity: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlayerCountAggregateOutputType = {
    playerId: number
    soccerPlayerId: number
    name: number
    speed: number
    attack: number
    defence: number
    profileImage: number
    rarity: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PlayerAvgAggregateInputType = {
    playerId?: true
    speed?: true
    attack?: true
    defence?: true
  }

  export type PlayerSumAggregateInputType = {
    playerId?: true
    speed?: true
    attack?: true
    defence?: true
  }

  export type PlayerMinAggregateInputType = {
    playerId?: true
    soccerPlayerId?: true
    name?: true
    speed?: true
    attack?: true
    defence?: true
    profileImage?: true
    rarity?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlayerMaxAggregateInputType = {
    playerId?: true
    soccerPlayerId?: true
    name?: true
    speed?: true
    attack?: true
    defence?: true
    profileImage?: true
    rarity?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlayerCountAggregateInputType = {
    playerId?: true
    soccerPlayerId?: true
    name?: true
    speed?: true
    attack?: true
    defence?: true
    profileImage?: true
    rarity?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PlayerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Player to aggregate.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Players
    **/
    _count?: true | PlayerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlayerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlayerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlayerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlayerMaxAggregateInputType
  }

  export type GetPlayerAggregateType<T extends PlayerAggregateArgs> = {
        [P in keyof T & keyof AggregatePlayer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlayer[P]>
      : GetScalarType<T[P], AggregatePlayer[P]>
  }




  export type PlayerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlayerWhereInput
    orderBy?: PlayerOrderByWithAggregationInput | PlayerOrderByWithAggregationInput[]
    by: PlayerScalarFieldEnum[] | PlayerScalarFieldEnum
    having?: PlayerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlayerCountAggregateInputType | true
    _avg?: PlayerAvgAggregateInputType
    _sum?: PlayerSumAggregateInputType
    _min?: PlayerMinAggregateInputType
    _max?: PlayerMaxAggregateInputType
  }

  export type PlayerGroupByOutputType = {
    playerId: number
    soccerPlayerId: string
    name: string
    speed: number
    attack: number
    defence: number
    profileImage: string | null
    rarity: string
    createdAt: Date
    updatedAt: Date
    _count: PlayerCountAggregateOutputType | null
    _avg: PlayerAvgAggregateOutputType | null
    _sum: PlayerSumAggregateOutputType | null
    _min: PlayerMinAggregateOutputType | null
    _max: PlayerMaxAggregateOutputType | null
  }

  type GetPlayerGroupByPayload<T extends PlayerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlayerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlayerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlayerGroupByOutputType[P]>
            : GetScalarType<T[P], PlayerGroupByOutputType[P]>
        }
      >
    >


  export type PlayerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    playerId?: boolean
    soccerPlayerId?: boolean
    name?: boolean
    speed?: boolean
    attack?: boolean
    defence?: boolean
    profileImage?: boolean
    rarity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["player"]>



  export type PlayerSelectScalar = {
    playerId?: boolean
    soccerPlayerId?: boolean
    name?: boolean
    speed?: boolean
    attack?: boolean
    defence?: boolean
    profileImage?: boolean
    rarity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PlayerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"playerId" | "soccerPlayerId" | "name" | "speed" | "attack" | "defence" | "profileImage" | "rarity" | "createdAt" | "updatedAt", ExtArgs["result"]["player"]>

  export type $PlayerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Player"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      playerId: number
      soccerPlayerId: string
      name: string
      speed: number
      attack: number
      defence: number
      profileImage: string | null
      rarity: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["player"]>
    composites: {}
  }

  type PlayerGetPayload<S extends boolean | null | undefined | PlayerDefaultArgs> = $Result.GetResult<Prisma.$PlayerPayload, S>

  type PlayerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlayerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlayerCountAggregateInputType | true
    }

  export interface PlayerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Player'], meta: { name: 'Player' } }
    /**
     * Find zero or one Player that matches the filter.
     * @param {PlayerFindUniqueArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlayerFindUniqueArgs>(args: SelectSubset<T, PlayerFindUniqueArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Player that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlayerFindUniqueOrThrowArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlayerFindUniqueOrThrowArgs>(args: SelectSubset<T, PlayerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Player that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindFirstArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlayerFindFirstArgs>(args?: SelectSubset<T, PlayerFindFirstArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Player that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindFirstOrThrowArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlayerFindFirstOrThrowArgs>(args?: SelectSubset<T, PlayerFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Players that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Players
     * const players = await prisma.player.findMany()
     * 
     * // Get first 10 Players
     * const players = await prisma.player.findMany({ take: 10 })
     * 
     * // Only select the `playerId`
     * const playerWithPlayerIdOnly = await prisma.player.findMany({ select: { playerId: true } })
     * 
     */
    findMany<T extends PlayerFindManyArgs>(args?: SelectSubset<T, PlayerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Player.
     * @param {PlayerCreateArgs} args - Arguments to create a Player.
     * @example
     * // Create one Player
     * const Player = await prisma.player.create({
     *   data: {
     *     // ... data to create a Player
     *   }
     * })
     * 
     */
    create<T extends PlayerCreateArgs>(args: SelectSubset<T, PlayerCreateArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Players.
     * @param {PlayerCreateManyArgs} args - Arguments to create many Players.
     * @example
     * // Create many Players
     * const player = await prisma.player.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlayerCreateManyArgs>(args?: SelectSubset<T, PlayerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Player.
     * @param {PlayerDeleteArgs} args - Arguments to delete one Player.
     * @example
     * // Delete one Player
     * const Player = await prisma.player.delete({
     *   where: {
     *     // ... filter to delete one Player
     *   }
     * })
     * 
     */
    delete<T extends PlayerDeleteArgs>(args: SelectSubset<T, PlayerDeleteArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Player.
     * @param {PlayerUpdateArgs} args - Arguments to update one Player.
     * @example
     * // Update one Player
     * const player = await prisma.player.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlayerUpdateArgs>(args: SelectSubset<T, PlayerUpdateArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Players.
     * @param {PlayerDeleteManyArgs} args - Arguments to filter Players to delete.
     * @example
     * // Delete a few Players
     * const { count } = await prisma.player.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlayerDeleteManyArgs>(args?: SelectSubset<T, PlayerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Players.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Players
     * const player = await prisma.player.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlayerUpdateManyArgs>(args: SelectSubset<T, PlayerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Player.
     * @param {PlayerUpsertArgs} args - Arguments to update or create a Player.
     * @example
     * // Update or create a Player
     * const player = await prisma.player.upsert({
     *   create: {
     *     // ... data to create a Player
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Player we want to update
     *   }
     * })
     */
    upsert<T extends PlayerUpsertArgs>(args: SelectSubset<T, PlayerUpsertArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Players.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerCountArgs} args - Arguments to filter Players to count.
     * @example
     * // Count the number of Players
     * const count = await prisma.player.count({
     *   where: {
     *     // ... the filter for the Players we want to count
     *   }
     * })
    **/
    count<T extends PlayerCountArgs>(
      args?: Subset<T, PlayerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlayerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Player.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlayerAggregateArgs>(args: Subset<T, PlayerAggregateArgs>): Prisma.PrismaPromise<GetPlayerAggregateType<T>>

    /**
     * Group by Player.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlayerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlayerGroupByArgs['orderBy'] }
        : { orderBy?: PlayerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlayerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlayerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Player model
   */
  readonly fields: PlayerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Player.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlayerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Player model
   */
  interface PlayerFieldRefs {
    readonly playerId: FieldRef<"Player", 'Int'>
    readonly soccerPlayerId: FieldRef<"Player", 'String'>
    readonly name: FieldRef<"Player", 'String'>
    readonly speed: FieldRef<"Player", 'Int'>
    readonly attack: FieldRef<"Player", 'Int'>
    readonly defence: FieldRef<"Player", 'Int'>
    readonly profileImage: FieldRef<"Player", 'String'>
    readonly rarity: FieldRef<"Player", 'String'>
    readonly createdAt: FieldRef<"Player", 'DateTime'>
    readonly updatedAt: FieldRef<"Player", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Player findUnique
   */
  export type PlayerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player findUniqueOrThrow
   */
  export type PlayerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player findFirst
   */
  export type PlayerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Players.
     */
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player findFirstOrThrow
   */
  export type PlayerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Players.
     */
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player findMany
   */
  export type PlayerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Filter, which Players to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player create
   */
  export type PlayerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * The data needed to create a Player.
     */
    data: XOR<PlayerCreateInput, PlayerUncheckedCreateInput>
  }

  /**
   * Player createMany
   */
  export type PlayerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Players.
     */
    data: PlayerCreateManyInput | PlayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Player update
   */
  export type PlayerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * The data needed to update a Player.
     */
    data: XOR<PlayerUpdateInput, PlayerUncheckedUpdateInput>
    /**
     * Choose, which Player to update.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player updateMany
   */
  export type PlayerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Players.
     */
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyInput>
    /**
     * Filter which Players to update
     */
    where?: PlayerWhereInput
    /**
     * Limit how many Players to update.
     */
    limit?: number
  }

  /**
   * Player upsert
   */
  export type PlayerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * The filter to search for the Player to update in case it exists.
     */
    where: PlayerWhereUniqueInput
    /**
     * In case the Player found by the `where` argument doesn't exist, create a new Player with this data.
     */
    create: XOR<PlayerCreateInput, PlayerUncheckedCreateInput>
    /**
     * In case the Player was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlayerUpdateInput, PlayerUncheckedUpdateInput>
  }

  /**
   * Player delete
   */
  export type PlayerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Filter which Player to delete.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player deleteMany
   */
  export type PlayerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Players to delete
     */
    where?: PlayerWhereInput
    /**
     * Limit how many Players to delete.
     */
    limit?: number
  }

  /**
   * Player without action
   */
  export type PlayerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
  }


  /**
   * Model Goods
   */

  export type AggregateGoods = {
    _count: GoodsCountAggregateOutputType | null
    _avg: GoodsAvgAggregateOutputType | null
    _sum: GoodsSumAggregateOutputType | null
    _min: GoodsMinAggregateOutputType | null
    _max: GoodsMaxAggregateOutputType | null
  }

  export type GoodsAvgAggregateOutputType = {
    goodsId: number | null
    cashAmount: number | null
  }

  export type GoodsSumAggregateOutputType = {
    goodsId: number | null
    cashAmount: number | null
  }

  export type GoodsMinAggregateOutputType = {
    goodsId: number | null
    name: string | null
    cashAmount: number | null
  }

  export type GoodsMaxAggregateOutputType = {
    goodsId: number | null
    name: string | null
    cashAmount: number | null
  }

  export type GoodsCountAggregateOutputType = {
    goodsId: number
    name: number
    cashAmount: number
    _all: number
  }


  export type GoodsAvgAggregateInputType = {
    goodsId?: true
    cashAmount?: true
  }

  export type GoodsSumAggregateInputType = {
    goodsId?: true
    cashAmount?: true
  }

  export type GoodsMinAggregateInputType = {
    goodsId?: true
    name?: true
    cashAmount?: true
  }

  export type GoodsMaxAggregateInputType = {
    goodsId?: true
    name?: true
    cashAmount?: true
  }

  export type GoodsCountAggregateInputType = {
    goodsId?: true
    name?: true
    cashAmount?: true
    _all?: true
  }

  export type GoodsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Goods to aggregate.
     */
    where?: GoodsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Goods to fetch.
     */
    orderBy?: GoodsOrderByWithRelationInput | GoodsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GoodsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Goods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Goods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Goods
    **/
    _count?: true | GoodsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GoodsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GoodsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GoodsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GoodsMaxAggregateInputType
  }

  export type GetGoodsAggregateType<T extends GoodsAggregateArgs> = {
        [P in keyof T & keyof AggregateGoods]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGoods[P]>
      : GetScalarType<T[P], AggregateGoods[P]>
  }




  export type GoodsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GoodsWhereInput
    orderBy?: GoodsOrderByWithAggregationInput | GoodsOrderByWithAggregationInput[]
    by: GoodsScalarFieldEnum[] | GoodsScalarFieldEnum
    having?: GoodsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GoodsCountAggregateInputType | true
    _avg?: GoodsAvgAggregateInputType
    _sum?: GoodsSumAggregateInputType
    _min?: GoodsMinAggregateInputType
    _max?: GoodsMaxAggregateInputType
  }

  export type GoodsGroupByOutputType = {
    goodsId: number
    name: string
    cashAmount: number
    _count: GoodsCountAggregateOutputType | null
    _avg: GoodsAvgAggregateOutputType | null
    _sum: GoodsSumAggregateOutputType | null
    _min: GoodsMinAggregateOutputType | null
    _max: GoodsMaxAggregateOutputType | null
  }

  type GetGoodsGroupByPayload<T extends GoodsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GoodsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GoodsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GoodsGroupByOutputType[P]>
            : GetScalarType<T[P], GoodsGroupByOutputType[P]>
        }
      >
    >


  export type GoodsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    goodsId?: boolean
    name?: boolean
    cashAmount?: boolean
  }, ExtArgs["result"]["goods"]>



  export type GoodsSelectScalar = {
    goodsId?: boolean
    name?: boolean
    cashAmount?: boolean
  }

  export type GoodsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"goodsId" | "name" | "cashAmount", ExtArgs["result"]["goods"]>

  export type $GoodsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Goods"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      goodsId: number
      name: string
      cashAmount: number
    }, ExtArgs["result"]["goods"]>
    composites: {}
  }

  type GoodsGetPayload<S extends boolean | null | undefined | GoodsDefaultArgs> = $Result.GetResult<Prisma.$GoodsPayload, S>

  type GoodsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GoodsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GoodsCountAggregateInputType | true
    }

  export interface GoodsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Goods'], meta: { name: 'Goods' } }
    /**
     * Find zero or one Goods that matches the filter.
     * @param {GoodsFindUniqueArgs} args - Arguments to find a Goods
     * @example
     * // Get one Goods
     * const goods = await prisma.goods.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GoodsFindUniqueArgs>(args: SelectSubset<T, GoodsFindUniqueArgs<ExtArgs>>): Prisma__GoodsClient<$Result.GetResult<Prisma.$GoodsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Goods that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GoodsFindUniqueOrThrowArgs} args - Arguments to find a Goods
     * @example
     * // Get one Goods
     * const goods = await prisma.goods.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GoodsFindUniqueOrThrowArgs>(args: SelectSubset<T, GoodsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GoodsClient<$Result.GetResult<Prisma.$GoodsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Goods that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsFindFirstArgs} args - Arguments to find a Goods
     * @example
     * // Get one Goods
     * const goods = await prisma.goods.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GoodsFindFirstArgs>(args?: SelectSubset<T, GoodsFindFirstArgs<ExtArgs>>): Prisma__GoodsClient<$Result.GetResult<Prisma.$GoodsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Goods that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsFindFirstOrThrowArgs} args - Arguments to find a Goods
     * @example
     * // Get one Goods
     * const goods = await prisma.goods.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GoodsFindFirstOrThrowArgs>(args?: SelectSubset<T, GoodsFindFirstOrThrowArgs<ExtArgs>>): Prisma__GoodsClient<$Result.GetResult<Prisma.$GoodsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Goods that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Goods
     * const goods = await prisma.goods.findMany()
     * 
     * // Get first 10 Goods
     * const goods = await prisma.goods.findMany({ take: 10 })
     * 
     * // Only select the `goodsId`
     * const goodsWithGoodsIdOnly = await prisma.goods.findMany({ select: { goodsId: true } })
     * 
     */
    findMany<T extends GoodsFindManyArgs>(args?: SelectSubset<T, GoodsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoodsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Goods.
     * @param {GoodsCreateArgs} args - Arguments to create a Goods.
     * @example
     * // Create one Goods
     * const Goods = await prisma.goods.create({
     *   data: {
     *     // ... data to create a Goods
     *   }
     * })
     * 
     */
    create<T extends GoodsCreateArgs>(args: SelectSubset<T, GoodsCreateArgs<ExtArgs>>): Prisma__GoodsClient<$Result.GetResult<Prisma.$GoodsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Goods.
     * @param {GoodsCreateManyArgs} args - Arguments to create many Goods.
     * @example
     * // Create many Goods
     * const goods = await prisma.goods.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GoodsCreateManyArgs>(args?: SelectSubset<T, GoodsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Goods.
     * @param {GoodsDeleteArgs} args - Arguments to delete one Goods.
     * @example
     * // Delete one Goods
     * const Goods = await prisma.goods.delete({
     *   where: {
     *     // ... filter to delete one Goods
     *   }
     * })
     * 
     */
    delete<T extends GoodsDeleteArgs>(args: SelectSubset<T, GoodsDeleteArgs<ExtArgs>>): Prisma__GoodsClient<$Result.GetResult<Prisma.$GoodsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Goods.
     * @param {GoodsUpdateArgs} args - Arguments to update one Goods.
     * @example
     * // Update one Goods
     * const goods = await prisma.goods.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GoodsUpdateArgs>(args: SelectSubset<T, GoodsUpdateArgs<ExtArgs>>): Prisma__GoodsClient<$Result.GetResult<Prisma.$GoodsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Goods.
     * @param {GoodsDeleteManyArgs} args - Arguments to filter Goods to delete.
     * @example
     * // Delete a few Goods
     * const { count } = await prisma.goods.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GoodsDeleteManyArgs>(args?: SelectSubset<T, GoodsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Goods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Goods
     * const goods = await prisma.goods.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GoodsUpdateManyArgs>(args: SelectSubset<T, GoodsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Goods.
     * @param {GoodsUpsertArgs} args - Arguments to update or create a Goods.
     * @example
     * // Update or create a Goods
     * const goods = await prisma.goods.upsert({
     *   create: {
     *     // ... data to create a Goods
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Goods we want to update
     *   }
     * })
     */
    upsert<T extends GoodsUpsertArgs>(args: SelectSubset<T, GoodsUpsertArgs<ExtArgs>>): Prisma__GoodsClient<$Result.GetResult<Prisma.$GoodsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Goods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsCountArgs} args - Arguments to filter Goods to count.
     * @example
     * // Count the number of Goods
     * const count = await prisma.goods.count({
     *   where: {
     *     // ... the filter for the Goods we want to count
     *   }
     * })
    **/
    count<T extends GoodsCountArgs>(
      args?: Subset<T, GoodsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GoodsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Goods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GoodsAggregateArgs>(args: Subset<T, GoodsAggregateArgs>): Prisma.PrismaPromise<GetGoodsAggregateType<T>>

    /**
     * Group by Goods.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoodsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GoodsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GoodsGroupByArgs['orderBy'] }
        : { orderBy?: GoodsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GoodsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGoodsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Goods model
   */
  readonly fields: GoodsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Goods.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GoodsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Goods model
   */
  interface GoodsFieldRefs {
    readonly goodsId: FieldRef<"Goods", 'Int'>
    readonly name: FieldRef<"Goods", 'String'>
    readonly cashAmount: FieldRef<"Goods", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Goods findUnique
   */
  export type GoodsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goods
     */
    select?: GoodsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goods
     */
    omit?: GoodsOmit<ExtArgs> | null
    /**
     * Filter, which Goods to fetch.
     */
    where: GoodsWhereUniqueInput
  }

  /**
   * Goods findUniqueOrThrow
   */
  export type GoodsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goods
     */
    select?: GoodsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goods
     */
    omit?: GoodsOmit<ExtArgs> | null
    /**
     * Filter, which Goods to fetch.
     */
    where: GoodsWhereUniqueInput
  }

  /**
   * Goods findFirst
   */
  export type GoodsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goods
     */
    select?: GoodsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goods
     */
    omit?: GoodsOmit<ExtArgs> | null
    /**
     * Filter, which Goods to fetch.
     */
    where?: GoodsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Goods to fetch.
     */
    orderBy?: GoodsOrderByWithRelationInput | GoodsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Goods.
     */
    cursor?: GoodsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Goods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Goods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Goods.
     */
    distinct?: GoodsScalarFieldEnum | GoodsScalarFieldEnum[]
  }

  /**
   * Goods findFirstOrThrow
   */
  export type GoodsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goods
     */
    select?: GoodsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goods
     */
    omit?: GoodsOmit<ExtArgs> | null
    /**
     * Filter, which Goods to fetch.
     */
    where?: GoodsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Goods to fetch.
     */
    orderBy?: GoodsOrderByWithRelationInput | GoodsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Goods.
     */
    cursor?: GoodsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Goods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Goods.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Goods.
     */
    distinct?: GoodsScalarFieldEnum | GoodsScalarFieldEnum[]
  }

  /**
   * Goods findMany
   */
  export type GoodsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goods
     */
    select?: GoodsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goods
     */
    omit?: GoodsOmit<ExtArgs> | null
    /**
     * Filter, which Goods to fetch.
     */
    where?: GoodsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Goods to fetch.
     */
    orderBy?: GoodsOrderByWithRelationInput | GoodsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Goods.
     */
    cursor?: GoodsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Goods from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Goods.
     */
    skip?: number
    distinct?: GoodsScalarFieldEnum | GoodsScalarFieldEnum[]
  }

  /**
   * Goods create
   */
  export type GoodsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goods
     */
    select?: GoodsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goods
     */
    omit?: GoodsOmit<ExtArgs> | null
    /**
     * The data needed to create a Goods.
     */
    data: XOR<GoodsCreateInput, GoodsUncheckedCreateInput>
  }

  /**
   * Goods createMany
   */
  export type GoodsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Goods.
     */
    data: GoodsCreateManyInput | GoodsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Goods update
   */
  export type GoodsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goods
     */
    select?: GoodsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goods
     */
    omit?: GoodsOmit<ExtArgs> | null
    /**
     * The data needed to update a Goods.
     */
    data: XOR<GoodsUpdateInput, GoodsUncheckedUpdateInput>
    /**
     * Choose, which Goods to update.
     */
    where: GoodsWhereUniqueInput
  }

  /**
   * Goods updateMany
   */
  export type GoodsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Goods.
     */
    data: XOR<GoodsUpdateManyMutationInput, GoodsUncheckedUpdateManyInput>
    /**
     * Filter which Goods to update
     */
    where?: GoodsWhereInput
    /**
     * Limit how many Goods to update.
     */
    limit?: number
  }

  /**
   * Goods upsert
   */
  export type GoodsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goods
     */
    select?: GoodsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goods
     */
    omit?: GoodsOmit<ExtArgs> | null
    /**
     * The filter to search for the Goods to update in case it exists.
     */
    where: GoodsWhereUniqueInput
    /**
     * In case the Goods found by the `where` argument doesn't exist, create a new Goods with this data.
     */
    create: XOR<GoodsCreateInput, GoodsUncheckedCreateInput>
    /**
     * In case the Goods was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GoodsUpdateInput, GoodsUncheckedUpdateInput>
  }

  /**
   * Goods delete
   */
  export type GoodsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goods
     */
    select?: GoodsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goods
     */
    omit?: GoodsOmit<ExtArgs> | null
    /**
     * Filter which Goods to delete.
     */
    where: GoodsWhereUniqueInput
  }

  /**
   * Goods deleteMany
   */
  export type GoodsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Goods to delete
     */
    where?: GoodsWhereInput
    /**
     * Limit how many Goods to delete.
     */
    limit?: number
  }

  /**
   * Goods without action
   */
  export type GoodsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goods
     */
    select?: GoodsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goods
     */
    omit?: GoodsOmit<ExtArgs> | null
  }


  /**
   * Model Gacha
   */

  export type AggregateGacha = {
    _count: GachaCountAggregateOutputType | null
    _avg: GachaAvgAggregateOutputType | null
    _sum: GachaSumAggregateOutputType | null
    _min: GachaMinAggregateOutputType | null
    _max: GachaMaxAggregateOutputType | null
  }

  export type GachaAvgAggregateOutputType = {
    gachaId: number | null
    price: number | null
    bronze: number | null
    silver: number | null
    gold: number | null
    paltinum: number | null
    diamond: number | null
  }

  export type GachaSumAggregateOutputType = {
    gachaId: number | null
    price: number | null
    bronze: number | null
    silver: number | null
    gold: number | null
    paltinum: number | null
    diamond: number | null
  }

  export type GachaMinAggregateOutputType = {
    gachaId: number | null
    cardName: string | null
    price: number | null
    bronze: number | null
    silver: number | null
    gold: number | null
    paltinum: number | null
    diamond: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GachaMaxAggregateOutputType = {
    gachaId: number | null
    cardName: string | null
    price: number | null
    bronze: number | null
    silver: number | null
    gold: number | null
    paltinum: number | null
    diamond: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GachaCountAggregateOutputType = {
    gachaId: number
    cardName: number
    price: number
    bronze: number
    silver: number
    gold: number
    paltinum: number
    diamond: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GachaAvgAggregateInputType = {
    gachaId?: true
    price?: true
    bronze?: true
    silver?: true
    gold?: true
    paltinum?: true
    diamond?: true
  }

  export type GachaSumAggregateInputType = {
    gachaId?: true
    price?: true
    bronze?: true
    silver?: true
    gold?: true
    paltinum?: true
    diamond?: true
  }

  export type GachaMinAggregateInputType = {
    gachaId?: true
    cardName?: true
    price?: true
    bronze?: true
    silver?: true
    gold?: true
    paltinum?: true
    diamond?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GachaMaxAggregateInputType = {
    gachaId?: true
    cardName?: true
    price?: true
    bronze?: true
    silver?: true
    gold?: true
    paltinum?: true
    diamond?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GachaCountAggregateInputType = {
    gachaId?: true
    cardName?: true
    price?: true
    bronze?: true
    silver?: true
    gold?: true
    paltinum?: true
    diamond?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GachaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Gacha to aggregate.
     */
    where?: GachaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gachas to fetch.
     */
    orderBy?: GachaOrderByWithRelationInput | GachaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GachaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gachas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gachas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Gachas
    **/
    _count?: true | GachaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GachaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GachaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GachaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GachaMaxAggregateInputType
  }

  export type GetGachaAggregateType<T extends GachaAggregateArgs> = {
        [P in keyof T & keyof AggregateGacha]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGacha[P]>
      : GetScalarType<T[P], AggregateGacha[P]>
  }




  export type GachaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GachaWhereInput
    orderBy?: GachaOrderByWithAggregationInput | GachaOrderByWithAggregationInput[]
    by: GachaScalarFieldEnum[] | GachaScalarFieldEnum
    having?: GachaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GachaCountAggregateInputType | true
    _avg?: GachaAvgAggregateInputType
    _sum?: GachaSumAggregateInputType
    _min?: GachaMinAggregateInputType
    _max?: GachaMaxAggregateInputType
  }

  export type GachaGroupByOutputType = {
    gachaId: number
    cardName: string
    price: number
    bronze: number
    silver: number
    gold: number
    paltinum: number
    diamond: number
    createdAt: Date
    updatedAt: Date
    _count: GachaCountAggregateOutputType | null
    _avg: GachaAvgAggregateOutputType | null
    _sum: GachaSumAggregateOutputType | null
    _min: GachaMinAggregateOutputType | null
    _max: GachaMaxAggregateOutputType | null
  }

  type GetGachaGroupByPayload<T extends GachaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GachaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GachaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GachaGroupByOutputType[P]>
            : GetScalarType<T[P], GachaGroupByOutputType[P]>
        }
      >
    >


  export type GachaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    gachaId?: boolean
    cardName?: boolean
    price?: boolean
    bronze?: boolean
    silver?: boolean
    gold?: boolean
    paltinum?: boolean
    diamond?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["gacha"]>



  export type GachaSelectScalar = {
    gachaId?: boolean
    cardName?: boolean
    price?: boolean
    bronze?: boolean
    silver?: boolean
    gold?: boolean
    paltinum?: boolean
    diamond?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GachaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"gachaId" | "cardName" | "price" | "bronze" | "silver" | "gold" | "paltinum" | "diamond" | "createdAt" | "updatedAt", ExtArgs["result"]["gacha"]>

  export type $GachaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Gacha"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      gachaId: number
      cardName: string
      price: number
      bronze: number
      silver: number
      gold: number
      paltinum: number
      diamond: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["gacha"]>
    composites: {}
  }

  type GachaGetPayload<S extends boolean | null | undefined | GachaDefaultArgs> = $Result.GetResult<Prisma.$GachaPayload, S>

  type GachaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GachaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GachaCountAggregateInputType | true
    }

  export interface GachaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Gacha'], meta: { name: 'Gacha' } }
    /**
     * Find zero or one Gacha that matches the filter.
     * @param {GachaFindUniqueArgs} args - Arguments to find a Gacha
     * @example
     * // Get one Gacha
     * const gacha = await prisma.gacha.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GachaFindUniqueArgs>(args: SelectSubset<T, GachaFindUniqueArgs<ExtArgs>>): Prisma__GachaClient<$Result.GetResult<Prisma.$GachaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Gacha that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GachaFindUniqueOrThrowArgs} args - Arguments to find a Gacha
     * @example
     * // Get one Gacha
     * const gacha = await prisma.gacha.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GachaFindUniqueOrThrowArgs>(args: SelectSubset<T, GachaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GachaClient<$Result.GetResult<Prisma.$GachaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Gacha that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GachaFindFirstArgs} args - Arguments to find a Gacha
     * @example
     * // Get one Gacha
     * const gacha = await prisma.gacha.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GachaFindFirstArgs>(args?: SelectSubset<T, GachaFindFirstArgs<ExtArgs>>): Prisma__GachaClient<$Result.GetResult<Prisma.$GachaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Gacha that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GachaFindFirstOrThrowArgs} args - Arguments to find a Gacha
     * @example
     * // Get one Gacha
     * const gacha = await prisma.gacha.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GachaFindFirstOrThrowArgs>(args?: SelectSubset<T, GachaFindFirstOrThrowArgs<ExtArgs>>): Prisma__GachaClient<$Result.GetResult<Prisma.$GachaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Gachas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GachaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Gachas
     * const gachas = await prisma.gacha.findMany()
     * 
     * // Get first 10 Gachas
     * const gachas = await prisma.gacha.findMany({ take: 10 })
     * 
     * // Only select the `gachaId`
     * const gachaWithGachaIdOnly = await prisma.gacha.findMany({ select: { gachaId: true } })
     * 
     */
    findMany<T extends GachaFindManyArgs>(args?: SelectSubset<T, GachaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GachaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Gacha.
     * @param {GachaCreateArgs} args - Arguments to create a Gacha.
     * @example
     * // Create one Gacha
     * const Gacha = await prisma.gacha.create({
     *   data: {
     *     // ... data to create a Gacha
     *   }
     * })
     * 
     */
    create<T extends GachaCreateArgs>(args: SelectSubset<T, GachaCreateArgs<ExtArgs>>): Prisma__GachaClient<$Result.GetResult<Prisma.$GachaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Gachas.
     * @param {GachaCreateManyArgs} args - Arguments to create many Gachas.
     * @example
     * // Create many Gachas
     * const gacha = await prisma.gacha.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GachaCreateManyArgs>(args?: SelectSubset<T, GachaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Gacha.
     * @param {GachaDeleteArgs} args - Arguments to delete one Gacha.
     * @example
     * // Delete one Gacha
     * const Gacha = await prisma.gacha.delete({
     *   where: {
     *     // ... filter to delete one Gacha
     *   }
     * })
     * 
     */
    delete<T extends GachaDeleteArgs>(args: SelectSubset<T, GachaDeleteArgs<ExtArgs>>): Prisma__GachaClient<$Result.GetResult<Prisma.$GachaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Gacha.
     * @param {GachaUpdateArgs} args - Arguments to update one Gacha.
     * @example
     * // Update one Gacha
     * const gacha = await prisma.gacha.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GachaUpdateArgs>(args: SelectSubset<T, GachaUpdateArgs<ExtArgs>>): Prisma__GachaClient<$Result.GetResult<Prisma.$GachaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Gachas.
     * @param {GachaDeleteManyArgs} args - Arguments to filter Gachas to delete.
     * @example
     * // Delete a few Gachas
     * const { count } = await prisma.gacha.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GachaDeleteManyArgs>(args?: SelectSubset<T, GachaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Gachas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GachaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Gachas
     * const gacha = await prisma.gacha.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GachaUpdateManyArgs>(args: SelectSubset<T, GachaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Gacha.
     * @param {GachaUpsertArgs} args - Arguments to update or create a Gacha.
     * @example
     * // Update or create a Gacha
     * const gacha = await prisma.gacha.upsert({
     *   create: {
     *     // ... data to create a Gacha
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Gacha we want to update
     *   }
     * })
     */
    upsert<T extends GachaUpsertArgs>(args: SelectSubset<T, GachaUpsertArgs<ExtArgs>>): Prisma__GachaClient<$Result.GetResult<Prisma.$GachaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Gachas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GachaCountArgs} args - Arguments to filter Gachas to count.
     * @example
     * // Count the number of Gachas
     * const count = await prisma.gacha.count({
     *   where: {
     *     // ... the filter for the Gachas we want to count
     *   }
     * })
    **/
    count<T extends GachaCountArgs>(
      args?: Subset<T, GachaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GachaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Gacha.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GachaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GachaAggregateArgs>(args: Subset<T, GachaAggregateArgs>): Prisma.PrismaPromise<GetGachaAggregateType<T>>

    /**
     * Group by Gacha.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GachaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GachaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GachaGroupByArgs['orderBy'] }
        : { orderBy?: GachaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GachaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGachaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Gacha model
   */
  readonly fields: GachaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Gacha.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GachaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Gacha model
   */
  interface GachaFieldRefs {
    readonly gachaId: FieldRef<"Gacha", 'Int'>
    readonly cardName: FieldRef<"Gacha", 'String'>
    readonly price: FieldRef<"Gacha", 'Int'>
    readonly bronze: FieldRef<"Gacha", 'Int'>
    readonly silver: FieldRef<"Gacha", 'Int'>
    readonly gold: FieldRef<"Gacha", 'Int'>
    readonly paltinum: FieldRef<"Gacha", 'Int'>
    readonly diamond: FieldRef<"Gacha", 'Int'>
    readonly createdAt: FieldRef<"Gacha", 'DateTime'>
    readonly updatedAt: FieldRef<"Gacha", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Gacha findUnique
   */
  export type GachaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gacha
     */
    select?: GachaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gacha
     */
    omit?: GachaOmit<ExtArgs> | null
    /**
     * Filter, which Gacha to fetch.
     */
    where: GachaWhereUniqueInput
  }

  /**
   * Gacha findUniqueOrThrow
   */
  export type GachaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gacha
     */
    select?: GachaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gacha
     */
    omit?: GachaOmit<ExtArgs> | null
    /**
     * Filter, which Gacha to fetch.
     */
    where: GachaWhereUniqueInput
  }

  /**
   * Gacha findFirst
   */
  export type GachaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gacha
     */
    select?: GachaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gacha
     */
    omit?: GachaOmit<ExtArgs> | null
    /**
     * Filter, which Gacha to fetch.
     */
    where?: GachaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gachas to fetch.
     */
    orderBy?: GachaOrderByWithRelationInput | GachaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Gachas.
     */
    cursor?: GachaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gachas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gachas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Gachas.
     */
    distinct?: GachaScalarFieldEnum | GachaScalarFieldEnum[]
  }

  /**
   * Gacha findFirstOrThrow
   */
  export type GachaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gacha
     */
    select?: GachaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gacha
     */
    omit?: GachaOmit<ExtArgs> | null
    /**
     * Filter, which Gacha to fetch.
     */
    where?: GachaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gachas to fetch.
     */
    orderBy?: GachaOrderByWithRelationInput | GachaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Gachas.
     */
    cursor?: GachaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gachas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gachas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Gachas.
     */
    distinct?: GachaScalarFieldEnum | GachaScalarFieldEnum[]
  }

  /**
   * Gacha findMany
   */
  export type GachaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gacha
     */
    select?: GachaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gacha
     */
    omit?: GachaOmit<ExtArgs> | null
    /**
     * Filter, which Gachas to fetch.
     */
    where?: GachaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gachas to fetch.
     */
    orderBy?: GachaOrderByWithRelationInput | GachaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Gachas.
     */
    cursor?: GachaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gachas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gachas.
     */
    skip?: number
    distinct?: GachaScalarFieldEnum | GachaScalarFieldEnum[]
  }

  /**
   * Gacha create
   */
  export type GachaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gacha
     */
    select?: GachaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gacha
     */
    omit?: GachaOmit<ExtArgs> | null
    /**
     * The data needed to create a Gacha.
     */
    data: XOR<GachaCreateInput, GachaUncheckedCreateInput>
  }

  /**
   * Gacha createMany
   */
  export type GachaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Gachas.
     */
    data: GachaCreateManyInput | GachaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Gacha update
   */
  export type GachaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gacha
     */
    select?: GachaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gacha
     */
    omit?: GachaOmit<ExtArgs> | null
    /**
     * The data needed to update a Gacha.
     */
    data: XOR<GachaUpdateInput, GachaUncheckedUpdateInput>
    /**
     * Choose, which Gacha to update.
     */
    where: GachaWhereUniqueInput
  }

  /**
   * Gacha updateMany
   */
  export type GachaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Gachas.
     */
    data: XOR<GachaUpdateManyMutationInput, GachaUncheckedUpdateManyInput>
    /**
     * Filter which Gachas to update
     */
    where?: GachaWhereInput
    /**
     * Limit how many Gachas to update.
     */
    limit?: number
  }

  /**
   * Gacha upsert
   */
  export type GachaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gacha
     */
    select?: GachaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gacha
     */
    omit?: GachaOmit<ExtArgs> | null
    /**
     * The filter to search for the Gacha to update in case it exists.
     */
    where: GachaWhereUniqueInput
    /**
     * In case the Gacha found by the `where` argument doesn't exist, create a new Gacha with this data.
     */
    create: XOR<GachaCreateInput, GachaUncheckedCreateInput>
    /**
     * In case the Gacha was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GachaUpdateInput, GachaUncheckedUpdateInput>
  }

  /**
   * Gacha delete
   */
  export type GachaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gacha
     */
    select?: GachaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gacha
     */
    omit?: GachaOmit<ExtArgs> | null
    /**
     * Filter which Gacha to delete.
     */
    where: GachaWhereUniqueInput
  }

  /**
   * Gacha deleteMany
   */
  export type GachaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Gachas to delete
     */
    where?: GachaWhereInput
    /**
     * Limit how many Gachas to delete.
     */
    limit?: number
  }

  /**
   * Gacha without action
   */
  export type GachaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Gacha
     */
    select?: GachaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Gacha
     */
    omit?: GachaOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PlayerScalarFieldEnum: {
    playerId: 'playerId',
    soccerPlayerId: 'soccerPlayerId',
    name: 'name',
    speed: 'speed',
    attack: 'attack',
    defence: 'defence',
    profileImage: 'profileImage',
    rarity: 'rarity',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PlayerScalarFieldEnum = (typeof PlayerScalarFieldEnum)[keyof typeof PlayerScalarFieldEnum]


  export const GoodsScalarFieldEnum: {
    goodsId: 'goodsId',
    name: 'name',
    cashAmount: 'cashAmount'
  };

  export type GoodsScalarFieldEnum = (typeof GoodsScalarFieldEnum)[keyof typeof GoodsScalarFieldEnum]


  export const GachaScalarFieldEnum: {
    gachaId: 'gachaId',
    cardName: 'cardName',
    price: 'price',
    bronze: 'bronze',
    silver: 'silver',
    gold: 'gold',
    paltinum: 'paltinum',
    diamond: 'diamond',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GachaScalarFieldEnum = (typeof GachaScalarFieldEnum)[keyof typeof GachaScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const PlayerOrderByRelevanceFieldEnum: {
    soccerPlayerId: 'soccerPlayerId',
    name: 'name',
    profileImage: 'profileImage',
    rarity: 'rarity'
  };

  export type PlayerOrderByRelevanceFieldEnum = (typeof PlayerOrderByRelevanceFieldEnum)[keyof typeof PlayerOrderByRelevanceFieldEnum]


  export const GoodsOrderByRelevanceFieldEnum: {
    name: 'name'
  };

  export type GoodsOrderByRelevanceFieldEnum = (typeof GoodsOrderByRelevanceFieldEnum)[keyof typeof GoodsOrderByRelevanceFieldEnum]


  export const GachaOrderByRelevanceFieldEnum: {
    cardName: 'cardName'
  };

  export type GachaOrderByRelevanceFieldEnum = (typeof GachaOrderByRelevanceFieldEnum)[keyof typeof GachaOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type PlayerWhereInput = {
    AND?: PlayerWhereInput | PlayerWhereInput[]
    OR?: PlayerWhereInput[]
    NOT?: PlayerWhereInput | PlayerWhereInput[]
    playerId?: IntFilter<"Player"> | number
    soccerPlayerId?: StringFilter<"Player"> | string
    name?: StringFilter<"Player"> | string
    speed?: IntFilter<"Player"> | number
    attack?: IntFilter<"Player"> | number
    defence?: IntFilter<"Player"> | number
    profileImage?: StringNullableFilter<"Player"> | string | null
    rarity?: StringFilter<"Player"> | string
    createdAt?: DateTimeFilter<"Player"> | Date | string
    updatedAt?: DateTimeFilter<"Player"> | Date | string
  }

  export type PlayerOrderByWithRelationInput = {
    playerId?: SortOrder
    soccerPlayerId?: SortOrder
    name?: SortOrder
    speed?: SortOrder
    attack?: SortOrder
    defence?: SortOrder
    profileImage?: SortOrderInput | SortOrder
    rarity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: PlayerOrderByRelevanceInput
  }

  export type PlayerWhereUniqueInput = Prisma.AtLeast<{
    playerId?: number
    soccerPlayerId?: string
    AND?: PlayerWhereInput | PlayerWhereInput[]
    OR?: PlayerWhereInput[]
    NOT?: PlayerWhereInput | PlayerWhereInput[]
    name?: StringFilter<"Player"> | string
    speed?: IntFilter<"Player"> | number
    attack?: IntFilter<"Player"> | number
    defence?: IntFilter<"Player"> | number
    profileImage?: StringNullableFilter<"Player"> | string | null
    rarity?: StringFilter<"Player"> | string
    createdAt?: DateTimeFilter<"Player"> | Date | string
    updatedAt?: DateTimeFilter<"Player"> | Date | string
  }, "playerId" | "soccerPlayerId">

  export type PlayerOrderByWithAggregationInput = {
    playerId?: SortOrder
    soccerPlayerId?: SortOrder
    name?: SortOrder
    speed?: SortOrder
    attack?: SortOrder
    defence?: SortOrder
    profileImage?: SortOrderInput | SortOrder
    rarity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PlayerCountOrderByAggregateInput
    _avg?: PlayerAvgOrderByAggregateInput
    _max?: PlayerMaxOrderByAggregateInput
    _min?: PlayerMinOrderByAggregateInput
    _sum?: PlayerSumOrderByAggregateInput
  }

  export type PlayerScalarWhereWithAggregatesInput = {
    AND?: PlayerScalarWhereWithAggregatesInput | PlayerScalarWhereWithAggregatesInput[]
    OR?: PlayerScalarWhereWithAggregatesInput[]
    NOT?: PlayerScalarWhereWithAggregatesInput | PlayerScalarWhereWithAggregatesInput[]
    playerId?: IntWithAggregatesFilter<"Player"> | number
    soccerPlayerId?: StringWithAggregatesFilter<"Player"> | string
    name?: StringWithAggregatesFilter<"Player"> | string
    speed?: IntWithAggregatesFilter<"Player"> | number
    attack?: IntWithAggregatesFilter<"Player"> | number
    defence?: IntWithAggregatesFilter<"Player"> | number
    profileImage?: StringNullableWithAggregatesFilter<"Player"> | string | null
    rarity?: StringWithAggregatesFilter<"Player"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Player"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Player"> | Date | string
  }

  export type GoodsWhereInput = {
    AND?: GoodsWhereInput | GoodsWhereInput[]
    OR?: GoodsWhereInput[]
    NOT?: GoodsWhereInput | GoodsWhereInput[]
    goodsId?: IntFilter<"Goods"> | number
    name?: StringFilter<"Goods"> | string
    cashAmount?: IntFilter<"Goods"> | number
  }

  export type GoodsOrderByWithRelationInput = {
    goodsId?: SortOrder
    name?: SortOrder
    cashAmount?: SortOrder
    _relevance?: GoodsOrderByRelevanceInput
  }

  export type GoodsWhereUniqueInput = Prisma.AtLeast<{
    goodsId?: number
    name?: string
    AND?: GoodsWhereInput | GoodsWhereInput[]
    OR?: GoodsWhereInput[]
    NOT?: GoodsWhereInput | GoodsWhereInput[]
    cashAmount?: IntFilter<"Goods"> | number
  }, "goodsId" | "name">

  export type GoodsOrderByWithAggregationInput = {
    goodsId?: SortOrder
    name?: SortOrder
    cashAmount?: SortOrder
    _count?: GoodsCountOrderByAggregateInput
    _avg?: GoodsAvgOrderByAggregateInput
    _max?: GoodsMaxOrderByAggregateInput
    _min?: GoodsMinOrderByAggregateInput
    _sum?: GoodsSumOrderByAggregateInput
  }

  export type GoodsScalarWhereWithAggregatesInput = {
    AND?: GoodsScalarWhereWithAggregatesInput | GoodsScalarWhereWithAggregatesInput[]
    OR?: GoodsScalarWhereWithAggregatesInput[]
    NOT?: GoodsScalarWhereWithAggregatesInput | GoodsScalarWhereWithAggregatesInput[]
    goodsId?: IntWithAggregatesFilter<"Goods"> | number
    name?: StringWithAggregatesFilter<"Goods"> | string
    cashAmount?: IntWithAggregatesFilter<"Goods"> | number
  }

  export type GachaWhereInput = {
    AND?: GachaWhereInput | GachaWhereInput[]
    OR?: GachaWhereInput[]
    NOT?: GachaWhereInput | GachaWhereInput[]
    gachaId?: IntFilter<"Gacha"> | number
    cardName?: StringFilter<"Gacha"> | string
    price?: IntFilter<"Gacha"> | number
    bronze?: IntFilter<"Gacha"> | number
    silver?: IntFilter<"Gacha"> | number
    gold?: IntFilter<"Gacha"> | number
    paltinum?: IntFilter<"Gacha"> | number
    diamond?: IntFilter<"Gacha"> | number
    createdAt?: DateTimeFilter<"Gacha"> | Date | string
    updatedAt?: DateTimeFilter<"Gacha"> | Date | string
  }

  export type GachaOrderByWithRelationInput = {
    gachaId?: SortOrder
    cardName?: SortOrder
    price?: SortOrder
    bronze?: SortOrder
    silver?: SortOrder
    gold?: SortOrder
    paltinum?: SortOrder
    diamond?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: GachaOrderByRelevanceInput
  }

  export type GachaWhereUniqueInput = Prisma.AtLeast<{
    gachaId?: number
    cardName?: string
    AND?: GachaWhereInput | GachaWhereInput[]
    OR?: GachaWhereInput[]
    NOT?: GachaWhereInput | GachaWhereInput[]
    price?: IntFilter<"Gacha"> | number
    bronze?: IntFilter<"Gacha"> | number
    silver?: IntFilter<"Gacha"> | number
    gold?: IntFilter<"Gacha"> | number
    paltinum?: IntFilter<"Gacha"> | number
    diamond?: IntFilter<"Gacha"> | number
    createdAt?: DateTimeFilter<"Gacha"> | Date | string
    updatedAt?: DateTimeFilter<"Gacha"> | Date | string
  }, "gachaId" | "cardName">

  export type GachaOrderByWithAggregationInput = {
    gachaId?: SortOrder
    cardName?: SortOrder
    price?: SortOrder
    bronze?: SortOrder
    silver?: SortOrder
    gold?: SortOrder
    paltinum?: SortOrder
    diamond?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GachaCountOrderByAggregateInput
    _avg?: GachaAvgOrderByAggregateInput
    _max?: GachaMaxOrderByAggregateInput
    _min?: GachaMinOrderByAggregateInput
    _sum?: GachaSumOrderByAggregateInput
  }

  export type GachaScalarWhereWithAggregatesInput = {
    AND?: GachaScalarWhereWithAggregatesInput | GachaScalarWhereWithAggregatesInput[]
    OR?: GachaScalarWhereWithAggregatesInput[]
    NOT?: GachaScalarWhereWithAggregatesInput | GachaScalarWhereWithAggregatesInput[]
    gachaId?: IntWithAggregatesFilter<"Gacha"> | number
    cardName?: StringWithAggregatesFilter<"Gacha"> | string
    price?: IntWithAggregatesFilter<"Gacha"> | number
    bronze?: IntWithAggregatesFilter<"Gacha"> | number
    silver?: IntWithAggregatesFilter<"Gacha"> | number
    gold?: IntWithAggregatesFilter<"Gacha"> | number
    paltinum?: IntWithAggregatesFilter<"Gacha"> | number
    diamond?: IntWithAggregatesFilter<"Gacha"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Gacha"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Gacha"> | Date | string
  }

  export type PlayerCreateInput = {
    soccerPlayerId: string
    name: string
    speed: number
    attack: number
    defence: number
    profileImage?: string | null
    rarity: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlayerUncheckedCreateInput = {
    playerId?: number
    soccerPlayerId: string
    name: string
    speed: number
    attack: number
    defence: number
    profileImage?: string | null
    rarity: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlayerUpdateInput = {
    soccerPlayerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    speed?: IntFieldUpdateOperationsInput | number
    attack?: IntFieldUpdateOperationsInput | number
    defence?: IntFieldUpdateOperationsInput | number
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    rarity?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayerUncheckedUpdateInput = {
    playerId?: IntFieldUpdateOperationsInput | number
    soccerPlayerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    speed?: IntFieldUpdateOperationsInput | number
    attack?: IntFieldUpdateOperationsInput | number
    defence?: IntFieldUpdateOperationsInput | number
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    rarity?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayerCreateManyInput = {
    playerId?: number
    soccerPlayerId: string
    name: string
    speed: number
    attack: number
    defence: number
    profileImage?: string | null
    rarity: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlayerUpdateManyMutationInput = {
    soccerPlayerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    speed?: IntFieldUpdateOperationsInput | number
    attack?: IntFieldUpdateOperationsInput | number
    defence?: IntFieldUpdateOperationsInput | number
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    rarity?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayerUncheckedUpdateManyInput = {
    playerId?: IntFieldUpdateOperationsInput | number
    soccerPlayerId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    speed?: IntFieldUpdateOperationsInput | number
    attack?: IntFieldUpdateOperationsInput | number
    defence?: IntFieldUpdateOperationsInput | number
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    rarity?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GoodsCreateInput = {
    name: string
    cashAmount: number
  }

  export type GoodsUncheckedCreateInput = {
    goodsId?: number
    name: string
    cashAmount: number
  }

  export type GoodsUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    cashAmount?: IntFieldUpdateOperationsInput | number
  }

  export type GoodsUncheckedUpdateInput = {
    goodsId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    cashAmount?: IntFieldUpdateOperationsInput | number
  }

  export type GoodsCreateManyInput = {
    goodsId?: number
    name: string
    cashAmount: number
  }

  export type GoodsUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    cashAmount?: IntFieldUpdateOperationsInput | number
  }

  export type GoodsUncheckedUpdateManyInput = {
    goodsId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    cashAmount?: IntFieldUpdateOperationsInput | number
  }

  export type GachaCreateInput = {
    cardName: string
    price: number
    bronze: number
    silver: number
    gold: number
    paltinum: number
    diamond: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GachaUncheckedCreateInput = {
    gachaId?: number
    cardName: string
    price: number
    bronze: number
    silver: number
    gold: number
    paltinum: number
    diamond: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GachaUpdateInput = {
    cardName?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    bronze?: IntFieldUpdateOperationsInput | number
    silver?: IntFieldUpdateOperationsInput | number
    gold?: IntFieldUpdateOperationsInput | number
    paltinum?: IntFieldUpdateOperationsInput | number
    diamond?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GachaUncheckedUpdateInput = {
    gachaId?: IntFieldUpdateOperationsInput | number
    cardName?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    bronze?: IntFieldUpdateOperationsInput | number
    silver?: IntFieldUpdateOperationsInput | number
    gold?: IntFieldUpdateOperationsInput | number
    paltinum?: IntFieldUpdateOperationsInput | number
    diamond?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GachaCreateManyInput = {
    gachaId?: number
    cardName: string
    price: number
    bronze: number
    silver: number
    gold: number
    paltinum: number
    diamond: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GachaUpdateManyMutationInput = {
    cardName?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    bronze?: IntFieldUpdateOperationsInput | number
    silver?: IntFieldUpdateOperationsInput | number
    gold?: IntFieldUpdateOperationsInput | number
    paltinum?: IntFieldUpdateOperationsInput | number
    diamond?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GachaUncheckedUpdateManyInput = {
    gachaId?: IntFieldUpdateOperationsInput | number
    cardName?: StringFieldUpdateOperationsInput | string
    price?: IntFieldUpdateOperationsInput | number
    bronze?: IntFieldUpdateOperationsInput | number
    silver?: IntFieldUpdateOperationsInput | number
    gold?: IntFieldUpdateOperationsInput | number
    paltinum?: IntFieldUpdateOperationsInput | number
    diamond?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PlayerOrderByRelevanceInput = {
    fields: PlayerOrderByRelevanceFieldEnum | PlayerOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PlayerCountOrderByAggregateInput = {
    playerId?: SortOrder
    soccerPlayerId?: SortOrder
    name?: SortOrder
    speed?: SortOrder
    attack?: SortOrder
    defence?: SortOrder
    profileImage?: SortOrder
    rarity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlayerAvgOrderByAggregateInput = {
    playerId?: SortOrder
    speed?: SortOrder
    attack?: SortOrder
    defence?: SortOrder
  }

  export type PlayerMaxOrderByAggregateInput = {
    playerId?: SortOrder
    soccerPlayerId?: SortOrder
    name?: SortOrder
    speed?: SortOrder
    attack?: SortOrder
    defence?: SortOrder
    profileImage?: SortOrder
    rarity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlayerMinOrderByAggregateInput = {
    playerId?: SortOrder
    soccerPlayerId?: SortOrder
    name?: SortOrder
    speed?: SortOrder
    attack?: SortOrder
    defence?: SortOrder
    profileImage?: SortOrder
    rarity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlayerSumOrderByAggregateInput = {
    playerId?: SortOrder
    speed?: SortOrder
    attack?: SortOrder
    defence?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type GoodsOrderByRelevanceInput = {
    fields: GoodsOrderByRelevanceFieldEnum | GoodsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type GoodsCountOrderByAggregateInput = {
    goodsId?: SortOrder
    name?: SortOrder
    cashAmount?: SortOrder
  }

  export type GoodsAvgOrderByAggregateInput = {
    goodsId?: SortOrder
    cashAmount?: SortOrder
  }

  export type GoodsMaxOrderByAggregateInput = {
    goodsId?: SortOrder
    name?: SortOrder
    cashAmount?: SortOrder
  }

  export type GoodsMinOrderByAggregateInput = {
    goodsId?: SortOrder
    name?: SortOrder
    cashAmount?: SortOrder
  }

  export type GoodsSumOrderByAggregateInput = {
    goodsId?: SortOrder
    cashAmount?: SortOrder
  }

  export type GachaOrderByRelevanceInput = {
    fields: GachaOrderByRelevanceFieldEnum | GachaOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type GachaCountOrderByAggregateInput = {
    gachaId?: SortOrder
    cardName?: SortOrder
    price?: SortOrder
    bronze?: SortOrder
    silver?: SortOrder
    gold?: SortOrder
    paltinum?: SortOrder
    diamond?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GachaAvgOrderByAggregateInput = {
    gachaId?: SortOrder
    price?: SortOrder
    bronze?: SortOrder
    silver?: SortOrder
    gold?: SortOrder
    paltinum?: SortOrder
    diamond?: SortOrder
  }

  export type GachaMaxOrderByAggregateInput = {
    gachaId?: SortOrder
    cardName?: SortOrder
    price?: SortOrder
    bronze?: SortOrder
    silver?: SortOrder
    gold?: SortOrder
    paltinum?: SortOrder
    diamond?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GachaMinOrderByAggregateInput = {
    gachaId?: SortOrder
    cardName?: SortOrder
    price?: SortOrder
    bronze?: SortOrder
    silver?: SortOrder
    gold?: SortOrder
    paltinum?: SortOrder
    diamond?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GachaSumOrderByAggregateInput = {
    gachaId?: SortOrder
    price?: SortOrder
    bronze?: SortOrder
    silver?: SortOrder
    gold?: SortOrder
    paltinum?: SortOrder
    diamond?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}