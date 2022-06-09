import User from '../models/User';
import fetch from 'node-fetch';
import bcrypt from 'bcrypt';
// const fetch = require('node-fetch');
export const getJoin = (req, res) => res.render('join', { pageTitle: 'Join' });

export const postJoin = async (req, res) => {
    const { name, username, email, password, password1, location } = req.body;

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
export const startGithubLogin = (req, res) => {
    const baseUrl = 'https://github.com/login/oauth/authorize';
    const config = {
        client_id: process.env.GH_CLIENT,
        allow_signup: false,
        scope: 'read:user user:email',
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
    const baseUrl = 'https://github.com/login/oauth/access_token';
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code,
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const tokenRequest = await fetch(finalUrl, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        },
    });
    const json = await tokenRequest.json();
    console.log(json, 'json');
    if ('access_token' in json) {
        const { access_token } = json;
        const apiUrl = 'https://api.github.com';
        const userData = await (
            await fetch(`${apiUrl}/user`, {
                headers: {
                    Authorization: `token ${access_token}`,
                },
            })
        ).json();

        const emailData = await (
            await fetch(`${apiUrl}/user/emails`, {
                headers: {
                    Authorization: `token ${access_token}`,
                },
            })
        ).json();

        const emailObj = emailData.find((email) => email.primary === true && email.verified === true);

        if (!emailObj) {
            return res.redirect('/login');
        }

        const existingUser = await User.findOne({ email: emailObj.email });

        if (existingUser) {
            req.session.loggedIn = true;
            req.session.user = existingUser;
            return res.redirect('/');
        } else {
            //create an account
            const { name, login: username, location, avatar_url } = userData;

            const user = await User.create({
                avatarUrl: avatar_url,
                name,
                username,
                email: emailObj.email,
                password: '',
                socialOny: true,
                location,
            });

            req.session.loggedIn = true;
            req.session.user = user;
            return res.redirect('/');
        }
    } else {
        return res.redirect('/login');
    }
};

export const getLogin = (req, res) => {
    res.render('login', {
        pageTitle: 'Login',
    });
};

export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const pageTitle = 'Login';
    console.log(req.body);
    const user = await User.findOne({ username, socialOny: false });
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
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect('/');
};
export const editUser = (req, res) => res.send('Edit User');
export const removeUser = (req, res) => res.send('Remove User');
export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect('/');
};
export const see = (req, res) => res.send('See');
