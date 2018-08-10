module.exports = {
  run: function(creep) {
    if (creep.room.name != 'E53S49') {
      var newRoom = new RoomPosition(29, 29, 'E53S49');
      creep.moveTo(newRoom);
    } else {
      var roomController = creep.room.controller
      if (roomController) {
        if (creep.claimController(roomController) == ERR_NOT_IN_RANGE) {
          creep.moveTo(roomController);
        }
        // if (creep.signController(roomController, "I have President Putin; he just said it's not Russia. I will say this: I don't see any reason why it would(n't) be.") == ERR_NOT_IN_RANGE) {
        //   creep.moveTo(roomController)
        // }
      }
    }
  }
};
