
exports.up = function(knex) {
    return knex.schema.createTable('user', function (table) {
        table.increments();
        table.string('first_name');
        table.string('last_name');
        table.string('email');
        table.string('password');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('user');
};
