function getNavbar(req) {
  if (!req.user) {
    return [
      { link: '/auth/signUp', title: 'Sign up' },
      { link: '/auth/signIn', title: 'Log in' },
    ];
  }
  return [
    { link: '/user/posts', title: 'My Posts' },
    { title: `Hi ${req.user.username}!` },
    { link: '/auth/logout', title: 'Log out' },
  ];
}

module.exports = getNavbar;
