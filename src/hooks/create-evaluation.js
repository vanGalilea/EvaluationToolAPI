const errors = require('feathers-errors');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function (hook) {
    let evaluation = hook.data;

    const studentId= hook.id;
    const user = hook.params.user;
    const students = hook.app.service('students');

    if (!user) throw new errors.NotAuthenticated('You need to sign in before you can evaluate!');
    
    return students.get(studentId)
      .then((student) => {
        if (student.evaluations === null) student.evaluations = [];

        hook.data = {
          evaluations: student.evaluations.concat(evaluation)
        };


        return Promise.resolve(hook);
      });
  };
};
