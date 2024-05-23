const express = require('express');
const app = express();
app.use(express.json());


let users = []; 

app.get('/', (req, res) => {
    res.send('Добро пожаловать на основную страницу');
  });

app.get('/users', (req, res) => {
    res.json(users);
});  // пользователи список



// получение информации по id пользователя

app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ message: 'Пользователь  не найден' });
    }
    res.json(user);
});
 

    // добавление нового пользователя (Имя, возраст, почта )

app.post('/users', (req, res) => {
    if (!req.body.name || !req.body.age || !req.body.email) {
        return res.status(400).json({ message: 'Указать имя , возраст и почту ' });
    }
    const newUser = {
        id: users.length + 1, // id
        name: req.body.name, // Имя
        age: req.body.age,   // Возраст 
        email: req.body.email, // Почта
    };
    users.push(newUser);
    res.status(201).json(newUser);
});



    // Обновление информации о пользователе

app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
    }
    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;
    if (req.body.age) user.age = req.body.age;
    res.json(user);
});



// Удаление пользователя по id

app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: 'Пользователь не найден' });
    }
    const deletedUser = users.splice(index, 1);
    res.json(deletedUser[0]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Порт сервера ${PORT}`);
});

