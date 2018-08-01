module.exports = {
  run: function(creep) {
    if (creep.room.name != 'E52S48') {
      var newRoom = new RoomPosition(29, 29, 'E52S48');
      creep.moveTo(newRoom);
    } else {
      var roomController = creep.room.controller
      if (roomController) {
        if (creep.reserveController(roomController) == ERR_NOT_IN_RANGE) {
          creep.moveTo(roomController);
        }
        if (creep.signController(roomController, "NO TOUCH | NÃO TOQUE | NO TOQUES | NON TOCCARE") == ERR_NOT_IN_RANGE) {
          creep.moveTo(roomController)
        }
      }
    }
  }
};
