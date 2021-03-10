
exports.up = function(knex) {
    return knex.schema.createTable('order_item', function (table) {
        table.increments();
        table.integer('order_id');
        table.integer('menu_category_item_id');
        table.integer('quantity');
        table.decimal('total_price', 10, 2);
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('order_item');
};
