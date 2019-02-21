module.exports = {
  run: function(creep) {
    if (creep.room.name != 'E55S49') {
      var newRoom = new RoomPosition(29, 29, 'E55S49');
      creep.moveTo(newRoom);
    } else {
      var roomController = creep.room.controller
      if (roomController) {
        if (creep.reserveController(roomController) == ERR_NOT_IN_RANGE) {
          creep.moveTo(roomController);
        }
        // if (creep.signController(roomController, "That Way Be Dragons \u{27f6} \u{1F631}") == ERR_NOT_IN_RANGE) {
        //   creep.moveTo(roomController)
        // }
      }
    }
  }
};
