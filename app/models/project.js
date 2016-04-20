let { Board } = require('./models')

let actions = {

  setQueryArgs(name) {
    return (req, res, next) => {

      if (name === 'projects') {
        let archieved = !!req.query.archieved_projects
        req.qArgs = [{ 'users._id': req.user.id, archieved }, 'title avatar']

      } else if (/boards/.test(name)) {
        let isHome = name !== 'boards'
        let archieved = isHome ? false : !!req.query.archieved_boards
        let sel = isHome ? { $in: _.map(req.$.projects, '_id') } : req.$.project._id

        req.qArgs = [{ project_id: sel, 'users._id': req.user.id, archieved }, 'title background project_id']

      } else if (name === 'users') {
        req.qArgs = [{ _id: { $in: _.map(req.$.project.users, '_id') }}, '-email -created_at -updated_at']
      }
      next()
    }
  },

  removeUserFromBoards(req, res, next) {
    let r = req.body
    if (!r.remove_user_id) return next()

    let sel = { project_id: req.$.project._id, 'users._id': r.remove_user_id }
    let cmd = { $pull: { users: { _id: r.remove_user_id }}}

    Board.update(sel, cmd, { multi: true }, next)
  }
}

module.exports = actions
