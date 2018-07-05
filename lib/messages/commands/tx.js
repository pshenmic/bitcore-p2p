'use strict';

var Message = require('../message');
var inherits = require('util').inherits;
var bitcore = require('bitcore-lib');
var bcoin = require('bcoin');
var $ = bitcore.util.preconditions;
var _ = bitcore.deps._;

/**
 * @param {Transaction=} arg - An instance of Transaction
 * @param {Object} options
 * @extends Message
 * @constructor
 */
function TransactionMessage(arg, options) {
  Message.call(this, options);
  this.command = 'tx';
  this.Transaction = options.Transaction;
  $.checkArgument(
    _.isUndefined(arg) || arg instanceof this.Transaction,
    'An instance of Transaction or undefined is expected'
  );
  this.transaction = arg;
  if (!this.transaction) {
    this.transaction = new this.Transaction();
  }
}
inherits(TransactionMessage, Message);

TransactionMessage.prototype.setPayload = function(payload) {
    this.transaction = bcoin.TX.fromRaw(payload);
};

TransactionMessage.prototype.getPayload = function() {
  if (this.Transaction.prototype.toRaw) {
    return this.transaction.toRaw();
  }
  return this.transaction.toBuffer();
};

module.exports = TransactionMessage;
