
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
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model OwnedPlayer
 * 
 */
export type OwnedPlayer = $Result.DefaultSelection<Prisma.$OwnedPlayerPayload>
/**
 * Model Squad
 * 
 */
export type Squad = $Result.DefaultSelection<Prisma.$SquadPayload>
/**
 * Model RefreshToken
 * 
 */
export type RefreshToken = $Result.DefaultSelection<Prisma.$RefreshTokenPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Accounts
 * const accounts = await prisma.account.findMany()
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
   * // Fetch zero or more Accounts
   * const accounts = await prisma.account.findMany()
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
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ownedPlayer`: Exposes CRUD operations for the **OwnedPlayer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OwnedPlayers
    * const ownedPlayers = await prisma.ownedPlayer.findMany()
    * ```
    */
  get ownedPlayer(): Prisma.OwnedPlayerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.squad`: Exposes CRUD operations for the **Squad** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Squads
    * const squads = await prisma.squad.findMany()
    * ```
    */
  get squad(): Prisma.SquadDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.refreshToken`: Exposes CRUD operations for the **RefreshToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RefreshTokens
    * const refreshTokens = await prisma.refreshToken.findMany()
    * ```
    */
  get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs, ClientOptions>;
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
    Account: 'Account',
    OwnedPlayer: 'OwnedPlayer',
    Squad: 'Squad',
    RefreshToken: 'RefreshToken'
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
      modelProps: "account" | "ownedPlayer" | "squad" | "refreshToken"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      OwnedPlayer: {
        payload: Prisma.$OwnedPlayerPayload<ExtArgs>
        fields: Prisma.OwnedPlayerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OwnedPlayerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnedPlayerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OwnedPlayerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnedPlayerPayload>
          }
          findFirst: {
            args: Prisma.OwnedPlayerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnedPlayerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OwnedPlayerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnedPlayerPayload>
          }
          findMany: {
            args: Prisma.OwnedPlayerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnedPlayerPayload>[]
          }
          create: {
            args: Prisma.OwnedPlayerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnedPlayerPayload>
          }
          createMany: {
            args: Prisma.OwnedPlayerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OwnedPlayerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnedPlayerPayload>
          }
          update: {
            args: Prisma.OwnedPlayerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnedPlayerPayload>
          }
          deleteMany: {
            args: Prisma.OwnedPlayerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OwnedPlayerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OwnedPlayerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OwnedPlayerPayload>
          }
          aggregate: {
            args: Prisma.OwnedPlayerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOwnedPlayer>
          }
          groupBy: {
            args: Prisma.OwnedPlayerGroupByArgs<ExtArgs>
            result: $Utils.Optional<OwnedPlayerGroupByOutputType>[]
          }
          count: {
            args: Prisma.OwnedPlayerCountArgs<ExtArgs>
            result: $Utils.Optional<OwnedPlayerCountAggregateOutputType> | number
          }
        }
      }
      Squad: {
        payload: Prisma.$SquadPayload<ExtArgs>
        fields: Prisma.SquadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SquadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SquadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SquadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SquadPayload>
          }
          findFirst: {
            args: Prisma.SquadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SquadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SquadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SquadPayload>
          }
          findMany: {
            args: Prisma.SquadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SquadPayload>[]
          }
          create: {
            args: Prisma.SquadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SquadPayload>
          }
          createMany: {
            args: Prisma.SquadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SquadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SquadPayload>
          }
          update: {
            args: Prisma.SquadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SquadPayload>
          }
          deleteMany: {
            args: Prisma.SquadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SquadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SquadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SquadPayload>
          }
          aggregate: {
            args: Prisma.SquadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSquad>
          }
          groupBy: {
            args: Prisma.SquadGroupByArgs<ExtArgs>
            result: $Utils.Optional<SquadGroupByOutputType>[]
          }
          count: {
            args: Prisma.SquadCountArgs<ExtArgs>
            result: $Utils.Optional<SquadCountAggregateOutputType> | number
          }
        }
      }
      RefreshToken: {
        payload: Prisma.$RefreshTokenPayload<ExtArgs>
        fields: Prisma.RefreshTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findFirst: {
            args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findMany: {
            args: Prisma.RefreshTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          create: {
            args: Prisma.RefreshTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          createMany: {
            args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.RefreshTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          update: {
            args: Prisma.RefreshTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          deleteMany: {
            args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RefreshTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          aggregate: {
            args: Prisma.RefreshTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefreshToken>
          }
          groupBy: {
            args: Prisma.RefreshTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.RefreshTokenCountArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenCountAggregateOutputType> | number
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
    account?: AccountOmit
    ownedPlayer?: OwnedPlayerOmit
    squad?: SquadOmit
    refreshToken?: RefreshTokenOmit
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
   * Count Type AccountCountOutputType
   */

  export type AccountCountOutputType = {
    squads: number
    ownedPlayers: number
  }

  export type AccountCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    squads?: boolean | AccountCountOutputTypeCountSquadsArgs
    ownedPlayers?: boolean | AccountCountOutputTypeCountOwnedPlayersArgs
  }

  // Custom InputTypes
  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountCountOutputType
     */
    select?: AccountCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeCountSquadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SquadWhereInput
  }

  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeCountOwnedPlayersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OwnedPlayerWhereInput
  }


  /**
   * Count Type OwnedPlayerCountOutputType
   */

  export type OwnedPlayerCountOutputType = {
    squads: number
  }

  export type OwnedPlayerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    squads?: boolean | OwnedPlayerCountOutputTypeCountSquadsArgs
  }

  // Custom InputTypes
  /**
   * OwnedPlayerCountOutputType without action
   */
  export type OwnedPlayerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OwnedPlayerCountOutputType
     */
    select?: OwnedPlayerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OwnedPlayerCountOutputType without action
   */
  export type OwnedPlayerCountOutputTypeCountSquadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SquadWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    accountId: number | null
    cash: number | null
  }

  export type AccountSumAggregateOutputType = {
    accountId: number | null
    cash: number | null
  }

  export type AccountMinAggregateOutputType = {
    accountId: number | null
    email: string | null
    userId: string | null
    password: string | null
    cash: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    accountId: number | null
    email: string | null
    userId: string | null
    password: string | null
    cash: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    accountId: number
    email: number
    userId: number
    password: number
    cash: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    accountId?: true
    cash?: true
  }

  export type AccountSumAggregateInputType = {
    accountId?: true
    cash?: true
  }

  export type AccountMinAggregateInputType = {
    accountId?: true
    email?: true
    userId?: true
    password?: true
    cash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    accountId?: true
    email?: true
    userId?: true
    password?: true
    cash?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    accountId?: true
    email?: true
    userId?: true
    password?: true
    cash?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    accountId: number
    email: string
    userId: string
    password: string
    cash: number
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    accountId?: boolean
    email?: boolean
    userId?: boolean
    password?: boolean
    cash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    refreshToken?: boolean | Account$refreshTokenArgs<ExtArgs>
    squads?: boolean | Account$squadsArgs<ExtArgs>
    ownedPlayers?: boolean | Account$ownedPlayersArgs<ExtArgs>
    _count?: boolean | AccountCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>



  export type AccountSelectScalar = {
    accountId?: boolean
    email?: boolean
    userId?: boolean
    password?: boolean
    cash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"accountId" | "email" | "userId" | "password" | "cash" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    refreshToken?: boolean | Account$refreshTokenArgs<ExtArgs>
    squads?: boolean | Account$squadsArgs<ExtArgs>
    ownedPlayers?: boolean | Account$ownedPlayersArgs<ExtArgs>
    _count?: boolean | AccountCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      refreshToken: Prisma.$RefreshTokenPayload<ExtArgs> | null
      squads: Prisma.$SquadPayload<ExtArgs>[]
      ownedPlayers: Prisma.$OwnedPlayerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      accountId: number
      email: string
      userId: string
      password: string
      cash: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `accountId`
     * const accountWithAccountIdOnly = await prisma.account.findMany({ select: { accountId: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
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
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    refreshToken<T extends Account$refreshTokenArgs<ExtArgs> = {}>(args?: Subset<T, Account$refreshTokenArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    squads<T extends Account$squadsArgs<ExtArgs> = {}>(args?: Subset<T, Account$squadsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SquadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ownedPlayers<T extends Account$ownedPlayersArgs<ExtArgs> = {}>(args?: Subset<T, Account$ownedPlayersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OwnedPlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly accountId: FieldRef<"Account", 'Int'>
    readonly email: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly password: FieldRef<"Account", 'String'>
    readonly cash: FieldRef<"Account", 'Int'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account.refreshToken
   */
  export type Account$refreshTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    where?: RefreshTokenWhereInput
  }

  /**
   * Account.squads
   */
  export type Account$squadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Squad
     */
    select?: SquadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Squad
     */
    omit?: SquadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SquadInclude<ExtArgs> | null
    where?: SquadWhereInput
    orderBy?: SquadOrderByWithRelationInput | SquadOrderByWithRelationInput[]
    cursor?: SquadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SquadScalarFieldEnum | SquadScalarFieldEnum[]
  }

  /**
   * Account.ownedPlayers
   */
  export type Account$ownedPlayersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OwnedPlayer
     */
    select?: OwnedPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OwnedPlayer
     */
    omit?: OwnedPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnedPlayerInclude<ExtArgs> | null
    where?: OwnedPlayerWhereInput
    orderBy?: OwnedPlayerOrderByWithRelationInput | OwnedPlayerOrderByWithRelationInput[]
    cursor?: OwnedPlayerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OwnedPlayerScalarFieldEnum | OwnedPlayerScalarFieldEnum[]
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model OwnedPlayer
   */

  export type AggregateOwnedPlayer = {
    _count: OwnedPlayerCountAggregateOutputType | null
    _avg: OwnedPlayerAvgAggregateOutputType | null
    _sum: OwnedPlayerSumAggregateOutputType | null
    _min: OwnedPlayerMinAggregateOutputType | null
    _max: OwnedPlayerMaxAggregateOutputType | null
  }

  export type OwnedPlayerAvgAggregateOutputType = {
    ownedPlayerId: number | null
    accountId: number | null
    playerId: number | null
    count: number | null
  }

  export type OwnedPlayerSumAggregateOutputType = {
    ownedPlayerId: number | null
    accountId: number | null
    playerId: number | null
    count: number | null
  }

  export type OwnedPlayerMinAggregateOutputType = {
    ownedPlayerId: number | null
    accountId: number | null
    playerId: number | null
    count: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OwnedPlayerMaxAggregateOutputType = {
    ownedPlayerId: number | null
    accountId: number | null
    playerId: number | null
    count: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OwnedPlayerCountAggregateOutputType = {
    ownedPlayerId: number
    accountId: number
    playerId: number
    count: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OwnedPlayerAvgAggregateInputType = {
    ownedPlayerId?: true
    accountId?: true
    playerId?: true
    count?: true
  }

  export type OwnedPlayerSumAggregateInputType = {
    ownedPlayerId?: true
    accountId?: true
    playerId?: true
    count?: true
  }

  export type OwnedPlayerMinAggregateInputType = {
    ownedPlayerId?: true
    accountId?: true
    playerId?: true
    count?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OwnedPlayerMaxAggregateInputType = {
    ownedPlayerId?: true
    accountId?: true
    playerId?: true
    count?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OwnedPlayerCountAggregateInputType = {
    ownedPlayerId?: true
    accountId?: true
    playerId?: true
    count?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OwnedPlayerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OwnedPlayer to aggregate.
     */
    where?: OwnedPlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OwnedPlayers to fetch.
     */
    orderBy?: OwnedPlayerOrderByWithRelationInput | OwnedPlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OwnedPlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OwnedPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OwnedPlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OwnedPlayers
    **/
    _count?: true | OwnedPlayerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OwnedPlayerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OwnedPlayerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OwnedPlayerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OwnedPlayerMaxAggregateInputType
  }

  export type GetOwnedPlayerAggregateType<T extends OwnedPlayerAggregateArgs> = {
        [P in keyof T & keyof AggregateOwnedPlayer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOwnedPlayer[P]>
      : GetScalarType<T[P], AggregateOwnedPlayer[P]>
  }




  export type OwnedPlayerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OwnedPlayerWhereInput
    orderBy?: OwnedPlayerOrderByWithAggregationInput | OwnedPlayerOrderByWithAggregationInput[]
    by: OwnedPlayerScalarFieldEnum[] | OwnedPlayerScalarFieldEnum
    having?: OwnedPlayerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OwnedPlayerCountAggregateInputType | true
    _avg?: OwnedPlayerAvgAggregateInputType
    _sum?: OwnedPlayerSumAggregateInputType
    _min?: OwnedPlayerMinAggregateInputType
    _max?: OwnedPlayerMaxAggregateInputType
  }

  export type OwnedPlayerGroupByOutputType = {
    ownedPlayerId: number
    accountId: number
    playerId: number
    count: number
    createdAt: Date
    updatedAt: Date
    _count: OwnedPlayerCountAggregateOutputType | null
    _avg: OwnedPlayerAvgAggregateOutputType | null
    _sum: OwnedPlayerSumAggregateOutputType | null
    _min: OwnedPlayerMinAggregateOutputType | null
    _max: OwnedPlayerMaxAggregateOutputType | null
  }

  type GetOwnedPlayerGroupByPayload<T extends OwnedPlayerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OwnedPlayerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OwnedPlayerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OwnedPlayerGroupByOutputType[P]>
            : GetScalarType<T[P], OwnedPlayerGroupByOutputType[P]>
        }
      >
    >


  export type OwnedPlayerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    ownedPlayerId?: boolean
    accountId?: boolean
    playerId?: boolean
    count?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    account?: boolean | AccountDefaultArgs<ExtArgs>
    squads?: boolean | OwnedPlayer$squadsArgs<ExtArgs>
    _count?: boolean | OwnedPlayerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ownedPlayer"]>



  export type OwnedPlayerSelectScalar = {
    ownedPlayerId?: boolean
    accountId?: boolean
    playerId?: boolean
    count?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OwnedPlayerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"ownedPlayerId" | "accountId" | "playerId" | "count" | "createdAt" | "updatedAt", ExtArgs["result"]["ownedPlayer"]>
  export type OwnedPlayerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | AccountDefaultArgs<ExtArgs>
    squads?: boolean | OwnedPlayer$squadsArgs<ExtArgs>
    _count?: boolean | OwnedPlayerCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $OwnedPlayerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OwnedPlayer"
    objects: {
      account: Prisma.$AccountPayload<ExtArgs>
      squads: Prisma.$SquadPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      ownedPlayerId: number
      accountId: number
      playerId: number
      count: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["ownedPlayer"]>
    composites: {}
  }

  type OwnedPlayerGetPayload<S extends boolean | null | undefined | OwnedPlayerDefaultArgs> = $Result.GetResult<Prisma.$OwnedPlayerPayload, S>

  type OwnedPlayerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OwnedPlayerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OwnedPlayerCountAggregateInputType | true
    }

  export interface OwnedPlayerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OwnedPlayer'], meta: { name: 'OwnedPlayer' } }
    /**
     * Find zero or one OwnedPlayer that matches the filter.
     * @param {OwnedPlayerFindUniqueArgs} args - Arguments to find a OwnedPlayer
     * @example
     * // Get one OwnedPlayer
     * const ownedPlayer = await prisma.ownedPlayer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OwnedPlayerFindUniqueArgs>(args: SelectSubset<T, OwnedPlayerFindUniqueArgs<ExtArgs>>): Prisma__OwnedPlayerClient<$Result.GetResult<Prisma.$OwnedPlayerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OwnedPlayer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OwnedPlayerFindUniqueOrThrowArgs} args - Arguments to find a OwnedPlayer
     * @example
     * // Get one OwnedPlayer
     * const ownedPlayer = await prisma.ownedPlayer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OwnedPlayerFindUniqueOrThrowArgs>(args: SelectSubset<T, OwnedPlayerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OwnedPlayerClient<$Result.GetResult<Prisma.$OwnedPlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OwnedPlayer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnedPlayerFindFirstArgs} args - Arguments to find a OwnedPlayer
     * @example
     * // Get one OwnedPlayer
     * const ownedPlayer = await prisma.ownedPlayer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OwnedPlayerFindFirstArgs>(args?: SelectSubset<T, OwnedPlayerFindFirstArgs<ExtArgs>>): Prisma__OwnedPlayerClient<$Result.GetResult<Prisma.$OwnedPlayerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OwnedPlayer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnedPlayerFindFirstOrThrowArgs} args - Arguments to find a OwnedPlayer
     * @example
     * // Get one OwnedPlayer
     * const ownedPlayer = await prisma.ownedPlayer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OwnedPlayerFindFirstOrThrowArgs>(args?: SelectSubset<T, OwnedPlayerFindFirstOrThrowArgs<ExtArgs>>): Prisma__OwnedPlayerClient<$Result.GetResult<Prisma.$OwnedPlayerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OwnedPlayers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnedPlayerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OwnedPlayers
     * const ownedPlayers = await prisma.ownedPlayer.findMany()
     * 
     * // Get first 10 OwnedPlayers
     * const ownedPlayers = await prisma.ownedPlayer.findMany({ take: 10 })
     * 
     * // Only select the `ownedPlayerId`
     * const ownedPlayerWithOwnedPlayerIdOnly = await prisma.ownedPlayer.findMany({ select: { ownedPlayerId: true } })
     * 
     */
    findMany<T extends OwnedPlayerFindManyArgs>(args?: SelectSubset<T, OwnedPlayerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OwnedPlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OwnedPlayer.
     * @param {OwnedPlayerCreateArgs} args - Arguments to create a OwnedPlayer.
     * @example
     * // Create one OwnedPlayer
     * const OwnedPlayer = await prisma.ownedPlayer.create({
     *   data: {
     *     // ... data to create a OwnedPlayer
     *   }
     * })
     * 
     */
    create<T extends OwnedPlayerCreateArgs>(args: SelectSubset<T, OwnedPlayerCreateArgs<ExtArgs>>): Prisma__OwnedPlayerClient<$Result.GetResult<Prisma.$OwnedPlayerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OwnedPlayers.
     * @param {OwnedPlayerCreateManyArgs} args - Arguments to create many OwnedPlayers.
     * @example
     * // Create many OwnedPlayers
     * const ownedPlayer = await prisma.ownedPlayer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OwnedPlayerCreateManyArgs>(args?: SelectSubset<T, OwnedPlayerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a OwnedPlayer.
     * @param {OwnedPlayerDeleteArgs} args - Arguments to delete one OwnedPlayer.
     * @example
     * // Delete one OwnedPlayer
     * const OwnedPlayer = await prisma.ownedPlayer.delete({
     *   where: {
     *     // ... filter to delete one OwnedPlayer
     *   }
     * })
     * 
     */
    delete<T extends OwnedPlayerDeleteArgs>(args: SelectSubset<T, OwnedPlayerDeleteArgs<ExtArgs>>): Prisma__OwnedPlayerClient<$Result.GetResult<Prisma.$OwnedPlayerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OwnedPlayer.
     * @param {OwnedPlayerUpdateArgs} args - Arguments to update one OwnedPlayer.
     * @example
     * // Update one OwnedPlayer
     * const ownedPlayer = await prisma.ownedPlayer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OwnedPlayerUpdateArgs>(args: SelectSubset<T, OwnedPlayerUpdateArgs<ExtArgs>>): Prisma__OwnedPlayerClient<$Result.GetResult<Prisma.$OwnedPlayerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OwnedPlayers.
     * @param {OwnedPlayerDeleteManyArgs} args - Arguments to filter OwnedPlayers to delete.
     * @example
     * // Delete a few OwnedPlayers
     * const { count } = await prisma.ownedPlayer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OwnedPlayerDeleteManyArgs>(args?: SelectSubset<T, OwnedPlayerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OwnedPlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnedPlayerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OwnedPlayers
     * const ownedPlayer = await prisma.ownedPlayer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OwnedPlayerUpdateManyArgs>(args: SelectSubset<T, OwnedPlayerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OwnedPlayer.
     * @param {OwnedPlayerUpsertArgs} args - Arguments to update or create a OwnedPlayer.
     * @example
     * // Update or create a OwnedPlayer
     * const ownedPlayer = await prisma.ownedPlayer.upsert({
     *   create: {
     *     // ... data to create a OwnedPlayer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OwnedPlayer we want to update
     *   }
     * })
     */
    upsert<T extends OwnedPlayerUpsertArgs>(args: SelectSubset<T, OwnedPlayerUpsertArgs<ExtArgs>>): Prisma__OwnedPlayerClient<$Result.GetResult<Prisma.$OwnedPlayerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OwnedPlayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnedPlayerCountArgs} args - Arguments to filter OwnedPlayers to count.
     * @example
     * // Count the number of OwnedPlayers
     * const count = await prisma.ownedPlayer.count({
     *   where: {
     *     // ... the filter for the OwnedPlayers we want to count
     *   }
     * })
    **/
    count<T extends OwnedPlayerCountArgs>(
      args?: Subset<T, OwnedPlayerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OwnedPlayerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OwnedPlayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnedPlayerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OwnedPlayerAggregateArgs>(args: Subset<T, OwnedPlayerAggregateArgs>): Prisma.PrismaPromise<GetOwnedPlayerAggregateType<T>>

    /**
     * Group by OwnedPlayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnedPlayerGroupByArgs} args - Group by arguments.
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
      T extends OwnedPlayerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OwnedPlayerGroupByArgs['orderBy'] }
        : { orderBy?: OwnedPlayerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OwnedPlayerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOwnedPlayerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OwnedPlayer model
   */
  readonly fields: OwnedPlayerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OwnedPlayer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OwnedPlayerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    account<T extends AccountDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AccountDefaultArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    squads<T extends OwnedPlayer$squadsArgs<ExtArgs> = {}>(args?: Subset<T, OwnedPlayer$squadsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SquadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the OwnedPlayer model
   */
  interface OwnedPlayerFieldRefs {
    readonly ownedPlayerId: FieldRef<"OwnedPlayer", 'Int'>
    readonly accountId: FieldRef<"OwnedPlayer", 'Int'>
    readonly playerId: FieldRef<"OwnedPlayer", 'Int'>
    readonly count: FieldRef<"OwnedPlayer", 'Int'>
    readonly createdAt: FieldRef<"OwnedPlayer", 'DateTime'>
    readonly updatedAt: FieldRef<"OwnedPlayer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OwnedPlayer findUnique
   */
  export type OwnedPlayerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OwnedPlayer
     */
    select?: OwnedPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OwnedPlayer
     */
    omit?: OwnedPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnedPlayerInclude<ExtArgs> | null
    /**
     * Filter, which OwnedPlayer to fetch.
     */
    where: OwnedPlayerWhereUniqueInput
  }

  /**
   * OwnedPlayer findUniqueOrThrow
   */
  export type OwnedPlayerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OwnedPlayer
     */
    select?: OwnedPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OwnedPlayer
     */
    omit?: OwnedPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnedPlayerInclude<ExtArgs> | null
    /**
     * Filter, which OwnedPlayer to fetch.
     */
    where: OwnedPlayerWhereUniqueInput
  }

  /**
   * OwnedPlayer findFirst
   */
  export type OwnedPlayerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OwnedPlayer
     */
    select?: OwnedPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OwnedPlayer
     */
    omit?: OwnedPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnedPlayerInclude<ExtArgs> | null
    /**
     * Filter, which OwnedPlayer to fetch.
     */
    where?: OwnedPlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OwnedPlayers to fetch.
     */
    orderBy?: OwnedPlayerOrderByWithRelationInput | OwnedPlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OwnedPlayers.
     */
    cursor?: OwnedPlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OwnedPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OwnedPlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OwnedPlayers.
     */
    distinct?: OwnedPlayerScalarFieldEnum | OwnedPlayerScalarFieldEnum[]
  }

  /**
   * OwnedPlayer findFirstOrThrow
   */
  export type OwnedPlayerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OwnedPlayer
     */
    select?: OwnedPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OwnedPlayer
     */
    omit?: OwnedPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnedPlayerInclude<ExtArgs> | null
    /**
     * Filter, which OwnedPlayer to fetch.
     */
    where?: OwnedPlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OwnedPlayers to fetch.
     */
    orderBy?: OwnedPlayerOrderByWithRelationInput | OwnedPlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OwnedPlayers.
     */
    cursor?: OwnedPlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OwnedPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OwnedPlayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OwnedPlayers.
     */
    distinct?: OwnedPlayerScalarFieldEnum | OwnedPlayerScalarFieldEnum[]
  }

  /**
   * OwnedPlayer findMany
   */
  export type OwnedPlayerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OwnedPlayer
     */
    select?: OwnedPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OwnedPlayer
     */
    omit?: OwnedPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnedPlayerInclude<ExtArgs> | null
    /**
     * Filter, which OwnedPlayers to fetch.
     */
    where?: OwnedPlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OwnedPlayers to fetch.
     */
    orderBy?: OwnedPlayerOrderByWithRelationInput | OwnedPlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OwnedPlayers.
     */
    cursor?: OwnedPlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OwnedPlayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OwnedPlayers.
     */
    skip?: number
    distinct?: OwnedPlayerScalarFieldEnum | OwnedPlayerScalarFieldEnum[]
  }

  /**
   * OwnedPlayer create
   */
  export type OwnedPlayerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OwnedPlayer
     */
    select?: OwnedPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OwnedPlayer
     */
    omit?: OwnedPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnedPlayerInclude<ExtArgs> | null
    /**
     * The data needed to create a OwnedPlayer.
     */
    data: XOR<OwnedPlayerCreateInput, OwnedPlayerUncheckedCreateInput>
  }

  /**
   * OwnedPlayer createMany
   */
  export type OwnedPlayerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OwnedPlayers.
     */
    data: OwnedPlayerCreateManyInput | OwnedPlayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OwnedPlayer update
   */
  export type OwnedPlayerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OwnedPlayer
     */
    select?: OwnedPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OwnedPlayer
     */
    omit?: OwnedPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnedPlayerInclude<ExtArgs> | null
    /**
     * The data needed to update a OwnedPlayer.
     */
    data: XOR<OwnedPlayerUpdateInput, OwnedPlayerUncheckedUpdateInput>
    /**
     * Choose, which OwnedPlayer to update.
     */
    where: OwnedPlayerWhereUniqueInput
  }

  /**
   * OwnedPlayer updateMany
   */
  export type OwnedPlayerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OwnedPlayers.
     */
    data: XOR<OwnedPlayerUpdateManyMutationInput, OwnedPlayerUncheckedUpdateManyInput>
    /**
     * Filter which OwnedPlayers to update
     */
    where?: OwnedPlayerWhereInput
    /**
     * Limit how many OwnedPlayers to update.
     */
    limit?: number
  }

  /**
   * OwnedPlayer upsert
   */
  export type OwnedPlayerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OwnedPlayer
     */
    select?: OwnedPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OwnedPlayer
     */
    omit?: OwnedPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnedPlayerInclude<ExtArgs> | null
    /**
     * The filter to search for the OwnedPlayer to update in case it exists.
     */
    where: OwnedPlayerWhereUniqueInput
    /**
     * In case the OwnedPlayer found by the `where` argument doesn't exist, create a new OwnedPlayer with this data.
     */
    create: XOR<OwnedPlayerCreateInput, OwnedPlayerUncheckedCreateInput>
    /**
     * In case the OwnedPlayer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OwnedPlayerUpdateInput, OwnedPlayerUncheckedUpdateInput>
  }

  /**
   * OwnedPlayer delete
   */
  export type OwnedPlayerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OwnedPlayer
     */
    select?: OwnedPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OwnedPlayer
     */
    omit?: OwnedPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnedPlayerInclude<ExtArgs> | null
    /**
     * Filter which OwnedPlayer to delete.
     */
    where: OwnedPlayerWhereUniqueInput
  }

  /**
   * OwnedPlayer deleteMany
   */
  export type OwnedPlayerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OwnedPlayers to delete
     */
    where?: OwnedPlayerWhereInput
    /**
     * Limit how many OwnedPlayers to delete.
     */
    limit?: number
  }

  /**
   * OwnedPlayer.squads
   */
  export type OwnedPlayer$squadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Squad
     */
    select?: SquadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Squad
     */
    omit?: SquadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SquadInclude<ExtArgs> | null
    where?: SquadWhereInput
    orderBy?: SquadOrderByWithRelationInput | SquadOrderByWithRelationInput[]
    cursor?: SquadWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SquadScalarFieldEnum | SquadScalarFieldEnum[]
  }

  /**
   * OwnedPlayer without action
   */
  export type OwnedPlayerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OwnedPlayer
     */
    select?: OwnedPlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OwnedPlayer
     */
    omit?: OwnedPlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OwnedPlayerInclude<ExtArgs> | null
  }


  /**
   * Model Squad
   */

  export type AggregateSquad = {
    _count: SquadCountAggregateOutputType | null
    _avg: SquadAvgAggregateOutputType | null
    _sum: SquadSumAggregateOutputType | null
    _min: SquadMinAggregateOutputType | null
    _max: SquadMaxAggregateOutputType | null
  }

  export type SquadAvgAggregateOutputType = {
    squadId: number | null
    accountId: number | null
    ownedPlayerId: number | null
  }

  export type SquadSumAggregateOutputType = {
    squadId: number | null
    accountId: number | null
    ownedPlayerId: number | null
  }

  export type SquadMinAggregateOutputType = {
    squadId: number | null
    accountId: number | null
    ownedPlayerId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SquadMaxAggregateOutputType = {
    squadId: number | null
    accountId: number | null
    ownedPlayerId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SquadCountAggregateOutputType = {
    squadId: number
    accountId: number
    ownedPlayerId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SquadAvgAggregateInputType = {
    squadId?: true
    accountId?: true
    ownedPlayerId?: true
  }

  export type SquadSumAggregateInputType = {
    squadId?: true
    accountId?: true
    ownedPlayerId?: true
  }

  export type SquadMinAggregateInputType = {
    squadId?: true
    accountId?: true
    ownedPlayerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SquadMaxAggregateInputType = {
    squadId?: true
    accountId?: true
    ownedPlayerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SquadCountAggregateInputType = {
    squadId?: true
    accountId?: true
    ownedPlayerId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SquadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Squad to aggregate.
     */
    where?: SquadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Squads to fetch.
     */
    orderBy?: SquadOrderByWithRelationInput | SquadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SquadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Squads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Squads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Squads
    **/
    _count?: true | SquadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SquadAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SquadSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SquadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SquadMaxAggregateInputType
  }

  export type GetSquadAggregateType<T extends SquadAggregateArgs> = {
        [P in keyof T & keyof AggregateSquad]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSquad[P]>
      : GetScalarType<T[P], AggregateSquad[P]>
  }




  export type SquadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SquadWhereInput
    orderBy?: SquadOrderByWithAggregationInput | SquadOrderByWithAggregationInput[]
    by: SquadScalarFieldEnum[] | SquadScalarFieldEnum
    having?: SquadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SquadCountAggregateInputType | true
    _avg?: SquadAvgAggregateInputType
    _sum?: SquadSumAggregateInputType
    _min?: SquadMinAggregateInputType
    _max?: SquadMaxAggregateInputType
  }

  export type SquadGroupByOutputType = {
    squadId: number
    accountId: number
    ownedPlayerId: number
    createdAt: Date
    updatedAt: Date
    _count: SquadCountAggregateOutputType | null
    _avg: SquadAvgAggregateOutputType | null
    _sum: SquadSumAggregateOutputType | null
    _min: SquadMinAggregateOutputType | null
    _max: SquadMaxAggregateOutputType | null
  }

  type GetSquadGroupByPayload<T extends SquadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SquadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SquadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SquadGroupByOutputType[P]>
            : GetScalarType<T[P], SquadGroupByOutputType[P]>
        }
      >
    >


  export type SquadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    squadId?: boolean
    accountId?: boolean
    ownedPlayerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    account?: boolean | AccountDefaultArgs<ExtArgs>
    ownedPlayer?: boolean | OwnedPlayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["squad"]>



  export type SquadSelectScalar = {
    squadId?: boolean
    accountId?: boolean
    ownedPlayerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SquadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"squadId" | "accountId" | "ownedPlayerId" | "createdAt" | "updatedAt", ExtArgs["result"]["squad"]>
  export type SquadInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | AccountDefaultArgs<ExtArgs>
    ownedPlayer?: boolean | OwnedPlayerDefaultArgs<ExtArgs>
  }

  export type $SquadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Squad"
    objects: {
      account: Prisma.$AccountPayload<ExtArgs>
      ownedPlayer: Prisma.$OwnedPlayerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      squadId: number
      accountId: number
      ownedPlayerId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["squad"]>
    composites: {}
  }

  type SquadGetPayload<S extends boolean | null | undefined | SquadDefaultArgs> = $Result.GetResult<Prisma.$SquadPayload, S>

  type SquadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SquadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SquadCountAggregateInputType | true
    }

  export interface SquadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Squad'], meta: { name: 'Squad' } }
    /**
     * Find zero or one Squad that matches the filter.
     * @param {SquadFindUniqueArgs} args - Arguments to find a Squad
     * @example
     * // Get one Squad
     * const squad = await prisma.squad.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SquadFindUniqueArgs>(args: SelectSubset<T, SquadFindUniqueArgs<ExtArgs>>): Prisma__SquadClient<$Result.GetResult<Prisma.$SquadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Squad that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SquadFindUniqueOrThrowArgs} args - Arguments to find a Squad
     * @example
     * // Get one Squad
     * const squad = await prisma.squad.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SquadFindUniqueOrThrowArgs>(args: SelectSubset<T, SquadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SquadClient<$Result.GetResult<Prisma.$SquadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Squad that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SquadFindFirstArgs} args - Arguments to find a Squad
     * @example
     * // Get one Squad
     * const squad = await prisma.squad.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SquadFindFirstArgs>(args?: SelectSubset<T, SquadFindFirstArgs<ExtArgs>>): Prisma__SquadClient<$Result.GetResult<Prisma.$SquadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Squad that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SquadFindFirstOrThrowArgs} args - Arguments to find a Squad
     * @example
     * // Get one Squad
     * const squad = await prisma.squad.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SquadFindFirstOrThrowArgs>(args?: SelectSubset<T, SquadFindFirstOrThrowArgs<ExtArgs>>): Prisma__SquadClient<$Result.GetResult<Prisma.$SquadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Squads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SquadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Squads
     * const squads = await prisma.squad.findMany()
     * 
     * // Get first 10 Squads
     * const squads = await prisma.squad.findMany({ take: 10 })
     * 
     * // Only select the `squadId`
     * const squadWithSquadIdOnly = await prisma.squad.findMany({ select: { squadId: true } })
     * 
     */
    findMany<T extends SquadFindManyArgs>(args?: SelectSubset<T, SquadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SquadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Squad.
     * @param {SquadCreateArgs} args - Arguments to create a Squad.
     * @example
     * // Create one Squad
     * const Squad = await prisma.squad.create({
     *   data: {
     *     // ... data to create a Squad
     *   }
     * })
     * 
     */
    create<T extends SquadCreateArgs>(args: SelectSubset<T, SquadCreateArgs<ExtArgs>>): Prisma__SquadClient<$Result.GetResult<Prisma.$SquadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Squads.
     * @param {SquadCreateManyArgs} args - Arguments to create many Squads.
     * @example
     * // Create many Squads
     * const squad = await prisma.squad.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SquadCreateManyArgs>(args?: SelectSubset<T, SquadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Squad.
     * @param {SquadDeleteArgs} args - Arguments to delete one Squad.
     * @example
     * // Delete one Squad
     * const Squad = await prisma.squad.delete({
     *   where: {
     *     // ... filter to delete one Squad
     *   }
     * })
     * 
     */
    delete<T extends SquadDeleteArgs>(args: SelectSubset<T, SquadDeleteArgs<ExtArgs>>): Prisma__SquadClient<$Result.GetResult<Prisma.$SquadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Squad.
     * @param {SquadUpdateArgs} args - Arguments to update one Squad.
     * @example
     * // Update one Squad
     * const squad = await prisma.squad.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SquadUpdateArgs>(args: SelectSubset<T, SquadUpdateArgs<ExtArgs>>): Prisma__SquadClient<$Result.GetResult<Prisma.$SquadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Squads.
     * @param {SquadDeleteManyArgs} args - Arguments to filter Squads to delete.
     * @example
     * // Delete a few Squads
     * const { count } = await prisma.squad.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SquadDeleteManyArgs>(args?: SelectSubset<T, SquadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Squads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SquadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Squads
     * const squad = await prisma.squad.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SquadUpdateManyArgs>(args: SelectSubset<T, SquadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Squad.
     * @param {SquadUpsertArgs} args - Arguments to update or create a Squad.
     * @example
     * // Update or create a Squad
     * const squad = await prisma.squad.upsert({
     *   create: {
     *     // ... data to create a Squad
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Squad we want to update
     *   }
     * })
     */
    upsert<T extends SquadUpsertArgs>(args: SelectSubset<T, SquadUpsertArgs<ExtArgs>>): Prisma__SquadClient<$Result.GetResult<Prisma.$SquadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Squads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SquadCountArgs} args - Arguments to filter Squads to count.
     * @example
     * // Count the number of Squads
     * const count = await prisma.squad.count({
     *   where: {
     *     // ... the filter for the Squads we want to count
     *   }
     * })
    **/
    count<T extends SquadCountArgs>(
      args?: Subset<T, SquadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SquadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Squad.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SquadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SquadAggregateArgs>(args: Subset<T, SquadAggregateArgs>): Prisma.PrismaPromise<GetSquadAggregateType<T>>

    /**
     * Group by Squad.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SquadGroupByArgs} args - Group by arguments.
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
      T extends SquadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SquadGroupByArgs['orderBy'] }
        : { orderBy?: SquadGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SquadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSquadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Squad model
   */
  readonly fields: SquadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Squad.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SquadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    account<T extends AccountDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AccountDefaultArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    ownedPlayer<T extends OwnedPlayerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OwnedPlayerDefaultArgs<ExtArgs>>): Prisma__OwnedPlayerClient<$Result.GetResult<Prisma.$OwnedPlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Squad model
   */
  interface SquadFieldRefs {
    readonly squadId: FieldRef<"Squad", 'Int'>
    readonly accountId: FieldRef<"Squad", 'Int'>
    readonly ownedPlayerId: FieldRef<"Squad", 'Int'>
    readonly createdAt: FieldRef<"Squad", 'DateTime'>
    readonly updatedAt: FieldRef<"Squad", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Squad findUnique
   */
  export type SquadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Squad
     */
    select?: SquadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Squad
     */
    omit?: SquadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SquadInclude<ExtArgs> | null
    /**
     * Filter, which Squad to fetch.
     */
    where: SquadWhereUniqueInput
  }

  /**
   * Squad findUniqueOrThrow
   */
  export type SquadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Squad
     */
    select?: SquadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Squad
     */
    omit?: SquadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SquadInclude<ExtArgs> | null
    /**
     * Filter, which Squad to fetch.
     */
    where: SquadWhereUniqueInput
  }

  /**
   * Squad findFirst
   */
  export type SquadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Squad
     */
    select?: SquadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Squad
     */
    omit?: SquadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SquadInclude<ExtArgs> | null
    /**
     * Filter, which Squad to fetch.
     */
    where?: SquadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Squads to fetch.
     */
    orderBy?: SquadOrderByWithRelationInput | SquadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Squads.
     */
    cursor?: SquadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Squads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Squads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Squads.
     */
    distinct?: SquadScalarFieldEnum | SquadScalarFieldEnum[]
  }

  /**
   * Squad findFirstOrThrow
   */
  export type SquadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Squad
     */
    select?: SquadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Squad
     */
    omit?: SquadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SquadInclude<ExtArgs> | null
    /**
     * Filter, which Squad to fetch.
     */
    where?: SquadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Squads to fetch.
     */
    orderBy?: SquadOrderByWithRelationInput | SquadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Squads.
     */
    cursor?: SquadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Squads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Squads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Squads.
     */
    distinct?: SquadScalarFieldEnum | SquadScalarFieldEnum[]
  }

  /**
   * Squad findMany
   */
  export type SquadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Squad
     */
    select?: SquadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Squad
     */
    omit?: SquadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SquadInclude<ExtArgs> | null
    /**
     * Filter, which Squads to fetch.
     */
    where?: SquadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Squads to fetch.
     */
    orderBy?: SquadOrderByWithRelationInput | SquadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Squads.
     */
    cursor?: SquadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Squads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Squads.
     */
    skip?: number
    distinct?: SquadScalarFieldEnum | SquadScalarFieldEnum[]
  }

  /**
   * Squad create
   */
  export type SquadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Squad
     */
    select?: SquadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Squad
     */
    omit?: SquadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SquadInclude<ExtArgs> | null
    /**
     * The data needed to create a Squad.
     */
    data: XOR<SquadCreateInput, SquadUncheckedCreateInput>
  }

  /**
   * Squad createMany
   */
  export type SquadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Squads.
     */
    data: SquadCreateManyInput | SquadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Squad update
   */
  export type SquadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Squad
     */
    select?: SquadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Squad
     */
    omit?: SquadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SquadInclude<ExtArgs> | null
    /**
     * The data needed to update a Squad.
     */
    data: XOR<SquadUpdateInput, SquadUncheckedUpdateInput>
    /**
     * Choose, which Squad to update.
     */
    where: SquadWhereUniqueInput
  }

  /**
   * Squad updateMany
   */
  export type SquadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Squads.
     */
    data: XOR<SquadUpdateManyMutationInput, SquadUncheckedUpdateManyInput>
    /**
     * Filter which Squads to update
     */
    where?: SquadWhereInput
    /**
     * Limit how many Squads to update.
     */
    limit?: number
  }

  /**
   * Squad upsert
   */
  export type SquadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Squad
     */
    select?: SquadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Squad
     */
    omit?: SquadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SquadInclude<ExtArgs> | null
    /**
     * The filter to search for the Squad to update in case it exists.
     */
    where: SquadWhereUniqueInput
    /**
     * In case the Squad found by the `where` argument doesn't exist, create a new Squad with this data.
     */
    create: XOR<SquadCreateInput, SquadUncheckedCreateInput>
    /**
     * In case the Squad was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SquadUpdateInput, SquadUncheckedUpdateInput>
  }

  /**
   * Squad delete
   */
  export type SquadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Squad
     */
    select?: SquadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Squad
     */
    omit?: SquadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SquadInclude<ExtArgs> | null
    /**
     * Filter which Squad to delete.
     */
    where: SquadWhereUniqueInput
  }

  /**
   * Squad deleteMany
   */
  export type SquadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Squads to delete
     */
    where?: SquadWhereInput
    /**
     * Limit how many Squads to delete.
     */
    limit?: number
  }

  /**
   * Squad without action
   */
  export type SquadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Squad
     */
    select?: SquadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Squad
     */
    omit?: SquadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SquadInclude<ExtArgs> | null
  }


  /**
   * Model RefreshToken
   */

  export type AggregateRefreshToken = {
    _count: RefreshTokenCountAggregateOutputType | null
    _avg: RefreshTokenAvgAggregateOutputType | null
    _sum: RefreshTokenSumAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  export type RefreshTokenAvgAggregateOutputType = {
    refreshTokenId: number | null
    accountId: number | null
  }

  export type RefreshTokenSumAggregateOutputType = {
    refreshTokenId: number | null
    accountId: number | null
  }

  export type RefreshTokenMinAggregateOutputType = {
    refreshTokenId: number | null
    accountId: number | null
    token: string | null
    createdAt: Date | null
  }

  export type RefreshTokenMaxAggregateOutputType = {
    refreshTokenId: number | null
    accountId: number | null
    token: string | null
    createdAt: Date | null
  }

  export type RefreshTokenCountAggregateOutputType = {
    refreshTokenId: number
    accountId: number
    token: number
    createdAt: number
    _all: number
  }


  export type RefreshTokenAvgAggregateInputType = {
    refreshTokenId?: true
    accountId?: true
  }

  export type RefreshTokenSumAggregateInputType = {
    refreshTokenId?: true
    accountId?: true
  }

  export type RefreshTokenMinAggregateInputType = {
    refreshTokenId?: true
    accountId?: true
    token?: true
    createdAt?: true
  }

  export type RefreshTokenMaxAggregateInputType = {
    refreshTokenId?: true
    accountId?: true
    token?: true
    createdAt?: true
  }

  export type RefreshTokenCountAggregateInputType = {
    refreshTokenId?: true
    accountId?: true
    token?: true
    createdAt?: true
    _all?: true
  }

  export type RefreshTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshToken to aggregate.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RefreshTokens
    **/
    _count?: true | RefreshTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RefreshTokenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RefreshTokenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RefreshTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type GetRefreshTokenAggregateType<T extends RefreshTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateRefreshToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefreshToken[P]>
      : GetScalarType<T[P], AggregateRefreshToken[P]>
  }




  export type RefreshTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithAggregationInput | RefreshTokenOrderByWithAggregationInput[]
    by: RefreshTokenScalarFieldEnum[] | RefreshTokenScalarFieldEnum
    having?: RefreshTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RefreshTokenCountAggregateInputType | true
    _avg?: RefreshTokenAvgAggregateInputType
    _sum?: RefreshTokenSumAggregateInputType
    _min?: RefreshTokenMinAggregateInputType
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type RefreshTokenGroupByOutputType = {
    refreshTokenId: number
    accountId: number
    token: string
    createdAt: Date
    _count: RefreshTokenCountAggregateOutputType | null
    _avg: RefreshTokenAvgAggregateOutputType | null
    _sum: RefreshTokenSumAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  type GetRefreshTokenGroupByPayload<T extends RefreshTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefreshTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RefreshTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
            : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
        }
      >
    >


  export type RefreshTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    refreshTokenId?: boolean
    accountId?: boolean
    token?: boolean
    createdAt?: boolean
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>



  export type RefreshTokenSelectScalar = {
    refreshTokenId?: boolean
    accountId?: boolean
    token?: boolean
    createdAt?: boolean
  }

  export type RefreshTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"refreshTokenId" | "accountId" | "token" | "createdAt", ExtArgs["result"]["refreshToken"]>
  export type RefreshTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | AccountDefaultArgs<ExtArgs>
  }

  export type $RefreshTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RefreshToken"
    objects: {
      account: Prisma.$AccountPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      refreshTokenId: number
      accountId: number
      token: string
      createdAt: Date
    }, ExtArgs["result"]["refreshToken"]>
    composites: {}
  }

  type RefreshTokenGetPayload<S extends boolean | null | undefined | RefreshTokenDefaultArgs> = $Result.GetResult<Prisma.$RefreshTokenPayload, S>

  type RefreshTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RefreshTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RefreshTokenCountAggregateInputType | true
    }

  export interface RefreshTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RefreshToken'], meta: { name: 'RefreshToken' } }
    /**
     * Find zero or one RefreshToken that matches the filter.
     * @param {RefreshTokenFindUniqueArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefreshTokenFindUniqueArgs>(args: SelectSubset<T, RefreshTokenFindUniqueArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RefreshToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RefreshTokenFindUniqueOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefreshTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, RefreshTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefreshTokenFindFirstArgs>(args?: SelectSubset<T, RefreshTokenFindFirstArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefreshTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, RefreshTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RefreshTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany()
     * 
     * // Get first 10 RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany({ take: 10 })
     * 
     * // Only select the `refreshTokenId`
     * const refreshTokenWithRefreshTokenIdOnly = await prisma.refreshToken.findMany({ select: { refreshTokenId: true } })
     * 
     */
    findMany<T extends RefreshTokenFindManyArgs>(args?: SelectSubset<T, RefreshTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RefreshToken.
     * @param {RefreshTokenCreateArgs} args - Arguments to create a RefreshToken.
     * @example
     * // Create one RefreshToken
     * const RefreshToken = await prisma.refreshToken.create({
     *   data: {
     *     // ... data to create a RefreshToken
     *   }
     * })
     * 
     */
    create<T extends RefreshTokenCreateArgs>(args: SelectSubset<T, RefreshTokenCreateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RefreshTokens.
     * @param {RefreshTokenCreateManyArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RefreshTokenCreateManyArgs>(args?: SelectSubset<T, RefreshTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a RefreshToken.
     * @param {RefreshTokenDeleteArgs} args - Arguments to delete one RefreshToken.
     * @example
     * // Delete one RefreshToken
     * const RefreshToken = await prisma.refreshToken.delete({
     *   where: {
     *     // ... filter to delete one RefreshToken
     *   }
     * })
     * 
     */
    delete<T extends RefreshTokenDeleteArgs>(args: SelectSubset<T, RefreshTokenDeleteArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RefreshToken.
     * @param {RefreshTokenUpdateArgs} args - Arguments to update one RefreshToken.
     * @example
     * // Update one RefreshToken
     * const refreshToken = await prisma.refreshToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RefreshTokenUpdateArgs>(args: SelectSubset<T, RefreshTokenUpdateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RefreshTokens.
     * @param {RefreshTokenDeleteManyArgs} args - Arguments to filter RefreshTokens to delete.
     * @example
     * // Delete a few RefreshTokens
     * const { count } = await prisma.refreshToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RefreshTokenDeleteManyArgs>(args?: SelectSubset<T, RefreshTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RefreshTokenUpdateManyArgs>(args: SelectSubset<T, RefreshTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RefreshToken.
     * @param {RefreshTokenUpsertArgs} args - Arguments to update or create a RefreshToken.
     * @example
     * // Update or create a RefreshToken
     * const refreshToken = await prisma.refreshToken.upsert({
     *   create: {
     *     // ... data to create a RefreshToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RefreshToken we want to update
     *   }
     * })
     */
    upsert<T extends RefreshTokenUpsertArgs>(args: SelectSubset<T, RefreshTokenUpsertArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenCountArgs} args - Arguments to filter RefreshTokens to count.
     * @example
     * // Count the number of RefreshTokens
     * const count = await prisma.refreshToken.count({
     *   where: {
     *     // ... the filter for the RefreshTokens we want to count
     *   }
     * })
    **/
    count<T extends RefreshTokenCountArgs>(
      args?: Subset<T, RefreshTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefreshTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RefreshTokenAggregateArgs>(args: Subset<T, RefreshTokenAggregateArgs>): Prisma.PrismaPromise<GetRefreshTokenAggregateType<T>>

    /**
     * Group by RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenGroupByArgs} args - Group by arguments.
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
      T extends RefreshTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefreshTokenGroupByArgs['orderBy'] }
        : { orderBy?: RefreshTokenGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RefreshTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefreshTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RefreshToken model
   */
  readonly fields: RefreshTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RefreshToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefreshTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    account<T extends AccountDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AccountDefaultArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the RefreshToken model
   */
  interface RefreshTokenFieldRefs {
    readonly refreshTokenId: FieldRef<"RefreshToken", 'Int'>
    readonly accountId: FieldRef<"RefreshToken", 'Int'>
    readonly token: FieldRef<"RefreshToken", 'String'>
    readonly createdAt: FieldRef<"RefreshToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RefreshToken findUnique
   */
  export type RefreshTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findUniqueOrThrow
   */
  export type RefreshTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findFirst
   */
  export type RefreshTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findFirstOrThrow
   */
  export type RefreshTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findMany
   */
  export type RefreshTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshTokens to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken create
   */
  export type RefreshTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a RefreshToken.
     */
    data: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
  }

  /**
   * RefreshToken createMany
   */
  export type RefreshTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RefreshToken update
   */
  export type RefreshTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a RefreshToken.
     */
    data: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
    /**
     * Choose, which RefreshToken to update.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken updateMany
   */
  export type RefreshTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
  }

  /**
   * RefreshToken upsert
   */
  export type RefreshTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the RefreshToken to update in case it exists.
     */
    where: RefreshTokenWhereUniqueInput
    /**
     * In case the RefreshToken found by the `where` argument doesn't exist, create a new RefreshToken with this data.
     */
    create: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
    /**
     * In case the RefreshToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
  }

  /**
   * RefreshToken delete
   */
  export type RefreshTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter which RefreshToken to delete.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken deleteMany
   */
  export type RefreshTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshTokens to delete
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to delete.
     */
    limit?: number
  }

  /**
   * RefreshToken without action
   */
  export type RefreshTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
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


  export const AccountScalarFieldEnum: {
    accountId: 'accountId',
    email: 'email',
    userId: 'userId',
    password: 'password',
    cash: 'cash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const OwnedPlayerScalarFieldEnum: {
    ownedPlayerId: 'ownedPlayerId',
    accountId: 'accountId',
    playerId: 'playerId',
    count: 'count',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OwnedPlayerScalarFieldEnum = (typeof OwnedPlayerScalarFieldEnum)[keyof typeof OwnedPlayerScalarFieldEnum]


  export const SquadScalarFieldEnum: {
    squadId: 'squadId',
    accountId: 'accountId',
    ownedPlayerId: 'ownedPlayerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SquadScalarFieldEnum = (typeof SquadScalarFieldEnum)[keyof typeof SquadScalarFieldEnum]


  export const RefreshTokenScalarFieldEnum: {
    refreshTokenId: 'refreshTokenId',
    accountId: 'accountId',
    token: 'token',
    createdAt: 'createdAt'
  };

  export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const AccountOrderByRelevanceFieldEnum: {
    email: 'email',
    userId: 'userId',
    password: 'password'
  };

  export type AccountOrderByRelevanceFieldEnum = (typeof AccountOrderByRelevanceFieldEnum)[keyof typeof AccountOrderByRelevanceFieldEnum]


  export const RefreshTokenOrderByRelevanceFieldEnum: {
    token: 'token'
  };

  export type RefreshTokenOrderByRelevanceFieldEnum = (typeof RefreshTokenOrderByRelevanceFieldEnum)[keyof typeof RefreshTokenOrderByRelevanceFieldEnum]


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


  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    accountId?: IntFilter<"Account"> | number
    email?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    password?: StringFilter<"Account"> | string
    cash?: IntFilter<"Account"> | number
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    refreshToken?: XOR<RefreshTokenNullableScalarRelationFilter, RefreshTokenWhereInput> | null
    squads?: SquadListRelationFilter
    ownedPlayers?: OwnedPlayerListRelationFilter
  }

  export type AccountOrderByWithRelationInput = {
    accountId?: SortOrder
    email?: SortOrder
    userId?: SortOrder
    password?: SortOrder
    cash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    refreshToken?: RefreshTokenOrderByWithRelationInput
    squads?: SquadOrderByRelationAggregateInput
    ownedPlayers?: OwnedPlayerOrderByRelationAggregateInput
    _relevance?: AccountOrderByRelevanceInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    accountId?: number
    email?: string
    userId?: string
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    password?: StringFilter<"Account"> | string
    cash?: IntFilter<"Account"> | number
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    refreshToken?: XOR<RefreshTokenNullableScalarRelationFilter, RefreshTokenWhereInput> | null
    squads?: SquadListRelationFilter
    ownedPlayers?: OwnedPlayerListRelationFilter
  }, "accountId" | "email" | "userId">

  export type AccountOrderByWithAggregationInput = {
    accountId?: SortOrder
    email?: SortOrder
    userId?: SortOrder
    password?: SortOrder
    cash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    accountId?: IntWithAggregatesFilter<"Account"> | number
    email?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    password?: StringWithAggregatesFilter<"Account"> | string
    cash?: IntWithAggregatesFilter<"Account"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type OwnedPlayerWhereInput = {
    AND?: OwnedPlayerWhereInput | OwnedPlayerWhereInput[]
    OR?: OwnedPlayerWhereInput[]
    NOT?: OwnedPlayerWhereInput | OwnedPlayerWhereInput[]
    ownedPlayerId?: IntFilter<"OwnedPlayer"> | number
    accountId?: IntFilter<"OwnedPlayer"> | number
    playerId?: IntFilter<"OwnedPlayer"> | number
    count?: IntFilter<"OwnedPlayer"> | number
    createdAt?: DateTimeFilter<"OwnedPlayer"> | Date | string
    updatedAt?: DateTimeFilter<"OwnedPlayer"> | Date | string
    account?: XOR<AccountScalarRelationFilter, AccountWhereInput>
    squads?: SquadListRelationFilter
  }

  export type OwnedPlayerOrderByWithRelationInput = {
    ownedPlayerId?: SortOrder
    accountId?: SortOrder
    playerId?: SortOrder
    count?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    account?: AccountOrderByWithRelationInput
    squads?: SquadOrderByRelationAggregateInput
  }

  export type OwnedPlayerWhereUniqueInput = Prisma.AtLeast<{
    ownedPlayerId?: number
    AND?: OwnedPlayerWhereInput | OwnedPlayerWhereInput[]
    OR?: OwnedPlayerWhereInput[]
    NOT?: OwnedPlayerWhereInput | OwnedPlayerWhereInput[]
    accountId?: IntFilter<"OwnedPlayer"> | number
    playerId?: IntFilter<"OwnedPlayer"> | number
    count?: IntFilter<"OwnedPlayer"> | number
    createdAt?: DateTimeFilter<"OwnedPlayer"> | Date | string
    updatedAt?: DateTimeFilter<"OwnedPlayer"> | Date | string
    account?: XOR<AccountScalarRelationFilter, AccountWhereInput>
    squads?: SquadListRelationFilter
  }, "ownedPlayerId">

  export type OwnedPlayerOrderByWithAggregationInput = {
    ownedPlayerId?: SortOrder
    accountId?: SortOrder
    playerId?: SortOrder
    count?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OwnedPlayerCountOrderByAggregateInput
    _avg?: OwnedPlayerAvgOrderByAggregateInput
    _max?: OwnedPlayerMaxOrderByAggregateInput
    _min?: OwnedPlayerMinOrderByAggregateInput
    _sum?: OwnedPlayerSumOrderByAggregateInput
  }

  export type OwnedPlayerScalarWhereWithAggregatesInput = {
    AND?: OwnedPlayerScalarWhereWithAggregatesInput | OwnedPlayerScalarWhereWithAggregatesInput[]
    OR?: OwnedPlayerScalarWhereWithAggregatesInput[]
    NOT?: OwnedPlayerScalarWhereWithAggregatesInput | OwnedPlayerScalarWhereWithAggregatesInput[]
    ownedPlayerId?: IntWithAggregatesFilter<"OwnedPlayer"> | number
    accountId?: IntWithAggregatesFilter<"OwnedPlayer"> | number
    playerId?: IntWithAggregatesFilter<"OwnedPlayer"> | number
    count?: IntWithAggregatesFilter<"OwnedPlayer"> | number
    createdAt?: DateTimeWithAggregatesFilter<"OwnedPlayer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"OwnedPlayer"> | Date | string
  }

  export type SquadWhereInput = {
    AND?: SquadWhereInput | SquadWhereInput[]
    OR?: SquadWhereInput[]
    NOT?: SquadWhereInput | SquadWhereInput[]
    squadId?: IntFilter<"Squad"> | number
    accountId?: IntFilter<"Squad"> | number
    ownedPlayerId?: IntFilter<"Squad"> | number
    createdAt?: DateTimeFilter<"Squad"> | Date | string
    updatedAt?: DateTimeFilter<"Squad"> | Date | string
    account?: XOR<AccountScalarRelationFilter, AccountWhereInput>
    ownedPlayer?: XOR<OwnedPlayerScalarRelationFilter, OwnedPlayerWhereInput>
  }

  export type SquadOrderByWithRelationInput = {
    squadId?: SortOrder
    accountId?: SortOrder
    ownedPlayerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    account?: AccountOrderByWithRelationInput
    ownedPlayer?: OwnedPlayerOrderByWithRelationInput
  }

  export type SquadWhereUniqueInput = Prisma.AtLeast<{
    squadId?: number
    AND?: SquadWhereInput | SquadWhereInput[]
    OR?: SquadWhereInput[]
    NOT?: SquadWhereInput | SquadWhereInput[]
    accountId?: IntFilter<"Squad"> | number
    ownedPlayerId?: IntFilter<"Squad"> | number
    createdAt?: DateTimeFilter<"Squad"> | Date | string
    updatedAt?: DateTimeFilter<"Squad"> | Date | string
    account?: XOR<AccountScalarRelationFilter, AccountWhereInput>
    ownedPlayer?: XOR<OwnedPlayerScalarRelationFilter, OwnedPlayerWhereInput>
  }, "squadId">

  export type SquadOrderByWithAggregationInput = {
    squadId?: SortOrder
    accountId?: SortOrder
    ownedPlayerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SquadCountOrderByAggregateInput
    _avg?: SquadAvgOrderByAggregateInput
    _max?: SquadMaxOrderByAggregateInput
    _min?: SquadMinOrderByAggregateInput
    _sum?: SquadSumOrderByAggregateInput
  }

  export type SquadScalarWhereWithAggregatesInput = {
    AND?: SquadScalarWhereWithAggregatesInput | SquadScalarWhereWithAggregatesInput[]
    OR?: SquadScalarWhereWithAggregatesInput[]
    NOT?: SquadScalarWhereWithAggregatesInput | SquadScalarWhereWithAggregatesInput[]
    squadId?: IntWithAggregatesFilter<"Squad"> | number
    accountId?: IntWithAggregatesFilter<"Squad"> | number
    ownedPlayerId?: IntWithAggregatesFilter<"Squad"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Squad"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Squad"> | Date | string
  }

  export type RefreshTokenWhereInput = {
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    refreshTokenId?: IntFilter<"RefreshToken"> | number
    accountId?: IntFilter<"RefreshToken"> | number
    token?: StringFilter<"RefreshToken"> | string
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    account?: XOR<AccountScalarRelationFilter, AccountWhereInput>
  }

  export type RefreshTokenOrderByWithRelationInput = {
    refreshTokenId?: SortOrder
    accountId?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    account?: AccountOrderByWithRelationInput
    _relevance?: RefreshTokenOrderByRelevanceInput
  }

  export type RefreshTokenWhereUniqueInput = Prisma.AtLeast<{
    refreshTokenId?: number
    accountId?: number
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    token?: StringFilter<"RefreshToken"> | string
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    account?: XOR<AccountScalarRelationFilter, AccountWhereInput>
  }, "refreshTokenId" | "accountId">

  export type RefreshTokenOrderByWithAggregationInput = {
    refreshTokenId?: SortOrder
    accountId?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    _count?: RefreshTokenCountOrderByAggregateInput
    _avg?: RefreshTokenAvgOrderByAggregateInput
    _max?: RefreshTokenMaxOrderByAggregateInput
    _min?: RefreshTokenMinOrderByAggregateInput
    _sum?: RefreshTokenSumOrderByAggregateInput
  }

  export type RefreshTokenScalarWhereWithAggregatesInput = {
    AND?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    OR?: RefreshTokenScalarWhereWithAggregatesInput[]
    NOT?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    refreshTokenId?: IntWithAggregatesFilter<"RefreshToken"> | number
    accountId?: IntWithAggregatesFilter<"RefreshToken"> | number
    token?: StringWithAggregatesFilter<"RefreshToken"> | string
    createdAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
  }

  export type AccountCreateInput = {
    email: string
    userId: string
    password: string
    cash: number
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshToken?: RefreshTokenCreateNestedOneWithoutAccountInput
    squads?: SquadCreateNestedManyWithoutAccountInput
    ownedPlayers?: OwnedPlayerCreateNestedManyWithoutAccountInput
  }

  export type AccountUncheckedCreateInput = {
    accountId?: number
    email: string
    userId: string
    password: string
    cash: number
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshToken?: RefreshTokenUncheckedCreateNestedOneWithoutAccountInput
    squads?: SquadUncheckedCreateNestedManyWithoutAccountInput
    ownedPlayers?: OwnedPlayerUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    cash?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshToken?: RefreshTokenUpdateOneWithoutAccountNestedInput
    squads?: SquadUpdateManyWithoutAccountNestedInput
    ownedPlayers?: OwnedPlayerUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    accountId?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    cash?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshToken?: RefreshTokenUncheckedUpdateOneWithoutAccountNestedInput
    squads?: SquadUncheckedUpdateManyWithoutAccountNestedInput
    ownedPlayers?: OwnedPlayerUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type AccountCreateManyInput = {
    accountId?: number
    email: string
    userId: string
    password: string
    cash: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    cash?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    accountId?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    cash?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OwnedPlayerCreateInput = {
    playerId: number
    count: number
    createdAt?: Date | string
    updatedAt?: Date | string
    account: AccountCreateNestedOneWithoutOwnedPlayersInput
    squads?: SquadCreateNestedManyWithoutOwnedPlayerInput
  }

  export type OwnedPlayerUncheckedCreateInput = {
    ownedPlayerId?: number
    accountId: number
    playerId: number
    count: number
    createdAt?: Date | string
    updatedAt?: Date | string
    squads?: SquadUncheckedCreateNestedManyWithoutOwnedPlayerInput
  }

  export type OwnedPlayerUpdateInput = {
    playerId?: IntFieldUpdateOperationsInput | number
    count?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    account?: AccountUpdateOneRequiredWithoutOwnedPlayersNestedInput
    squads?: SquadUpdateManyWithoutOwnedPlayerNestedInput
  }

  export type OwnedPlayerUncheckedUpdateInput = {
    ownedPlayerId?: IntFieldUpdateOperationsInput | number
    accountId?: IntFieldUpdateOperationsInput | number
    playerId?: IntFieldUpdateOperationsInput | number
    count?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    squads?: SquadUncheckedUpdateManyWithoutOwnedPlayerNestedInput
  }

  export type OwnedPlayerCreateManyInput = {
    ownedPlayerId?: number
    accountId: number
    playerId: number
    count: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OwnedPlayerUpdateManyMutationInput = {
    playerId?: IntFieldUpdateOperationsInput | number
    count?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OwnedPlayerUncheckedUpdateManyInput = {
    ownedPlayerId?: IntFieldUpdateOperationsInput | number
    accountId?: IntFieldUpdateOperationsInput | number
    playerId?: IntFieldUpdateOperationsInput | number
    count?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SquadCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    account: AccountCreateNestedOneWithoutSquadsInput
    ownedPlayer: OwnedPlayerCreateNestedOneWithoutSquadsInput
  }

  export type SquadUncheckedCreateInput = {
    squadId?: number
    accountId: number
    ownedPlayerId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SquadUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    account?: AccountUpdateOneRequiredWithoutSquadsNestedInput
    ownedPlayer?: OwnedPlayerUpdateOneRequiredWithoutSquadsNestedInput
  }

  export type SquadUncheckedUpdateInput = {
    squadId?: IntFieldUpdateOperationsInput | number
    accountId?: IntFieldUpdateOperationsInput | number
    ownedPlayerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SquadCreateManyInput = {
    squadId?: number
    accountId: number
    ownedPlayerId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SquadUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SquadUncheckedUpdateManyInput = {
    squadId?: IntFieldUpdateOperationsInput | number
    accountId?: IntFieldUpdateOperationsInput | number
    ownedPlayerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateInput = {
    token: string
    createdAt?: Date | string
    account: AccountCreateNestedOneWithoutRefreshTokenInput
  }

  export type RefreshTokenUncheckedCreateInput = {
    refreshTokenId?: number
    accountId: number
    token: string
    createdAt?: Date | string
  }

  export type RefreshTokenUpdateInput = {
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    account?: AccountUpdateOneRequiredWithoutRefreshTokenNestedInput
  }

  export type RefreshTokenUncheckedUpdateInput = {
    refreshTokenId?: IntFieldUpdateOperationsInput | number
    accountId?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateManyInput = {
    refreshTokenId?: number
    accountId: number
    token: string
    createdAt?: Date | string
  }

  export type RefreshTokenUpdateManyMutationInput = {
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateManyInput = {
    refreshTokenId?: IntFieldUpdateOperationsInput | number
    accountId?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type RefreshTokenNullableScalarRelationFilter = {
    is?: RefreshTokenWhereInput | null
    isNot?: RefreshTokenWhereInput | null
  }

  export type SquadListRelationFilter = {
    every?: SquadWhereInput
    some?: SquadWhereInput
    none?: SquadWhereInput
  }

  export type OwnedPlayerListRelationFilter = {
    every?: OwnedPlayerWhereInput
    some?: OwnedPlayerWhereInput
    none?: OwnedPlayerWhereInput
  }

  export type SquadOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OwnedPlayerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountOrderByRelevanceInput = {
    fields: AccountOrderByRelevanceFieldEnum | AccountOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AccountCountOrderByAggregateInput = {
    accountId?: SortOrder
    email?: SortOrder
    userId?: SortOrder
    password?: SortOrder
    cash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    accountId?: SortOrder
    cash?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    accountId?: SortOrder
    email?: SortOrder
    userId?: SortOrder
    password?: SortOrder
    cash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    accountId?: SortOrder
    email?: SortOrder
    userId?: SortOrder
    password?: SortOrder
    cash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    accountId?: SortOrder
    cash?: SortOrder
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

  export type AccountScalarRelationFilter = {
    is?: AccountWhereInput
    isNot?: AccountWhereInput
  }

  export type OwnedPlayerCountOrderByAggregateInput = {
    ownedPlayerId?: SortOrder
    accountId?: SortOrder
    playerId?: SortOrder
    count?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OwnedPlayerAvgOrderByAggregateInput = {
    ownedPlayerId?: SortOrder
    accountId?: SortOrder
    playerId?: SortOrder
    count?: SortOrder
  }

  export type OwnedPlayerMaxOrderByAggregateInput = {
    ownedPlayerId?: SortOrder
    accountId?: SortOrder
    playerId?: SortOrder
    count?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OwnedPlayerMinOrderByAggregateInput = {
    ownedPlayerId?: SortOrder
    accountId?: SortOrder
    playerId?: SortOrder
    count?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OwnedPlayerSumOrderByAggregateInput = {
    ownedPlayerId?: SortOrder
    accountId?: SortOrder
    playerId?: SortOrder
    count?: SortOrder
  }

  export type OwnedPlayerScalarRelationFilter = {
    is?: OwnedPlayerWhereInput
    isNot?: OwnedPlayerWhereInput
  }

  export type SquadCountOrderByAggregateInput = {
    squadId?: SortOrder
    accountId?: SortOrder
    ownedPlayerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SquadAvgOrderByAggregateInput = {
    squadId?: SortOrder
    accountId?: SortOrder
    ownedPlayerId?: SortOrder
  }

  export type SquadMaxOrderByAggregateInput = {
    squadId?: SortOrder
    accountId?: SortOrder
    ownedPlayerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SquadMinOrderByAggregateInput = {
    squadId?: SortOrder
    accountId?: SortOrder
    ownedPlayerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SquadSumOrderByAggregateInput = {
    squadId?: SortOrder
    accountId?: SortOrder
    ownedPlayerId?: SortOrder
  }

  export type RefreshTokenOrderByRelevanceInput = {
    fields: RefreshTokenOrderByRelevanceFieldEnum | RefreshTokenOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type RefreshTokenCountOrderByAggregateInput = {
    refreshTokenId?: SortOrder
    accountId?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
  }

  export type RefreshTokenAvgOrderByAggregateInput = {
    refreshTokenId?: SortOrder
    accountId?: SortOrder
  }

  export type RefreshTokenMaxOrderByAggregateInput = {
    refreshTokenId?: SortOrder
    accountId?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
  }

  export type RefreshTokenMinOrderByAggregateInput = {
    refreshTokenId?: SortOrder
    accountId?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
  }

  export type RefreshTokenSumOrderByAggregateInput = {
    refreshTokenId?: SortOrder
    accountId?: SortOrder
  }

  export type RefreshTokenCreateNestedOneWithoutAccountInput = {
    create?: XOR<RefreshTokenCreateWithoutAccountInput, RefreshTokenUncheckedCreateWithoutAccountInput>
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutAccountInput
    connect?: RefreshTokenWhereUniqueInput
  }

  export type SquadCreateNestedManyWithoutAccountInput = {
    create?: XOR<SquadCreateWithoutAccountInput, SquadUncheckedCreateWithoutAccountInput> | SquadCreateWithoutAccountInput[] | SquadUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: SquadCreateOrConnectWithoutAccountInput | SquadCreateOrConnectWithoutAccountInput[]
    createMany?: SquadCreateManyAccountInputEnvelope
    connect?: SquadWhereUniqueInput | SquadWhereUniqueInput[]
  }

  export type OwnedPlayerCreateNestedManyWithoutAccountInput = {
    create?: XOR<OwnedPlayerCreateWithoutAccountInput, OwnedPlayerUncheckedCreateWithoutAccountInput> | OwnedPlayerCreateWithoutAccountInput[] | OwnedPlayerUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: OwnedPlayerCreateOrConnectWithoutAccountInput | OwnedPlayerCreateOrConnectWithoutAccountInput[]
    createMany?: OwnedPlayerCreateManyAccountInputEnvelope
    connect?: OwnedPlayerWhereUniqueInput | OwnedPlayerWhereUniqueInput[]
  }

  export type RefreshTokenUncheckedCreateNestedOneWithoutAccountInput = {
    create?: XOR<RefreshTokenCreateWithoutAccountInput, RefreshTokenUncheckedCreateWithoutAccountInput>
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutAccountInput
    connect?: RefreshTokenWhereUniqueInput
  }

  export type SquadUncheckedCreateNestedManyWithoutAccountInput = {
    create?: XOR<SquadCreateWithoutAccountInput, SquadUncheckedCreateWithoutAccountInput> | SquadCreateWithoutAccountInput[] | SquadUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: SquadCreateOrConnectWithoutAccountInput | SquadCreateOrConnectWithoutAccountInput[]
    createMany?: SquadCreateManyAccountInputEnvelope
    connect?: SquadWhereUniqueInput | SquadWhereUniqueInput[]
  }

  export type OwnedPlayerUncheckedCreateNestedManyWithoutAccountInput = {
    create?: XOR<OwnedPlayerCreateWithoutAccountInput, OwnedPlayerUncheckedCreateWithoutAccountInput> | OwnedPlayerCreateWithoutAccountInput[] | OwnedPlayerUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: OwnedPlayerCreateOrConnectWithoutAccountInput | OwnedPlayerCreateOrConnectWithoutAccountInput[]
    createMany?: OwnedPlayerCreateManyAccountInputEnvelope
    connect?: OwnedPlayerWhereUniqueInput | OwnedPlayerWhereUniqueInput[]
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

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type RefreshTokenUpdateOneWithoutAccountNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutAccountInput, RefreshTokenUncheckedCreateWithoutAccountInput>
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutAccountInput
    upsert?: RefreshTokenUpsertWithoutAccountInput
    disconnect?: RefreshTokenWhereInput | boolean
    delete?: RefreshTokenWhereInput | boolean
    connect?: RefreshTokenWhereUniqueInput
    update?: XOR<XOR<RefreshTokenUpdateToOneWithWhereWithoutAccountInput, RefreshTokenUpdateWithoutAccountInput>, RefreshTokenUncheckedUpdateWithoutAccountInput>
  }

  export type SquadUpdateManyWithoutAccountNestedInput = {
    create?: XOR<SquadCreateWithoutAccountInput, SquadUncheckedCreateWithoutAccountInput> | SquadCreateWithoutAccountInput[] | SquadUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: SquadCreateOrConnectWithoutAccountInput | SquadCreateOrConnectWithoutAccountInput[]
    upsert?: SquadUpsertWithWhereUniqueWithoutAccountInput | SquadUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: SquadCreateManyAccountInputEnvelope
    set?: SquadWhereUniqueInput | SquadWhereUniqueInput[]
    disconnect?: SquadWhereUniqueInput | SquadWhereUniqueInput[]
    delete?: SquadWhereUniqueInput | SquadWhereUniqueInput[]
    connect?: SquadWhereUniqueInput | SquadWhereUniqueInput[]
    update?: SquadUpdateWithWhereUniqueWithoutAccountInput | SquadUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: SquadUpdateManyWithWhereWithoutAccountInput | SquadUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: SquadScalarWhereInput | SquadScalarWhereInput[]
  }

  export type OwnedPlayerUpdateManyWithoutAccountNestedInput = {
    create?: XOR<OwnedPlayerCreateWithoutAccountInput, OwnedPlayerUncheckedCreateWithoutAccountInput> | OwnedPlayerCreateWithoutAccountInput[] | OwnedPlayerUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: OwnedPlayerCreateOrConnectWithoutAccountInput | OwnedPlayerCreateOrConnectWithoutAccountInput[]
    upsert?: OwnedPlayerUpsertWithWhereUniqueWithoutAccountInput | OwnedPlayerUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: OwnedPlayerCreateManyAccountInputEnvelope
    set?: OwnedPlayerWhereUniqueInput | OwnedPlayerWhereUniqueInput[]
    disconnect?: OwnedPlayerWhereUniqueInput | OwnedPlayerWhereUniqueInput[]
    delete?: OwnedPlayerWhereUniqueInput | OwnedPlayerWhereUniqueInput[]
    connect?: OwnedPlayerWhereUniqueInput | OwnedPlayerWhereUniqueInput[]
    update?: OwnedPlayerUpdateWithWhereUniqueWithoutAccountInput | OwnedPlayerUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: OwnedPlayerUpdateManyWithWhereWithoutAccountInput | OwnedPlayerUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: OwnedPlayerScalarWhereInput | OwnedPlayerScalarWhereInput[]
  }

  export type RefreshTokenUncheckedUpdateOneWithoutAccountNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutAccountInput, RefreshTokenUncheckedCreateWithoutAccountInput>
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutAccountInput
    upsert?: RefreshTokenUpsertWithoutAccountInput
    disconnect?: RefreshTokenWhereInput | boolean
    delete?: RefreshTokenWhereInput | boolean
    connect?: RefreshTokenWhereUniqueInput
    update?: XOR<XOR<RefreshTokenUpdateToOneWithWhereWithoutAccountInput, RefreshTokenUpdateWithoutAccountInput>, RefreshTokenUncheckedUpdateWithoutAccountInput>
  }

  export type SquadUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: XOR<SquadCreateWithoutAccountInput, SquadUncheckedCreateWithoutAccountInput> | SquadCreateWithoutAccountInput[] | SquadUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: SquadCreateOrConnectWithoutAccountInput | SquadCreateOrConnectWithoutAccountInput[]
    upsert?: SquadUpsertWithWhereUniqueWithoutAccountInput | SquadUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: SquadCreateManyAccountInputEnvelope
    set?: SquadWhereUniqueInput | SquadWhereUniqueInput[]
    disconnect?: SquadWhereUniqueInput | SquadWhereUniqueInput[]
    delete?: SquadWhereUniqueInput | SquadWhereUniqueInput[]
    connect?: SquadWhereUniqueInput | SquadWhereUniqueInput[]
    update?: SquadUpdateWithWhereUniqueWithoutAccountInput | SquadUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: SquadUpdateManyWithWhereWithoutAccountInput | SquadUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: SquadScalarWhereInput | SquadScalarWhereInput[]
  }

  export type OwnedPlayerUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: XOR<OwnedPlayerCreateWithoutAccountInput, OwnedPlayerUncheckedCreateWithoutAccountInput> | OwnedPlayerCreateWithoutAccountInput[] | OwnedPlayerUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: OwnedPlayerCreateOrConnectWithoutAccountInput | OwnedPlayerCreateOrConnectWithoutAccountInput[]
    upsert?: OwnedPlayerUpsertWithWhereUniqueWithoutAccountInput | OwnedPlayerUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: OwnedPlayerCreateManyAccountInputEnvelope
    set?: OwnedPlayerWhereUniqueInput | OwnedPlayerWhereUniqueInput[]
    disconnect?: OwnedPlayerWhereUniqueInput | OwnedPlayerWhereUniqueInput[]
    delete?: OwnedPlayerWhereUniqueInput | OwnedPlayerWhereUniqueInput[]
    connect?: OwnedPlayerWhereUniqueInput | OwnedPlayerWhereUniqueInput[]
    update?: OwnedPlayerUpdateWithWhereUniqueWithoutAccountInput | OwnedPlayerUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: OwnedPlayerUpdateManyWithWhereWithoutAccountInput | OwnedPlayerUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: OwnedPlayerScalarWhereInput | OwnedPlayerScalarWhereInput[]
  }

  export type AccountCreateNestedOneWithoutOwnedPlayersInput = {
    create?: XOR<AccountCreateWithoutOwnedPlayersInput, AccountUncheckedCreateWithoutOwnedPlayersInput>
    connectOrCreate?: AccountCreateOrConnectWithoutOwnedPlayersInput
    connect?: AccountWhereUniqueInput
  }

  export type SquadCreateNestedManyWithoutOwnedPlayerInput = {
    create?: XOR<SquadCreateWithoutOwnedPlayerInput, SquadUncheckedCreateWithoutOwnedPlayerInput> | SquadCreateWithoutOwnedPlayerInput[] | SquadUncheckedCreateWithoutOwnedPlayerInput[]
    connectOrCreate?: SquadCreateOrConnectWithoutOwnedPlayerInput | SquadCreateOrConnectWithoutOwnedPlayerInput[]
    createMany?: SquadCreateManyOwnedPlayerInputEnvelope
    connect?: SquadWhereUniqueInput | SquadWhereUniqueInput[]
  }

  export type SquadUncheckedCreateNestedManyWithoutOwnedPlayerInput = {
    create?: XOR<SquadCreateWithoutOwnedPlayerInput, SquadUncheckedCreateWithoutOwnedPlayerInput> | SquadCreateWithoutOwnedPlayerInput[] | SquadUncheckedCreateWithoutOwnedPlayerInput[]
    connectOrCreate?: SquadCreateOrConnectWithoutOwnedPlayerInput | SquadCreateOrConnectWithoutOwnedPlayerInput[]
    createMany?: SquadCreateManyOwnedPlayerInputEnvelope
    connect?: SquadWhereUniqueInput | SquadWhereUniqueInput[]
  }

  export type AccountUpdateOneRequiredWithoutOwnedPlayersNestedInput = {
    create?: XOR<AccountCreateWithoutOwnedPlayersInput, AccountUncheckedCreateWithoutOwnedPlayersInput>
    connectOrCreate?: AccountCreateOrConnectWithoutOwnedPlayersInput
    upsert?: AccountUpsertWithoutOwnedPlayersInput
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutOwnedPlayersInput, AccountUpdateWithoutOwnedPlayersInput>, AccountUncheckedUpdateWithoutOwnedPlayersInput>
  }

  export type SquadUpdateManyWithoutOwnedPlayerNestedInput = {
    create?: XOR<SquadCreateWithoutOwnedPlayerInput, SquadUncheckedCreateWithoutOwnedPlayerInput> | SquadCreateWithoutOwnedPlayerInput[] | SquadUncheckedCreateWithoutOwnedPlayerInput[]
    connectOrCreate?: SquadCreateOrConnectWithoutOwnedPlayerInput | SquadCreateOrConnectWithoutOwnedPlayerInput[]
    upsert?: SquadUpsertWithWhereUniqueWithoutOwnedPlayerInput | SquadUpsertWithWhereUniqueWithoutOwnedPlayerInput[]
    createMany?: SquadCreateManyOwnedPlayerInputEnvelope
    set?: SquadWhereUniqueInput | SquadWhereUniqueInput[]
    disconnect?: SquadWhereUniqueInput | SquadWhereUniqueInput[]
    delete?: SquadWhereUniqueInput | SquadWhereUniqueInput[]
    connect?: SquadWhereUniqueInput | SquadWhereUniqueInput[]
    update?: SquadUpdateWithWhereUniqueWithoutOwnedPlayerInput | SquadUpdateWithWhereUniqueWithoutOwnedPlayerInput[]
    updateMany?: SquadUpdateManyWithWhereWithoutOwnedPlayerInput | SquadUpdateManyWithWhereWithoutOwnedPlayerInput[]
    deleteMany?: SquadScalarWhereInput | SquadScalarWhereInput[]
  }

  export type SquadUncheckedUpdateManyWithoutOwnedPlayerNestedInput = {
    create?: XOR<SquadCreateWithoutOwnedPlayerInput, SquadUncheckedCreateWithoutOwnedPlayerInput> | SquadCreateWithoutOwnedPlayerInput[] | SquadUncheckedCreateWithoutOwnedPlayerInput[]
    connectOrCreate?: SquadCreateOrConnectWithoutOwnedPlayerInput | SquadCreateOrConnectWithoutOwnedPlayerInput[]
    upsert?: SquadUpsertWithWhereUniqueWithoutOwnedPlayerInput | SquadUpsertWithWhereUniqueWithoutOwnedPlayerInput[]
    createMany?: SquadCreateManyOwnedPlayerInputEnvelope
    set?: SquadWhereUniqueInput | SquadWhereUniqueInput[]
    disconnect?: SquadWhereUniqueInput | SquadWhereUniqueInput[]
    delete?: SquadWhereUniqueInput | SquadWhereUniqueInput[]
    connect?: SquadWhereUniqueInput | SquadWhereUniqueInput[]
    update?: SquadUpdateWithWhereUniqueWithoutOwnedPlayerInput | SquadUpdateWithWhereUniqueWithoutOwnedPlayerInput[]
    updateMany?: SquadUpdateManyWithWhereWithoutOwnedPlayerInput | SquadUpdateManyWithWhereWithoutOwnedPlayerInput[]
    deleteMany?: SquadScalarWhereInput | SquadScalarWhereInput[]
  }

  export type AccountCreateNestedOneWithoutSquadsInput = {
    create?: XOR<AccountCreateWithoutSquadsInput, AccountUncheckedCreateWithoutSquadsInput>
    connectOrCreate?: AccountCreateOrConnectWithoutSquadsInput
    connect?: AccountWhereUniqueInput
  }

  export type OwnedPlayerCreateNestedOneWithoutSquadsInput = {
    create?: XOR<OwnedPlayerCreateWithoutSquadsInput, OwnedPlayerUncheckedCreateWithoutSquadsInput>
    connectOrCreate?: OwnedPlayerCreateOrConnectWithoutSquadsInput
    connect?: OwnedPlayerWhereUniqueInput
  }

  export type AccountUpdateOneRequiredWithoutSquadsNestedInput = {
    create?: XOR<AccountCreateWithoutSquadsInput, AccountUncheckedCreateWithoutSquadsInput>
    connectOrCreate?: AccountCreateOrConnectWithoutSquadsInput
    upsert?: AccountUpsertWithoutSquadsInput
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutSquadsInput, AccountUpdateWithoutSquadsInput>, AccountUncheckedUpdateWithoutSquadsInput>
  }

  export type OwnedPlayerUpdateOneRequiredWithoutSquadsNestedInput = {
    create?: XOR<OwnedPlayerCreateWithoutSquadsInput, OwnedPlayerUncheckedCreateWithoutSquadsInput>
    connectOrCreate?: OwnedPlayerCreateOrConnectWithoutSquadsInput
    upsert?: OwnedPlayerUpsertWithoutSquadsInput
    connect?: OwnedPlayerWhereUniqueInput
    update?: XOR<XOR<OwnedPlayerUpdateToOneWithWhereWithoutSquadsInput, OwnedPlayerUpdateWithoutSquadsInput>, OwnedPlayerUncheckedUpdateWithoutSquadsInput>
  }

  export type AccountCreateNestedOneWithoutRefreshTokenInput = {
    create?: XOR<AccountCreateWithoutRefreshTokenInput, AccountUncheckedCreateWithoutRefreshTokenInput>
    connectOrCreate?: AccountCreateOrConnectWithoutRefreshTokenInput
    connect?: AccountWhereUniqueInput
  }

  export type AccountUpdateOneRequiredWithoutRefreshTokenNestedInput = {
    create?: XOR<AccountCreateWithoutRefreshTokenInput, AccountUncheckedCreateWithoutRefreshTokenInput>
    connectOrCreate?: AccountCreateOrConnectWithoutRefreshTokenInput
    upsert?: AccountUpsertWithoutRefreshTokenInput
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutRefreshTokenInput, AccountUpdateWithoutRefreshTokenInput>, AccountUncheckedUpdateWithoutRefreshTokenInput>
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

  export type RefreshTokenCreateWithoutAccountInput = {
    token: string
    createdAt?: Date | string
  }

  export type RefreshTokenUncheckedCreateWithoutAccountInput = {
    refreshTokenId?: number
    token: string
    createdAt?: Date | string
  }

  export type RefreshTokenCreateOrConnectWithoutAccountInput = {
    where: RefreshTokenWhereUniqueInput
    create: XOR<RefreshTokenCreateWithoutAccountInput, RefreshTokenUncheckedCreateWithoutAccountInput>
  }

  export type SquadCreateWithoutAccountInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedPlayer: OwnedPlayerCreateNestedOneWithoutSquadsInput
  }

  export type SquadUncheckedCreateWithoutAccountInput = {
    squadId?: number
    ownedPlayerId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SquadCreateOrConnectWithoutAccountInput = {
    where: SquadWhereUniqueInput
    create: XOR<SquadCreateWithoutAccountInput, SquadUncheckedCreateWithoutAccountInput>
  }

  export type SquadCreateManyAccountInputEnvelope = {
    data: SquadCreateManyAccountInput | SquadCreateManyAccountInput[]
    skipDuplicates?: boolean
  }

  export type OwnedPlayerCreateWithoutAccountInput = {
    playerId: number
    count: number
    createdAt?: Date | string
    updatedAt?: Date | string
    squads?: SquadCreateNestedManyWithoutOwnedPlayerInput
  }

  export type OwnedPlayerUncheckedCreateWithoutAccountInput = {
    ownedPlayerId?: number
    playerId: number
    count: number
    createdAt?: Date | string
    updatedAt?: Date | string
    squads?: SquadUncheckedCreateNestedManyWithoutOwnedPlayerInput
  }

  export type OwnedPlayerCreateOrConnectWithoutAccountInput = {
    where: OwnedPlayerWhereUniqueInput
    create: XOR<OwnedPlayerCreateWithoutAccountInput, OwnedPlayerUncheckedCreateWithoutAccountInput>
  }

  export type OwnedPlayerCreateManyAccountInputEnvelope = {
    data: OwnedPlayerCreateManyAccountInput | OwnedPlayerCreateManyAccountInput[]
    skipDuplicates?: boolean
  }

  export type RefreshTokenUpsertWithoutAccountInput = {
    update: XOR<RefreshTokenUpdateWithoutAccountInput, RefreshTokenUncheckedUpdateWithoutAccountInput>
    create: XOR<RefreshTokenCreateWithoutAccountInput, RefreshTokenUncheckedCreateWithoutAccountInput>
    where?: RefreshTokenWhereInput
  }

  export type RefreshTokenUpdateToOneWithWhereWithoutAccountInput = {
    where?: RefreshTokenWhereInput
    data: XOR<RefreshTokenUpdateWithoutAccountInput, RefreshTokenUncheckedUpdateWithoutAccountInput>
  }

  export type RefreshTokenUpdateWithoutAccountInput = {
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenUncheckedUpdateWithoutAccountInput = {
    refreshTokenId?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SquadUpsertWithWhereUniqueWithoutAccountInput = {
    where: SquadWhereUniqueInput
    update: XOR<SquadUpdateWithoutAccountInput, SquadUncheckedUpdateWithoutAccountInput>
    create: XOR<SquadCreateWithoutAccountInput, SquadUncheckedCreateWithoutAccountInput>
  }

  export type SquadUpdateWithWhereUniqueWithoutAccountInput = {
    where: SquadWhereUniqueInput
    data: XOR<SquadUpdateWithoutAccountInput, SquadUncheckedUpdateWithoutAccountInput>
  }

  export type SquadUpdateManyWithWhereWithoutAccountInput = {
    where: SquadScalarWhereInput
    data: XOR<SquadUpdateManyMutationInput, SquadUncheckedUpdateManyWithoutAccountInput>
  }

  export type SquadScalarWhereInput = {
    AND?: SquadScalarWhereInput | SquadScalarWhereInput[]
    OR?: SquadScalarWhereInput[]
    NOT?: SquadScalarWhereInput | SquadScalarWhereInput[]
    squadId?: IntFilter<"Squad"> | number
    accountId?: IntFilter<"Squad"> | number
    ownedPlayerId?: IntFilter<"Squad"> | number
    createdAt?: DateTimeFilter<"Squad"> | Date | string
    updatedAt?: DateTimeFilter<"Squad"> | Date | string
  }

  export type OwnedPlayerUpsertWithWhereUniqueWithoutAccountInput = {
    where: OwnedPlayerWhereUniqueInput
    update: XOR<OwnedPlayerUpdateWithoutAccountInput, OwnedPlayerUncheckedUpdateWithoutAccountInput>
    create: XOR<OwnedPlayerCreateWithoutAccountInput, OwnedPlayerUncheckedCreateWithoutAccountInput>
  }

  export type OwnedPlayerUpdateWithWhereUniqueWithoutAccountInput = {
    where: OwnedPlayerWhereUniqueInput
    data: XOR<OwnedPlayerUpdateWithoutAccountInput, OwnedPlayerUncheckedUpdateWithoutAccountInput>
  }

  export type OwnedPlayerUpdateManyWithWhereWithoutAccountInput = {
    where: OwnedPlayerScalarWhereInput
    data: XOR<OwnedPlayerUpdateManyMutationInput, OwnedPlayerUncheckedUpdateManyWithoutAccountInput>
  }

  export type OwnedPlayerScalarWhereInput = {
    AND?: OwnedPlayerScalarWhereInput | OwnedPlayerScalarWhereInput[]
    OR?: OwnedPlayerScalarWhereInput[]
    NOT?: OwnedPlayerScalarWhereInput | OwnedPlayerScalarWhereInput[]
    ownedPlayerId?: IntFilter<"OwnedPlayer"> | number
    accountId?: IntFilter<"OwnedPlayer"> | number
    playerId?: IntFilter<"OwnedPlayer"> | number
    count?: IntFilter<"OwnedPlayer"> | number
    createdAt?: DateTimeFilter<"OwnedPlayer"> | Date | string
    updatedAt?: DateTimeFilter<"OwnedPlayer"> | Date | string
  }

  export type AccountCreateWithoutOwnedPlayersInput = {
    email: string
    userId: string
    password: string
    cash: number
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshToken?: RefreshTokenCreateNestedOneWithoutAccountInput
    squads?: SquadCreateNestedManyWithoutAccountInput
  }

  export type AccountUncheckedCreateWithoutOwnedPlayersInput = {
    accountId?: number
    email: string
    userId: string
    password: string
    cash: number
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshToken?: RefreshTokenUncheckedCreateNestedOneWithoutAccountInput
    squads?: SquadUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountCreateOrConnectWithoutOwnedPlayersInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutOwnedPlayersInput, AccountUncheckedCreateWithoutOwnedPlayersInput>
  }

  export type SquadCreateWithoutOwnedPlayerInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    account: AccountCreateNestedOneWithoutSquadsInput
  }

  export type SquadUncheckedCreateWithoutOwnedPlayerInput = {
    squadId?: number
    accountId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SquadCreateOrConnectWithoutOwnedPlayerInput = {
    where: SquadWhereUniqueInput
    create: XOR<SquadCreateWithoutOwnedPlayerInput, SquadUncheckedCreateWithoutOwnedPlayerInput>
  }

  export type SquadCreateManyOwnedPlayerInputEnvelope = {
    data: SquadCreateManyOwnedPlayerInput | SquadCreateManyOwnedPlayerInput[]
    skipDuplicates?: boolean
  }

  export type AccountUpsertWithoutOwnedPlayersInput = {
    update: XOR<AccountUpdateWithoutOwnedPlayersInput, AccountUncheckedUpdateWithoutOwnedPlayersInput>
    create: XOR<AccountCreateWithoutOwnedPlayersInput, AccountUncheckedCreateWithoutOwnedPlayersInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutOwnedPlayersInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutOwnedPlayersInput, AccountUncheckedUpdateWithoutOwnedPlayersInput>
  }

  export type AccountUpdateWithoutOwnedPlayersInput = {
    email?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    cash?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshToken?: RefreshTokenUpdateOneWithoutAccountNestedInput
    squads?: SquadUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutOwnedPlayersInput = {
    accountId?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    cash?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshToken?: RefreshTokenUncheckedUpdateOneWithoutAccountNestedInput
    squads?: SquadUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type SquadUpsertWithWhereUniqueWithoutOwnedPlayerInput = {
    where: SquadWhereUniqueInput
    update: XOR<SquadUpdateWithoutOwnedPlayerInput, SquadUncheckedUpdateWithoutOwnedPlayerInput>
    create: XOR<SquadCreateWithoutOwnedPlayerInput, SquadUncheckedCreateWithoutOwnedPlayerInput>
  }

  export type SquadUpdateWithWhereUniqueWithoutOwnedPlayerInput = {
    where: SquadWhereUniqueInput
    data: XOR<SquadUpdateWithoutOwnedPlayerInput, SquadUncheckedUpdateWithoutOwnedPlayerInput>
  }

  export type SquadUpdateManyWithWhereWithoutOwnedPlayerInput = {
    where: SquadScalarWhereInput
    data: XOR<SquadUpdateManyMutationInput, SquadUncheckedUpdateManyWithoutOwnedPlayerInput>
  }

  export type AccountCreateWithoutSquadsInput = {
    email: string
    userId: string
    password: string
    cash: number
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshToken?: RefreshTokenCreateNestedOneWithoutAccountInput
    ownedPlayers?: OwnedPlayerCreateNestedManyWithoutAccountInput
  }

  export type AccountUncheckedCreateWithoutSquadsInput = {
    accountId?: number
    email: string
    userId: string
    password: string
    cash: number
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshToken?: RefreshTokenUncheckedCreateNestedOneWithoutAccountInput
    ownedPlayers?: OwnedPlayerUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountCreateOrConnectWithoutSquadsInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutSquadsInput, AccountUncheckedCreateWithoutSquadsInput>
  }

  export type OwnedPlayerCreateWithoutSquadsInput = {
    playerId: number
    count: number
    createdAt?: Date | string
    updatedAt?: Date | string
    account: AccountCreateNestedOneWithoutOwnedPlayersInput
  }

  export type OwnedPlayerUncheckedCreateWithoutSquadsInput = {
    ownedPlayerId?: number
    accountId: number
    playerId: number
    count: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OwnedPlayerCreateOrConnectWithoutSquadsInput = {
    where: OwnedPlayerWhereUniqueInput
    create: XOR<OwnedPlayerCreateWithoutSquadsInput, OwnedPlayerUncheckedCreateWithoutSquadsInput>
  }

  export type AccountUpsertWithoutSquadsInput = {
    update: XOR<AccountUpdateWithoutSquadsInput, AccountUncheckedUpdateWithoutSquadsInput>
    create: XOR<AccountCreateWithoutSquadsInput, AccountUncheckedCreateWithoutSquadsInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutSquadsInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutSquadsInput, AccountUncheckedUpdateWithoutSquadsInput>
  }

  export type AccountUpdateWithoutSquadsInput = {
    email?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    cash?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshToken?: RefreshTokenUpdateOneWithoutAccountNestedInput
    ownedPlayers?: OwnedPlayerUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutSquadsInput = {
    accountId?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    cash?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshToken?: RefreshTokenUncheckedUpdateOneWithoutAccountNestedInput
    ownedPlayers?: OwnedPlayerUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type OwnedPlayerUpsertWithoutSquadsInput = {
    update: XOR<OwnedPlayerUpdateWithoutSquadsInput, OwnedPlayerUncheckedUpdateWithoutSquadsInput>
    create: XOR<OwnedPlayerCreateWithoutSquadsInput, OwnedPlayerUncheckedCreateWithoutSquadsInput>
    where?: OwnedPlayerWhereInput
  }

  export type OwnedPlayerUpdateToOneWithWhereWithoutSquadsInput = {
    where?: OwnedPlayerWhereInput
    data: XOR<OwnedPlayerUpdateWithoutSquadsInput, OwnedPlayerUncheckedUpdateWithoutSquadsInput>
  }

  export type OwnedPlayerUpdateWithoutSquadsInput = {
    playerId?: IntFieldUpdateOperationsInput | number
    count?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    account?: AccountUpdateOneRequiredWithoutOwnedPlayersNestedInput
  }

  export type OwnedPlayerUncheckedUpdateWithoutSquadsInput = {
    ownedPlayerId?: IntFieldUpdateOperationsInput | number
    accountId?: IntFieldUpdateOperationsInput | number
    playerId?: IntFieldUpdateOperationsInput | number
    count?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateWithoutRefreshTokenInput = {
    email: string
    userId: string
    password: string
    cash: number
    createdAt?: Date | string
    updatedAt?: Date | string
    squads?: SquadCreateNestedManyWithoutAccountInput
    ownedPlayers?: OwnedPlayerCreateNestedManyWithoutAccountInput
  }

  export type AccountUncheckedCreateWithoutRefreshTokenInput = {
    accountId?: number
    email: string
    userId: string
    password: string
    cash: number
    createdAt?: Date | string
    updatedAt?: Date | string
    squads?: SquadUncheckedCreateNestedManyWithoutAccountInput
    ownedPlayers?: OwnedPlayerUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountCreateOrConnectWithoutRefreshTokenInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutRefreshTokenInput, AccountUncheckedCreateWithoutRefreshTokenInput>
  }

  export type AccountUpsertWithoutRefreshTokenInput = {
    update: XOR<AccountUpdateWithoutRefreshTokenInput, AccountUncheckedUpdateWithoutRefreshTokenInput>
    create: XOR<AccountCreateWithoutRefreshTokenInput, AccountUncheckedCreateWithoutRefreshTokenInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutRefreshTokenInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutRefreshTokenInput, AccountUncheckedUpdateWithoutRefreshTokenInput>
  }

  export type AccountUpdateWithoutRefreshTokenInput = {
    email?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    cash?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    squads?: SquadUpdateManyWithoutAccountNestedInput
    ownedPlayers?: OwnedPlayerUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutRefreshTokenInput = {
    accountId?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    cash?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    squads?: SquadUncheckedUpdateManyWithoutAccountNestedInput
    ownedPlayers?: OwnedPlayerUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type SquadCreateManyAccountInput = {
    squadId?: number
    ownedPlayerId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OwnedPlayerCreateManyAccountInput = {
    ownedPlayerId?: number
    playerId: number
    count: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SquadUpdateWithoutAccountInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedPlayer?: OwnedPlayerUpdateOneRequiredWithoutSquadsNestedInput
  }

  export type SquadUncheckedUpdateWithoutAccountInput = {
    squadId?: IntFieldUpdateOperationsInput | number
    ownedPlayerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SquadUncheckedUpdateManyWithoutAccountInput = {
    squadId?: IntFieldUpdateOperationsInput | number
    ownedPlayerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OwnedPlayerUpdateWithoutAccountInput = {
    playerId?: IntFieldUpdateOperationsInput | number
    count?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    squads?: SquadUpdateManyWithoutOwnedPlayerNestedInput
  }

  export type OwnedPlayerUncheckedUpdateWithoutAccountInput = {
    ownedPlayerId?: IntFieldUpdateOperationsInput | number
    playerId?: IntFieldUpdateOperationsInput | number
    count?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    squads?: SquadUncheckedUpdateManyWithoutOwnedPlayerNestedInput
  }

  export type OwnedPlayerUncheckedUpdateManyWithoutAccountInput = {
    ownedPlayerId?: IntFieldUpdateOperationsInput | number
    playerId?: IntFieldUpdateOperationsInput | number
    count?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SquadCreateManyOwnedPlayerInput = {
    squadId?: number
    accountId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SquadUpdateWithoutOwnedPlayerInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    account?: AccountUpdateOneRequiredWithoutSquadsNestedInput
  }

  export type SquadUncheckedUpdateWithoutOwnedPlayerInput = {
    squadId?: IntFieldUpdateOperationsInput | number
    accountId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SquadUncheckedUpdateManyWithoutOwnedPlayerInput = {
    squadId?: IntFieldUpdateOperationsInput | number
    accountId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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