/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface ZkWalletFactoryInterface extends utils.Interface {
  functions: {
    "deployWallet(address,uint256,address[],uint256[],uint256,uint256,address)": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "deployWallet"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "deployWallet",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>[],
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "deployWallet",
    data: BytesLike
  ): Result;

  events: {
    "WalletCreated(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "WalletCreated"): EventFragment;
}

export interface WalletCreatedEventObject {
  walletAddress: string;
}
export type WalletCreatedEvent = TypedEvent<[string], WalletCreatedEventObject>;

export type WalletCreatedEventFilter = TypedEventFilter<WalletCreatedEvent>;

export interface ZkWalletFactory extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ZkWalletFactoryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    deployWallet(
      _hashCheckVerifier: PromiseOrValue<string>,
      _ownerPasswordHash: PromiseOrValue<BigNumberish>,
      _trustees: PromiseOrValue<string>[],
      _passwordHashes: PromiseOrValue<BigNumberish>[],
      _thresholdForRecovery: PromiseOrValue<BigNumberish>,
      _root: PromiseOrValue<BigNumberish>,
      _otpVerifier: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  deployWallet(
    _hashCheckVerifier: PromiseOrValue<string>,
    _ownerPasswordHash: PromiseOrValue<BigNumberish>,
    _trustees: PromiseOrValue<string>[],
    _passwordHashes: PromiseOrValue<BigNumberish>[],
    _thresholdForRecovery: PromiseOrValue<BigNumberish>,
    _root: PromiseOrValue<BigNumberish>,
    _otpVerifier: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    deployWallet(
      _hashCheckVerifier: PromiseOrValue<string>,
      _ownerPasswordHash: PromiseOrValue<BigNumberish>,
      _trustees: PromiseOrValue<string>[],
      _passwordHashes: PromiseOrValue<BigNumberish>[],
      _thresholdForRecovery: PromiseOrValue<BigNumberish>,
      _root: PromiseOrValue<BigNumberish>,
      _otpVerifier: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {
    "WalletCreated(address)"(walletAddress?: null): WalletCreatedEventFilter;
    WalletCreated(walletAddress?: null): WalletCreatedEventFilter;
  };

  estimateGas: {
    deployWallet(
      _hashCheckVerifier: PromiseOrValue<string>,
      _ownerPasswordHash: PromiseOrValue<BigNumberish>,
      _trustees: PromiseOrValue<string>[],
      _passwordHashes: PromiseOrValue<BigNumberish>[],
      _thresholdForRecovery: PromiseOrValue<BigNumberish>,
      _root: PromiseOrValue<BigNumberish>,
      _otpVerifier: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    deployWallet(
      _hashCheckVerifier: PromiseOrValue<string>,
      _ownerPasswordHash: PromiseOrValue<BigNumberish>,
      _trustees: PromiseOrValue<string>[],
      _passwordHashes: PromiseOrValue<BigNumberish>[],
      _thresholdForRecovery: PromiseOrValue<BigNumberish>,
      _root: PromiseOrValue<BigNumberish>,
      _otpVerifier: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}