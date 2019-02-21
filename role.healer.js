module.exports = {
  run: function(creep) {
    // const changeRooms = new RoomPosition(5, 2, 'E52S50');
    // if (creep.room.name != changeRooms) {
    //   //let newEnemyRoom = new RoomPosition(10, 1, 'E52S50');
    //   creep.moveTo(changeRooms);
    // } else {
      var hurtCreep = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
        filter: s => s.hits < s.hitsMax
      });

      if (hurtCreep) {
        if (creep.heal(hurtCreep) == ERR_NOT_IN_RANGE) {
          creep.moveTo(hurtCreep);
        }
      }
    }
  }
// }

// var safeRoom = Game.rooms['E52S50']
// var hurtCreep = safeRoom.find(FIND_MY_CREEPS, {
//   filter: s => s.hits < s.hitsMax
// });

// var safeRoom = Game.rooms['E52S50']
// var hurtCreep = safeRoom.find(FIND_MY_CREEPS, {
//   filter: function(hurtCreep) {
//     return hurtCreep.hits < hurtCreep.hitsMax;
//   }
// });
