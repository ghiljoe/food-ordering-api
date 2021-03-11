const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);
const Order = require('../models/order');
const OrderItem = require('../models/order_item');
const MenuCategoryItem = require('../models/menu_category_item');
const { Model } = require('objection');

Model.knex(db);

async function authenticateUser(input) {
    const { email, password } = input;
    const user = await db('user').where({ email, password }).first();
    if (!user) {
        throw new Error('Username or password is incorrect.');
    } 
    return user;
}

async function addUser(input) {
    return await db('user').insert(input);
}

async function addMenuCategory(input) {
    return await db('menu_category').insert(input);
}

async function addMenuCategoryItem(input) {
    const { price, tax } = input;
    const menuCategoryItem = await MenuCategoryItem.query().insert({
        ...input,
        price: price / (1 + tax),
    });

    return menuCategoryItem;
}

function getMenuCategories() {
    return db('menu_category');
}

async function getCategoryItems(id) {
    const menuCategoryItems = await MenuCategoryItem.query().where({ menu_category_id: id });
    const menuCategoryItemMap = menuCategoryItems.map(({ id, menu_category_id, name, price, tax, image, created_at, updated_at }) => ({
        id,
        menu_category_id,
        name,
        price: price.toFixed(2),
        tax,
        image,
        created_at,
        updated_at
    }))
    return menuCategoryItemMap;
}

async function saveOrder(input) {
    const { userId, totalAmount, items } = input;
    try {
        const order = await Order.query().insertAndFetch({
            user_id: userId,
            total_amount: totalAmount,
        });
        if (order) {
            items && items.map(async ({ id, item_count, price, tax }) =>
                await OrderItem.query().insert({
                        order_id: order.id,
                        menu_category_item_id: id,
                        quantity: item_count,
                        total_price: Math.round((parseFloat(price) * item_count) * (1 + tax)),
                    })
                );
        }
        return order;

    } catch (err) {
        console.log(err);
    }

}

async function getOrder(id) {
    const orderItems = await OrderItem.query()
        .select('order_item.*', 'menu_category_item.name', 'menu_category_item.tax')
        .join('menu_category_item', 'order_item.menu_category_item_id', 'menu_category_item.id')
        .where({ order_id: id });

    const orderItemsMap = orderItems.map((data) => ({
        ...data,
        total_price: data.total_price.toFixed(2),
    }));
    return orderItemsMap;
}

module.exports = {
    authenticateUser,
    addMenuCategory,
    addMenuCategoryItem,
    addUser,
    getMenuCategories,
    saveOrder,
    getOrder,
    getCategoryItems
}
