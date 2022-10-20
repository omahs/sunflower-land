/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type BN from "bn.js";
import type { ContractOptions } from "web3-eth-contract";
import type { EventLog } from "web3-core";
import type { EventEmitter } from "events";
import type {
  Callback,
  PayableTransactionObject,
  NonPayableTransactionObject,
  BlockType,
  ContractEventLog,
  BaseContract,
} from "./types";

export interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export type ApprovalForAll = ContractEventLog<{
  account: string;
  operator: string;
  approved: boolean;
  0: string;
  1: string;
  2: boolean;
}>;
export type OwnershipTransferred = ContractEventLog<{
  previousOwner: string;
  newOwner: string;
  0: string;
  1: string;
}>;
export type Paused = ContractEventLog<{
  account: string;
  0: string;
}>;
export type TransferBatch = ContractEventLog<{
  operator: string;
  from: string;
  to: string;
  ids: string[];
  values: string[];
  0: string;
  1: string;
  2: string;
  3: string[];
  4: string[];
}>;
export type TransferSingle = ContractEventLog<{
  operator: string;
  from: string;
  to: string;
  id: string;
  value: string;
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
}>;
export type URI = ContractEventLog<{
  value: string;
  id: string;
  0: string;
  1: string;
}>;
export type Unpaused = ContractEventLog<{
  account: string;
  0: string;
}>;

export interface BumpkinItems extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): BumpkinItems;
  clone(): BumpkinItems;
  methods: {
    addGameRole(_game: string): NonPayableTransactionObject<void>;

    balanceOf(
      account: string,
      id: number | string | BN
    ): NonPayableTransactionObject<string>;

    balanceOfBatch(
      accounts: string[],
      ids: (number | string | BN)[]
    ): NonPayableTransactionObject<string[]>;

    deleteDefaultRoyalty(): NonPayableTransactionObject<void>;

    exists(id: number | string | BN): NonPayableTransactionObject<boolean>;

    gameAddGameRole(_game: string): NonPayableTransactionObject<void>;

    gameBurn(
      from: string,
      ids: (number | string | BN)[],
      amounts: (number | string | BN)[]
    ): NonPayableTransactionObject<void>;

    gameMint(
      to: string,
      ids: (number | string | BN)[],
      amounts: (number | string | BN)[],
      data: string | number[]
    ): NonPayableTransactionObject<void>;

    gameRemoveGameRole(_game: string): NonPayableTransactionObject<void>;

    gameRoles(arg0: string): NonPayableTransactionObject<boolean>;

    gameSetApproval(
      _owner: string,
      operator: string,
      approved: boolean
    ): NonPayableTransactionObject<boolean>;

    gameTransferFrom(
      from: string,
      to: string,
      ids: (number | string | BN)[],
      amounts: (number | string | BN)[],
      data: string | number[]
    ): NonPayableTransactionObject<void>;

    isApprovedForAll(
      account: string,
      operator: string
    ): NonPayableTransactionObject<boolean>;

    owner(): NonPayableTransactionObject<string>;

    pause(): NonPayableTransactionObject<void>;

    paused(): NonPayableTransactionObject<boolean>;

    removeGameRole(_game: string): NonPayableTransactionObject<void>;

    renounceOwnership(): NonPayableTransactionObject<void>;

    resetTokenRoyaltyBatch(
      tokenIds: (number | string | BN)[]
    ): NonPayableTransactionObject<void>;

    royaltyInfo(
      _tokenId: number | string | BN,
      _salePrice: number | string | BN
    ): NonPayableTransactionObject<{
      0: string;
      1: string;
    }>;

    safeBatchTransferFrom(
      from: string,
      to: string,
      ids: (number | string | BN)[],
      amounts: (number | string | BN)[],
      data: string | number[]
    ): NonPayableTransactionObject<void>;

    safeTransferFrom(
      from: string,
      to: string,
      id: number | string | BN,
      amount: number | string | BN,
      data: string | number[]
    ): NonPayableTransactionObject<void>;

    setApprovalForAll(
      operator: string,
      approved: boolean
    ): NonPayableTransactionObject<void>;

    setDefaultRoyalty(
      receiver: string,
      feeNumerator: number | string | BN
    ): NonPayableTransactionObject<void>;

    setTokenRoyaltyBatch(
      tokenIds: (number | string | BN)[],
      receivers: string[],
      feeNumerators: (number | string | BN)[]
    ): NonPayableTransactionObject<void>;

    setURI(newuri: string): NonPayableTransactionObject<void>;

    supportsInterface(
      interfaceId: string | number[]
    ): NonPayableTransactionObject<boolean>;

    totalSupply(id: number | string | BN): NonPayableTransactionObject<string>;

    totalSupplyBatch(
      ids: (number | string | BN)[]
    ): NonPayableTransactionObject<string[]>;

    transferOwnership(newOwner: string): NonPayableTransactionObject<void>;

    unpause(): NonPayableTransactionObject<void>;

    uri(arg0: number | string | BN): NonPayableTransactionObject<string>;
  };
  events: {
    ApprovalForAll(cb?: Callback<ApprovalForAll>): EventEmitter;
    ApprovalForAll(
      options?: EventOptions,
      cb?: Callback<ApprovalForAll>
    ): EventEmitter;

    OwnershipTransferred(cb?: Callback<OwnershipTransferred>): EventEmitter;
    OwnershipTransferred(
      options?: EventOptions,
      cb?: Callback<OwnershipTransferred>
    ): EventEmitter;

    Paused(cb?: Callback<Paused>): EventEmitter;
    Paused(options?: EventOptions, cb?: Callback<Paused>): EventEmitter;

    TransferBatch(cb?: Callback<TransferBatch>): EventEmitter;
    TransferBatch(
      options?: EventOptions,
      cb?: Callback<TransferBatch>
    ): EventEmitter;

    TransferSingle(cb?: Callback<TransferSingle>): EventEmitter;
    TransferSingle(
      options?: EventOptions,
      cb?: Callback<TransferSingle>
    ): EventEmitter;

    URI(cb?: Callback<URI>): EventEmitter;
    URI(options?: EventOptions, cb?: Callback<URI>): EventEmitter;

    Unpaused(cb?: Callback<Unpaused>): EventEmitter;
    Unpaused(options?: EventOptions, cb?: Callback<Unpaused>): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "ApprovalForAll", cb: Callback<ApprovalForAll>): void;
  once(
    event: "ApprovalForAll",
    options: EventOptions,
    cb: Callback<ApprovalForAll>
  ): void;

  once(event: "OwnershipTransferred", cb: Callback<OwnershipTransferred>): void;
  once(
    event: "OwnershipTransferred",
    options: EventOptions,
    cb: Callback<OwnershipTransferred>
  ): void;

  once(event: "Paused", cb: Callback<Paused>): void;
  once(event: "Paused", options: EventOptions, cb: Callback<Paused>): void;

  once(event: "TransferBatch", cb: Callback<TransferBatch>): void;
  once(
    event: "TransferBatch",
    options: EventOptions,
    cb: Callback<TransferBatch>
  ): void;

  once(event: "TransferSingle", cb: Callback<TransferSingle>): void;
  once(
    event: "TransferSingle",
    options: EventOptions,
    cb: Callback<TransferSingle>
  ): void;

  once(event: "URI", cb: Callback<URI>): void;
  once(event: "URI", options: EventOptions, cb: Callback<URI>): void;

  once(event: "Unpaused", cb: Callback<Unpaused>): void;
  once(event: "Unpaused", options: EventOptions, cb: Callback<Unpaused>): void;
}
