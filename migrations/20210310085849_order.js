
exports.up = function(knex) {
    return knex.schema.createTable('order', function (table) {
        table.increments();
        table.integer('user_id');
        table.decimal('total_amount', 10, 2);
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('order');
};
