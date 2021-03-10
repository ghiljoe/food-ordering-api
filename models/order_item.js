const { Model } = require('objection');

class OrderItem extends Model {
  static get tableName() {
    return 'order_item';
  }
}

module.exports = OrderItem;