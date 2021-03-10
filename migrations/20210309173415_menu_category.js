
exports.up = function(knex) {
    return knex.schema.createTable('menu_category', function (table) {
        table.increments();
        table.string('name');
        table.string('image');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('menu_category');
};
