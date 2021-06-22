function navLinksAdder(req, nav) {
  if (!req.user) {
    nav.push({ link: '/auth/signIn', title: 'Login' });
    nav.push({ link: '/auth/signUp', title: 'Sign up' });
  } else {
    nav.push({ title: req.user.username });
    nav.push({ link: '/auth/Logout', title: 'Log out' });
  }
}

module.exports = navLinksAdder;
