const express = require('express')
const { addMenuCategory, addUser, getMenuCategories,
     saveOrder, getOrder, authenticateUser, addMenuCategoryItem,
     getCategoryItems } = require('./models/db_helpers')
const app = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const port = process.env.PORT || 9000

app.post('/api/authenticate-user',jsonParser, (req, res) => {
    authenticateUser(req.body).then(user => {
        res.status(200).json(user);
    }).catch(error => {
        res.status(500).json({ message: error.message, success: false });
    })
})

app.post('/api/create-menu-category',jsonParser, (req, res) => {
    addMenuCategory(req.body).then(menuCategory => {
        res.status(200).json({ message: 'Menu category successfully added.' });
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: 'Error adding menu category.'});
    })
})

app.post('/api/create-menu-category-item',jsonParser, (req, res) => {
    addMenuCategoryItem(req.body).then(menuCategoryItem => {
        res.status(200).json({ message: 'Menu category item successfully added.' });
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: 'Error adding menu category item.'});
    })
})

app.post('/api/create-user',jsonParser, (req, res) => {
    addUser(req.body).then(user => {
        res.status(200).json(user);
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: error.message, success: false });
    })
})

app.get('/api/get-menu-categories', (req, res) => {
    getMenuCategories().then(menuCategories => {
        res.status(200).json(menuCategories)
    }).catch(error => {
        console.log(error)
        res.status(500).json({ message: 'Error getting menu categories' });
    })
})

app.get('/api/get-menu-category-items/:menuCategoryId', (req, res) => {
    const { menuCategoryId } = req.params;
    getCategoryItems(menuCategoryId).then(menuCategoryItem => {
        if (menuCategoryItem) {
            res.status(200).json(menuCategoryItem);
        } else {
            res.status(404).json({ message: 'Category items not found'});
        }
    }).catch(error => {
        console.log(error)
        res.status(500).json({ message: 'Error getting Category items' });
    })
})

app.post('/api/save-order',jsonParser, (req, res) => {
    saveOrder(req.body).then(order => {
        res.status(200).json(order);
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: 'Error saving order'});
    })
})

app.get('/api/get-order-items/:orderId', (req, res) => {
    const { orderId } = req.params;
    getOrder(orderId).then(orders => {
        if (orders) {
            res.status(200).json(orders);
        } else {
            res.status(404).json({ message: 'Order not found'});
        }
    }).catch(error => {
        console.log(error)
        res.status(500).json({ message: 'Error getting order' });
    })
})

app.listen(port, () => console.log(`listening on port: ${port}`))