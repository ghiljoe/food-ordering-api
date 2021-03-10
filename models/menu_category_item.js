const { Model } = require('objection');

class MenuCategoryItem extends Model {
  static get tableName() {
    return 'menu_category_item';
  }
}

module.exports = MenuCategoryItem;