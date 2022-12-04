const R = {
  ok: data => {
    return {
      result: "ok",
      ...data
    }
  },
  fail: err => {
    return {
      result: "fail",
      reason: err
    }
  }
};

module.exports = R;