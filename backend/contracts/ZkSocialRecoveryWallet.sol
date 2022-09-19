//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Verifiers/HashCheckVerifier.sol";
import "hardhat/console.sol";

contract ZkSocialRecoveryWallet {
    Verifier verifier;

    address private owner;

    uint256 private thresholdForRecovery;

    uint256 private currentRecoveryNumber;

    mapping(address => bool) Trustee;

    mapping(address => uint256) trusteeToPasswordHash;

    mapping(address => bool) pastOwners;

    bool isRecoveryOn;

    struct RecoveryProcedure {
        uint256 numberOfVotesInSupport;
        address newOwnerProposed;
        bool isPassed;
        mapping(address => bool) trusteeSupporters;
    }

    mapping(uint256 => RecoveryProcedure) recoveryRoundNumberToProcedure;

    event NewRecoveryProcedure(
        address indexed newProposedOwner,
        address indexed trusteeInitializer,
        uint256 currRecoveryRound
    );

    event VotedInRecovery(address indexed trustee, uint256 RecoveryRound);

    event RecoveryExecuted(
        address indexed oldOwner,
        address indexed newOwner,
        uint256 RecoveryRound
    );

    event RecoveryCancelled(address indexed Owner, uint256 RecoveryRound);

    modifier RecoveryShouldBeInProcess() {
        require(isRecoveryOn, "Recovery has not started");
        _;
    }

    modifier RecoveryShouldNotBeInProcess() {
        require(!isRecoveryOn, "Recovery is in process");
        _;
    }

    modifier isOwner() {
        require(owner == msg.sender, "Not Owner");
        _;
    }

    modifier isTrustee() {
        require(Trustee[msg.sender], "Not Trustee");
        _;
    }

    modifier verifyProofForTrustee(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[1] memory Input
    ) {
        require(
            verifier.verifyProof(a, b, c, Input),
            "Password proof invalid!"
        );
        _;
    }

    constructor(
        address[] memory _trustees,
        uint256[] memory _passwordHashes,
        uint256 _thresholdForRecovery
    ) {
        require(
            _trustees.length == _passwordHashes.length,
            "Trustees and hashes length diff"
        );
        require(
            _trustees.length >= _thresholdForRecovery,
            "Threshold is greater than number of trustees"
        );
        verifier = new Verifier();
        owner = msg.sender;

        for (uint256 i = 0; i < _trustees.length; i++) {
            require(!Trustee[_trustees[i]], "Duplicate trustee in list");
            Trustee[_trustees[i]] = true;
            trusteeToPasswordHash[_trustees[i]] = _passwordHashes[i];
        }

        thresholdForRecovery = _thresholdForRecovery;
    }

    function startRecovery(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[1] memory Input,
        address newOwner
    )
        external
        isTrustee
        RecoveryShouldNotBeInProcess
        verifyProofForTrustee(a, b, c, Input)
        returns (uint256)
    {
        require(
            Input[0] == trusteeToPasswordHash[msg.sender],
            "Wrong password"
        );
        require(newOwner != address(0), "Zero address");
        require(!pastOwners[newOwner], "Owner should not be a past address");

        currentRecoveryNumber++;

        RecoveryProcedure storage recovery = recoveryRoundNumberToProcedure[
            currentRecoveryNumber
        ];
        recovery.newOwnerProposed = newOwner;
        recovery.numberOfVotesInSupport++;
        recovery.trusteeSupporters[msg.sender] = true;

        isRecoveryOn = true;
        emit NewRecoveryProcedure(newOwner, msg.sender, currentRecoveryNumber);

        return currentRecoveryNumber;
    }

    function voteInRecovery(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[1] memory Input,
        uint256 recoveryRoundNumber
    )
        external
        isTrustee
        RecoveryShouldBeInProcess
        verifyProofForTrustee(a, b, c, Input)
        returns (bool success)
    {
        require(
            recoveryRoundNumber <= currentRecoveryNumber,
            "Wrong Recovery round number"
        );
        require(
            Input[0] == trusteeToPasswordHash[msg.sender],
            "Wrong password"
        );

        RecoveryProcedure storage recovery = recoveryRoundNumberToProcedure[
            recoveryRoundNumber
        ];
        require(
            !recovery.trusteeSupporters[msg.sender],
            "Trustee already voted"
        );
        recovery.numberOfVotesInSupport++;
        recovery.trusteeSupporters[msg.sender] = true;

        success = true;

        emit VotedInRecovery(msg.sender, recoveryRoundNumber);
    }

    function executeRecoveryChange(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[1] memory Input,
        uint256 recoveryRoundNumber
    )
        external
        isTrustee
        RecoveryShouldBeInProcess
        verifyProofForTrustee(a, b, c, Input)
    {
        RecoveryProcedure storage recovery = recoveryRoundNumberToProcedure[
            recoveryRoundNumber
        ];

        require(
            recovery.numberOfVotesInSupport >= thresholdForRecovery,
            "Votes Not enough"
        );

        recovery.isPassed = true;
        isRecoveryOn = false;
        address old = owner;
        owner = recovery.newOwnerProposed;
        pastOwners[owner] = true;

        emit RecoveryExecuted(old, owner, recoveryRoundNumber);
    }

    function cancelRecovery(uint256 recoveryRoundNumber)
        external
        isOwner
        RecoveryShouldBeInProcess
    {
        isRecoveryOn = false;
        emit RecoveryCancelled(owner, recoveryRoundNumber);
    }
}
