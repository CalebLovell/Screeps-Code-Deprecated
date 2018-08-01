module.exports = {
  run: function(creep) {
    if (creep.room.name != 'E53S49') {
      var newRoom = new RoomPosition(29, 29, 'E53S49');
      creep.moveTo(newRoom);
    } else {
      var roomController = creep.room.controller
      if (roomController) {
        if (creep.reserveController(roomController) == ERR_NOT_IN_RANGE) {
          creep.moveTo(roomController);
        }
        // if (creep.signController(roomController, "\u{0ca0}_\u{0ca0} watching you CoreV. stay in ur corner or else \u{0ca0}_\u{0ca0}") == ERR_NOT_IN_RANGE) {
        //   creep.moveTo(roomController)
        // }
      }
    }
  }
};
