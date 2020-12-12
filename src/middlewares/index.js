module.exports = {
  checkHasReply: require('./check-has-reply.middleware'),
  checkIsAdminMessage: require('./check-is-admin-message.middleware'),
  checkIsGroup: require('./check-is-group'),
  checkIsPrivate: require('./check-is-private'),
  deleteMessage: require('./delete-message'),
  deleteRepliedMessage: require('./delete-replied-message.middleware'),
  forwardRepliedMessageTo: require('./forward-replied-message-to.middleware'),
  refreshAdminsList: require('./refresh-admins-list.middleware'),
  replyRepliedMessageWith: require('./reply-replied-message-with.middleware'),
  session: require('./session.middleware'),
  throttler: require('./throttler.middleware'),
}
