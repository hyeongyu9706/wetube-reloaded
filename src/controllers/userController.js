import User from '../models/User';
import bcrypt from 'bcrypt';

export const getJoin = (req, res) => res.render('join', { pageTitle: 'Join' });
export const postJoin = async (req, res) => {
    const { name, username, email, password, password1, location } = req.body;
    console.log(req.body);
    const pageTitle = 'Join';
    if (password !== password1) {
        return res.status(400).render('join', { pageTitle, errorMessage: 'Password confirmation does not match.' });
    }
    const usernameExists = await User.exists({ $or: [{ username }, { email }] });
    if (usernameExists) {
        return res.status(400).render('join', { pageTitle, errorMessage: 'This username/email is already taken' });
    }

    try {
        await User.create({
            name,
            username,
            email,
            password,
            location,
        });

        return res.redirect('/login');
    } catch (err) {
        return res.status(400).render('join', {
            pageTitle: 'Upload Video',
            errorMsg: err._message,
        });
    }
};
export const getLogin = (req, res) =>
    res.render('login', {
        pageTitle: 'Login',
    });
export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const pageTitle = 'Login';
    console.log(req.body);
    const user = await User.findOne({ username });
    // const exists = await User.exists({ username });
    if (!user) {
        return res.status(400).render('login', {
            pageTitle,
            errorMessage: 'An account with this username does not exists',
        });
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(400).render('login', {
            pageTitle,
            errorMessage: 'Wrong password',
        });
    }
    console.log('LOG USER IN!');
    return res.redirect('/');
};
export const editUser = (req, res) => res.send('Edit User');
export const removeUser = (req, res) => res.send('Remove User');
export const logout = (req, res) => res.send('Log Out');
export const see = (req, res) => res.send('See');
