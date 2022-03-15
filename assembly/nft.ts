/* ERC721 Implementation for Massa Labs
 *
 * */
import { Storage, Context } from "massa-sc-std";
import { JSON } from "json-as";

/*
Arguments to be parsed by each public function

in cosm-wasm they call these "messages"

Questions to be answered:
- Since anything beyond a single string requires us to decode JSON, should we follow
  this pattern even for functions that accept a single string?

- In the future, what tooling can we write to abstract JSON encoding/decoding from the
  smart contract author?
 */
@json
export class MintArgs {
    address: string = "";
    amount: u32 = 0;
}

@json
export class AllowArgs {
    spender: string = "";
    amount: u32 = 0;
}

@json
export class AllowanceArgs {
    owner: string = "";
    spender: string = "";
}

@json
export class TransferArgs {
    to: string = "";
    amount: u32 = 0;
}

@json
export class TransferFromArgs {
    owner: string = "";
    to: string = "";
    amount: u32 = 0;
}

/* External functions */

export function name(): string {
    // must be set or will revert
    return Storage.get_data("NAME")
}

export function symbol(): string {
    return Storage.get_data("SYMBOL");
}

export function decimals(): string {
    return Storage.get_data("DECIMALS")
}

export function totalSupply(): string {
    return Storage.get_data("TOTAL_SUPPLY")
}


export function balanceOf(address: string): string {
    const key = _balKey(address);
    return Storage.get_data_or_default(key, "0");
}

export function transfer(_args: string): string {
    const args = JSON.parse<TransferArgs>(_args);
    const addresses = JSON.parse<string[]>(Context.get_call_stack());
    const sender = addresses[0];
    return _transfer(sender, args.to, args.amount).toString();
}

export function allow(_args: string): string {
    const args = JSON.parse<AllowArgs>(_args);
    const addresses = JSON.parse<string[]>(Context.get_call_stack());
    const owner = addresses[0];
    _setAllowance(owner, args.spender, args.amount);
    return args.amount.toString();
}

export function allowance(_args: string): string {
    const args = JSON.parse<AllowanceArgs>(_args);
    return _getAllowance(args.owner, args.spender);
}

export function transferFrom(_args: string): void {
    const addresses = JSON.parse<string[]>(Context.get_call_stack());
    const spender = addresses[addresses.length - 2];
    const args = JSON.parse<TransferFromArgs>(_args);
    const allowed = U32.parseInt(_getAllowance(args.owner, spender));
    assert(args.amount < allowed, "ALLOWANCE_EXCEEDED");
    _transfer(args.owner, args.to, args.amount);
    const newAllowance = allowed - args.amount;
    _setAllowance(args.owner, spender, newAllowance);
}

export function mint(_args: string): string {
    // anyone can call this!!!
    const args = JSON.parse<MintArgs>(_args);
    let supply = U32.parseInt(totalSupply());
    supply += args.amount;
    Storage.set_data("TOTAL_SUPPLY", supply.toString());
    let bal = U32.parseInt(balanceOf(args.address));
    bal += args.amount;
    _setBalance(args.address, bal);
    return args.amount.toString();
}

// internal utility functions

function _transfer(sender: string, recipient: string, amount: u32): u32 {
    let senderBal = U32.parseInt(balanceOf(sender));
    assert(senderBal > amount, "INSUFFICIENT_BALANCE")
    let receiverBal = U32.parseInt(balanceOf(recipient));
    senderBal -= amount;
    _setBalance(sender, senderBal);
    receiverBal += amount;
    _setBalance(recipient, receiverBal);
    return amount;
}

function _setAllowance(owner: string, spender: string, amount: u32): void {
    Storage.set_data(_allowKey(owner, spender), amount.toString());
}

function _getAllowance(owner: string, spender: string): string {
    if (Storage.has_data(_allowKey(owner, spender))) {
        return Storage.get_data(_allowKey(owner, spender))
    } else {
        Storage.set_data(_allowKey(owner, spender), "0");
        return "0";
    }
}

function _setBalance(address: string, balance: u32): void {
    Storage.set_data(_balKey(address), balance.toString());
}

function _balKey(address: string): string {
    return "bal" + address;
}

function _allowKey(address: string, spender: string): string {
    return "allow" + address + spender;
}

# @dev Mapping from NFT ID to the address that owns it.
idToOwner: HashMap[uint256, address]

# @dev Mapping from NFT ID to approved address.
idToApprovals: HashMap[uint256, address]

# @dev Mapping from owner address to count of his tokens.
ownerToNFTokenCount: HashMap[address, uint256]

# @dev Mapping from owner address to mapping of operator addresses.
ownerToOperators: HashMap[address, HashMap[address, bool]]

# @dev Address of minter, who can mint a token
minter: address

# @dev Mapping of interface id to bool about whether or not it's supported
supportedInterfaces: HashMap[bytes32, bool]

# @dev ERC165 interface ID of ERC165
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ERC165 interface ID of ERC721
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd


@external
def __init__():
    """
    @dev Contract constructor.
    """
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender


@view
@external
def supportsInterface(_interfaceID: bytes32) -> bool:
    """
    @dev Interface identification is specified in ERC-165.
    @param _interfaceID Id of the interface
    """
    return self.supportedInterfaces[_interfaceID]


export function balanceOf(address: string): string {
    // Returns the number of NFTs owned by `address`.
    const key = _balKey(address);
    return Storage.get_data_or_default(key, "0");
}

export function ownerOf(tokenId: string): string {
    // Returns the address of the owner of the NFT.
    const key = _ownerKey(address);
    return Storage.get_data_or_default(key, "0");
}

export function getApproved(tokenId: string): string {
    // Get the approved address for a single NFT.
    // Throws if `tokenId` is not a valid NFT.
    const key = _approvedKey(tokenId);
    const approved = Storage.get_data_or_default(key, "0");
    assert(approved !== "0");
    return approved
}

@json
export class IsApprovedForAllArgs {
    owner: string = "";
    operator: string = "";
}

/**
 * Checks if `operator` is an approved operator for `owner`.
 * @param owner The address that owns the NFTs.
 * @param operator The address that acts on behalf of the owner.
 * @returns boolean
 */
export function isApprovedForAll(_args: string): bool {
    const args = JSON.parse<TransferArgs>(_args);
    const key = _approvedForAllKey(tokenId);
    const ownerToOperators = Storage.get_data(key);
    return ownerToOperators[args.owner][operator]
}

// TRANSFER FUNCTION HELPERS
@json
export class IsApprovedOrOwnerArgs {
    spender: string
    tokenId: string
}

/**
 * Returns whether the given spender can transfer a given token ID
 * @param spender address of the spender to query
 * @param tokenId ID of the token to be transferred
 * @returns boolean whether the sender is approved for the given token ID,
 *     is an operator of the owner, or is the owner of the token
*/
function _isApprovedOrOwner(_args: string): boolean {
    owner = self.idToOwner[_tokenId]
    spenderIsOwner = owner == _spender
    spenderIsApproved = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner || spenderIsApproved) || spenderIsApprovedForAll
}

@json
export class addTokenToArgs {
    to: string
    tokenId: string
}

/**
 * Add a NFT to a given address
 * Throws if `args.tokenId` is owned by someone.
*/
function _addTokenTo(_args: string): void {
    const args = JSON.parse<addTokenToArgs>(_args);
    // assert(self.idToOwner[_tokenId] == ZERO_ADDRESS)
    // Change the owner
    const key = _idToOwnerKey(args.tokenId);
    assert(Storage.get_data_or_default(key, "0") == "0");
    Storage.set_data(key, args.to);
    // Change count tracking
    const key = _ownerToNFTokenCountKey(args.to);
    var current_count = Storage.get_data_or_default(key, 0);
    Storage.set_data(key, current_count + 1);
}

@json
export class addTokenToArgs {
    from: string
    tokenId: string
}

/**
 * Remove a NFT from a given address
 * Throws if `args.from` is not the current owner.
*/
function _removeTokenFrom(_args: string): void {
    const args = JSON.parse<addTokenToArgs>(_args);
    // Change the owner
    const key = _idToOwnerKey(args.tokenId);
    assert(Storage.get_data_or_default(key, "0") == args.from);
    Storage.set_data(key, "");
    // Change count tracking
    const key = _ownerToNFTokenCountKey(args.to);
    var current_count = Storage.get_data(key);
    Storage.set_data(key, current_count - 1);
}

@json
export class clearApprovalArgs {
    owner: string
    tokenId: string
}

/**
 * Clear an approval of a given address
 * Throws if `args.owner` is not the current owner.
*/
function _clearApproval(_args: string): void {
    const args = JSON.parse<clearApprovalArgs>(_args);
    const key = _idToOwnerKey(args.tokenId);
    assert(Storage.get_data_or_default(key, "0") == args.owner);
    const key = _idToApprovalsKey(args.tokenId);
    if (Storage.get_data_or_default(key, "0") != "0") {
        Storage.set_data(key, "");
    }
}

// TRANSFER FUNCTIONS
@json
export class transferFromArgs {
    from: string
    to: string
    tokenId: string
    sender: string
}

/**
 * Execute transfer of a NFT.
 * TODO: Should we do that ?
 * Throws if `args.to` is the zero address.
 * Throws if `args.from` is not the current owner.
 * Throws if `args.tokenId` is not a valid NFT.
*/
function transferFrom(_args: string): void {
    const args = JSON.parse<transferFromArgs>(_args);
    const addresses = JSON.parse<string[]>(Context.get_call_stack());
    // Check requirements
    assert(_isApprovedOrOwner(args.sender, args.tokenId));
    // Clear approval. Throws if `args.from` is not the current owner
    _clearApproval(args.from, args.tokenId);
    // Remove NFT. Throws if `tokenId` is not a valid NFT
    _removeTokenFrom(args.from, args.tokenId);
    // Add NFT
    _addTokenTo(args.to, args.tokenId);
}

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev Throws unless `msg.sender` is the current owner, an authorized operator, or the approved
         address for this NFT.
         Throws if `_from` is not the current owner.
         Throws if `_to` is the zero address.
         Throws if `_tokenId` is not a valid NFT.
    @notice The caller is responsible to confirm that `_to` is capable of receiving NFTs or else
            they maybe be permanently lost.
    @param _from The current owner of the NFT.
    @param _to The new owner.
    @param _tokenId The NFT to transfer.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)


@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev Transfers the ownership of an NFT from one address to another address.
         Throws unless `msg.sender` is the current owner, an authorized operator, or the
         approved address for this NFT.
         Throws if `_from` is not the current owner.
         Throws if `_to` is the zero address.
         Throws if `_tokenId` is not a valid NFT.
         If `_to` is a smart contract, it calls `onERC721Received` on `_to` and throws if
         the return value is not `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
         NOTE: bytes4 is represented by bytes32 with padding
    @param _from The current owner of the NFT.
    @param _to The new owner.
    @param _tokenId The NFT to transfer.
    @param _data Additional data with no specified format, sent in call to `_to`.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
    if _to.is_contract: # check if `_to` is a contract address
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
        # Throws if transfer destination is a contract which does not implement 'onERC721Received'
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)


@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev Set or reaffirm the approved address for an NFT. The zero address indicates there is no approved address.
         Throws unless `msg.sender` is the current NFT owner, or an authorized operator of the current owner.
         Throws if `_tokenId` is not a valid NFT. (NOTE: This is not written the EIP)
         Throws if `_approved` is the current owner. (NOTE: This is not written the EIP)
    @param _approved Address to be approved for the given NFT ID.
    @param _tokenId ID of the token to be approved.
    """
    owner: address = self.idToOwner[_tokenId]
    # Throws if `_tokenId` is not a valid NFT
    assert owner != ZERO_ADDRESS
    # Throws if `_approved` is the current owner
    assert _approved != owner
    # Check requirements
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
    # Set the approval
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev Enables or disables approval for a third party ("operator") to manage all of
         `msg.sender`'s assets. It also emits the ApprovalForAll event.
         Throws if `_operator` is the `msg.sender`. (NOTE: This is not written the EIP)
    @notice This works even if sender doesn't own any tokens at the time.
    @param _operator Address to add to the set of authorized operators.
    @param _approved True if the operators is approved, false to revoke approval.
    """
    # Throws if `_operator` is the `msg.sender`
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)


### MINT & BURN FUNCTIONS ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
    """
    @dev Function to mint tokens
         Throws if `msg.sender` is not the minter.
         Throws if `_to` is zero address.
         Throws if `_tokenId` is owned by someone.
    @param _to The address that will receive the minted tokens.
    @param _tokenId The token id to mint.
    @return A boolean that indicates if the operation was successful.
    """
    # Throws if `msg.sender` is not the minter
    assert msg.sender == self.minter
    # Throws if `_to` is zero address
    assert _to != ZERO_ADDRESS
    # Add NFT. Throws if `_tokenId` is owned by someone
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True


@external
def burn(_tokenId: uint256):
    """
    @dev Burns a specific ERC721 token.
         Throws unless `msg.sender` is the current owner, an authorized operator, or the approved
         address for this NFT.
         Throws if `_tokenId` is not a valid NFT.
    @param _tokenId uint256 id of the ERC721 token to be burned.
    """
    # Check requirements
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # Throws if `_tokenId` is not a valid NFT
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)