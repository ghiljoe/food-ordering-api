
exports.up = function(knex) {
    return knex.schema.createTable('menu_category_item', function (table) {
        table.increments();
        table.integer('menu_category_id');
        table.string('name');
        table.decimal('price',10,2);
        table.decimal('tax',10,2);
        table.string('image');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('menu_category_item');
};
